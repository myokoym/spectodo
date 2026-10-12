import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {applyKickoff,reconcileItem} from '../scripts/kickoff-v0.2.mjs';
import {validateInventory} from '../scripts/validate-v0.2.mjs';
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


test('new-install prompt is short and handles all source states without auto-migration',()=>{
  const guide=readFileSync(new URL('../docs/adoption.md',import.meta.url),'utf8');
  const kickoff=readFileSync(new URL('../.agents/skills/spectodo-kickoff/SKILL.md',import.meta.url),'utf8');
  const readme=readFileSync(new URL('../README.md',import.meta.url),'utf8');
  assert.match(guide,/新規導入.*プロジェクト固有の情報がすでに存在し、Spectodoの正本だけが未導入/);
  assert.match(guide,/Git初期化直後や、タイトルだけのREADMEでは製品のRequirementを抽出できません/);
  assert.match(guide,/## 新規導入の指定方法（そのままコピー）/);
  const start=guide.indexOf('~~~text'),end=guide.indexOf('~~~',start+7);
  assert.ok(start>=0&&end>start);
  const prompt=guide.slice(start+7,end);
  assert.ok(prompt.length<550,'new installation prompt must stay compact');
  for(const phrase of [
    'https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo-kickoff/SKILL.md',
    'v0.2 stable','新規導入','外部配布元','ローカル未配置','実在する内容を全面調査',
    '構造の再編','詳細inventory','根拠のないTODOを捏造したりしない',
    'すでにSpectodoがある場合は新規上書き・自動移行せず',
    '詳細実行計画は明示指定時のみ'
  ]) assert.ok(prompt.includes(phrase),'missing new-install behavior: '+phrase);
  assert.doesNotMatch(prompt,/既存v0.1は公式移行手順で監査付き移行/);
  for(const s of [
    '企画・調査・検討・仕様などの資料のみ','コード・テスト・設定',
    '一部配置済み','v0.2 inventory導入済み','v0.1 inventory導入済み',
    'monorepo','未コミット変更'
  ]) assert.ok(guide.includes(s),'missing detected repository state: '+s);
  assert.match(guide,/## 導入済みの場合だけ使う別の指示/);
  assert.match(guide,/既存v0.2の再キックオフ・資料再編/);
  assert.match(guide,/既存v0.1から共通v0.2への明示的移行/);
  assert.match(guide,/## 詳細実行計画も必要な場合（任意オプション）/);
  assert.match(guide,/新規導入または再キックオフの依頼文の末尾にのみ/);
  assert.match(kickoff,/Default user-facing invocation in docs\/adoption\.md = NEW INSTALL into a repository with real project-specific material/);
  assert.match(kickoff,/Existing canonical v0\.2 inventory/);
  assert.match(kickoff,/Existing canonical v0\.1 inventory/);
  assert.match(kickoff,/OUT OF SCOPE/);
  assert.match(kickoff,/do not install a boilerplate bundle/);
  assert.match(kickoff,/Do not conflate the work of adopting Spectodo with a product\/project Requirement/);
  assert.match(kickoff,/Only the separate EXPLICIT v0\.1 migration invocation authorizes migration/);
  assert.match(kickoff,/The default kickoff MUST NOT generate/);
  for(const s of ['## Phase A — exhaustive discovery BEFORE adopting',
    '## Phase B — determine scopes and preserve history',
    '## Phase C — generate inventory','## Phase D — gates and reporting'])
    assert.ok(kickoff.includes(s),'missing durable procedural skill phase: '+s);
  assert.match(readme,/新規導入.*Spectodo未導入のリポジトリ/);
  assert.match(readme,/Git初期化だけで中身がない場合はSpectodoに登録できる要件がないため対象外/);
  assert.match(readme,/v0\.1\/v0\.2の正本がある場合は新規導入とは区別/);
});

test('no project content is out of scope and cannot be replaced with a fake inventory',()=>{
  const inventory='# Scope\n- PROJECT: .\n\n# Versions\n- V0: Placeholder\n';
  const guide=readFileSync(new URL('../docs/adoption.md',import.meta.url),'utf8');
  const skill=readFileSync(new URL('../.agents/skills/spectodo-kickoff/SKILL.md',import.meta.url),'utf8');
  assert.match(guide,/対象外：プロジェクト固有の内容が存在しないリポジトリ/);
  assert.match(guide,/Spectodoを導入せず、TODOや形式上のダミーRequirementも作らず/);
  assert.match(skill,/Do not install the Spectodo bundle, scaffold dummy inventory/);
  const valid=validateInventory(inventory,'SPECTODO.md');
  assert.ok(valid.errors.some(s=>/missing categories/.test(s)),
    'do not emit a fake empty canonical inventory simply to mark an empty repo done');
});
