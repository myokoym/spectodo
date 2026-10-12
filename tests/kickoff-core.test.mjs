import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {applyKickoff,reconcileItem} from '../scripts/kickoff-v0.2.mjs';
function fixture(fn) {
  const root=mkdtempSync(join(tmpdir(),'spectodo-core-'));
  const put=(p,s)=>{mkdirSync(dirname(join(root,p)),{recursive:true});writeFileSync(join(root,p),s)};
  const get=p=>readFileSync(join(root,p),'utf8');
  try{fn({root,put,get})}finally{rmSync(root,{recursive:true,force:true})}
}
const route=[{workspace:'.',inventory:'SPECTODO.md',scope:'UNIT'}];
const inventory='# Scope\n- UNIT: .\n\n# Versions\n- V0: Test\n\n## APP: App\n- [ ] APP-001 [V0] [P1] The result is shown | D:x I:. P:. V:. | @docs/policy.md\n';
test('no references or writes are accepted when a source is missing',()=>fixture(({root,put})=>{
  put('README.md','# Existing\n');
  assert.throws(()=>applyKickoff({root,inventories:{'SPECTODO.md':inventory},routes:route}),/missing reference/);
  assert.equal(existsSync(join(root,'SPECTODO.md')),false);
  assert.equal(existsSync(join(root,'AGENTS.md')),false);
}));
test('a legacy v0.1 file remains untouched unless migration is requested',()=>fixture(({root,put,get})=>{
  const old='# Versions\n- V0: Test\n\n## APP: App\n- [ ] APP-001 [V0] [P1] The result is shown | D:x I:. P:. V:.\n';
  put('SPECTODO.md',old);put('AGENTS.md','# Existing instructions\n');
  assert.throws(()=>applyKickoff({root,inventories:{'SPECTODO.md':'# Scope\n- UNIT: .\n\n'+old},routes:route}),/explicit authorization/);
  assert.equal(get('SPECTODO.md'),old);
  assert.equal(get('AGENTS.md'),'# Existing instructions\n');
}));
test('an existing v0.2 inventory is never overwritten silently',()=>fixture(({root,put,get})=>{
  put('docs/policy.md','# Policy\n');
  const old=inventory;
  applyKickoff({root,inventories:{'SPECTODO.md':old},routes:route});
  const newVersion=old.replace('I:. P:. V:.','I:x P:. V:.');
  assert.throws(()=>applyKickoff({root,inventories:{'SPECTODO.md':newVersion},routes:route}),/Existing v0.2 inventory differs/);
  assert.equal(get('SPECTODO.md'),old);
}));
test('ambiguous workspace routes are rejected before changing files',()=>fixture(({root,put})=>{
  put('docs/policy.md','# Policy\n');
  const conflict=[...route,...route];
  assert.throws(()=>applyKickoff({root,inventories:{'SPECTODO.md':inventory},routes:conflict}),/exactly one route|duplicate/i);
  assert.equal(existsSync(join(root,'SPECTODO.md')),false);
}));
test('route marker collision is rejected before changing files',()=>fixture(({root,put,get})=>{
  put('docs/policy.md','# Policy\n');
  put('AGENTS.md','# Local rules\n<!-- BEGIN SPECTODO ROUTING -->\n');
  assert.throws(()=>applyKickoff({root,inventories:{'SPECTODO.md':inventory},routes:route}),/Conflicting route markers/);
  assert.equal(existsSync(join(root,'SPECTODO.md')),false);
  assert.equal(get('AGENTS.md'),'# Local rules\n<!-- BEGIN SPECTODO ROUTING -->\n');
}));
test('explicit reconciliation rejects unknown IDs and stale expected states',()=>fixture(({root,put,get})=>{
  put('docs/policy.md','# Policy\n');
  applyKickoff({root,inventories:{'SPECTODO.md':inventory},routes:route});
  const before=inventory.split('\n').find(x=>x.includes('APP-001'));
  const after=before.replace('I:. P:. V:.','I:x P:. V:.');
  assert.throws(()=>reconcileItem({root,id:'APP-002',before,after}),/identity/);
  assert.throws(()=>reconcileItem({root,id:'APP-001',before:before+'!',after}),/previous state mismatch/);
  assert.equal(get('SPECTODO.md'),inventory);
}));

test('human-curated source authority notes survive repeated kickoff updates',()=>fixture(({root,put,get})=>{
  put('docs/policy.md','# Policy\n');
  applyKickoff({root,inventories:{'SPECTODO.md':inventory},routes:route});
  const original=get('docs/spectodo-source-inventory.md');
  put('docs/spectodo-source-inventory.md',original.replace('# Source index\n','# Source index\n\n## Authority review\n- docs/policy.md: current normative project policy\n'));
  put('docs/alternative.md','# Unselected proposal\n');
  applyKickoff({root,inventories:{'SPECTODO.md':get('SPECTODO.md')},routes:route});
  assert.match(get('docs/spectodo-source-inventory.md'),/current normative project policy/);
  assert.match(get('docs/spectodo-source-inventory.md'),/- docs\/alternative\.md/);
  const updated=get('docs/spectodo-source-inventory.md');
  const again=applyKickoff({root,inventories:{'SPECTODO.md':get('SPECTODO.md')},routes:route});
  assert.deepEqual(again.changes,[]);
  assert.equal(get('docs/spectodo-source-inventory.md'),updated);
}));


test('canonical kickoff prompt is short, external-first, and leaves detailed plans opt-in',()=>{
  const guide=readFileSync(new URL('../docs/adoption.md',import.meta.url),'utf8');
  const kickoff=readFileSync(new URL('../.agents/skills/spectodo-kickoff/SKILL.md',import.meta.url),'utf8');
  const readme=readFileSync(new URL('../README.md',import.meta.url),'utf8');
  const label='## 統一キックオフ依頼文（新規リポジトリへそのまま貼り付け）';
  assert.equal(guide.split(label).length-1,1,'only one default kickoff invocation');
  const start=guide.indexOf('~~~text',guide.indexOf(label));
  const end=guide.indexOf('~~~',start+7);
  assert.ok(start>=0&&end>start,'copyable default prompt');
  const prompt=guide.slice(start+7,end);
  assert.ok(prompt.length<650,'user-facing invocation must be compact; detailed steps live in the Skill');
  for (const phrase of [
    'https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo-kickoff/SKILL.md',
    '外部配布元','導入先に存在しなくても配布元から取得',
    'v0.2 stable','全面調査','構造の再編成','詳細inventory',
    '既存v0.1','監査付き移行','詳細実行計画は今回は生成せず',
  ]) assert.ok(prompt.includes(phrase),'missing short default behavior: '+phrase);
  assert.ok(!prompt.includes('【0.')&&!prompt.includes('【3.5.'),
    'implementation steps belong in Skill, not prompt');
  assert.match(guide,/## 詳細実行計画も作りたい場合（明示的なオプション）/);
  const option=guide.slice(guide.indexOf('## 詳細実行計画も作りたい場合'),
    guide.indexOf('## 配布元・バージョン・参照のルール'));
  assert.match(option,/上記のキックオフ依頼文の末尾に、次の1文を追加/);
  assert.match(option,/未完了の全Requirement/);
  assert.match(option,/実装は開始しないでください/);
  assert.match(option,/1項目制限ではありません/);
  assert.match(kickoff,/default kickoff MUST NOT generate/);
  assert.match(kickoff,/Only if the user explicitly adds the optional kickoff sentence/);
  for (const phrase of [
    '## Phase A — exhaustive discovery BEFORE adopting',
    '## Phase B — determine scopes and preserve history',
    '## Phase C — generate inventory',
    '## Phase D — gates and reporting'
  ]) assert.ok(kickoff.includes(phrase),'skill contains operational workflow: '+phrase);
  assert.match(readme,/通常のキックオフでは詳細実行計画を作成しません/);
  assert.match(readme,/1文だけをキックオフ依頼文へ追加/);
});
