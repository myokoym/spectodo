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


test('canonical kickoff prompt is externally resolvable, pinned and end-to-end scoped',()=>{
  const adoption=readFileSync(new URL('../docs/adoption.md',import.meta.url),'utf8');
  const kickoff=readFileSync(new URL('../.agents/skills/spectodo-kickoff/SKILL.md',import.meta.url),'utf8');
  const readme=readFileSync(new URL('../README.md',import.meta.url),'utf8');
  const upstream='https://github.com/myokoym/spectodo/blob/main/';
  for (const relative of [
    'docs/adoption.md',
    '.agents/skills/spectodo-kickoff/SKILL.md',
    '.agents/skills/spectodo/SKILL.md',
    'spec/language-v0.2.md',
    'spec/language-v0.1.md',
    'docs/migration-v0.1-to-v0.2.md',
  ]) assert.ok(adoption.includes(upstream+relative),relative+' must have complete upstream URL');

  const intro='## 統一キックオフ依頼文（新規リポジトリへそのまま貼り付け）';
  const from=adoption.indexOf(intro);
  const fence=adoption.indexOf('~~~text',from);
  const end=adoption.indexOf('~~~',fence+7);
  assert.ok(from>=0&&fence>from&&end>fence,'one complete copyable prompt must be present');
  const prompt=adoption.slice(fence+7,end);
  for (const required of [
    '配布元Spectodo内', 'ローカルのSkill探索だけで停止しない',
    '既に配布元のv0.2 stableコミットSHAが導入先', 'そのSHAを再利用',
    '配布元mainの現在のHEAD SHA', '同一SHAのREADME',
    'source/evidence', 'crosswalk', '現行要件', '移動・統合前後',
    'disposition ledger', 'D/I/P/V', '第1監査', '第2監査', '第3監査',
    '解消不能な問題は未完了',
  ]) assert.ok(prompt.includes(required),'missing in canonical prompt: '+required);
  assert.equal(adoption.split(intro).length-1,1,'one canonical prompt only');
  assert.match(kickoff,/Never stop simply because they are absent locally/);
  assert.match(kickoff,/REUSE that SHA on routine reruns/);
  assert.match(kickoff,/source-to-ID coverage/);
  assert.match(readme,/新規リポジトリでは、ローカルSkillの存在を前提にしません/);
});
