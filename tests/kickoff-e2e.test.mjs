import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync, rmSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {validateInventory, validateRepository} from '../scripts/validate-v0.2.mjs';

function sandbox() { return mkdtempSync(join(tmpdir(), 'spectodo-kickoff-')); }
function put(root, path, content) { const out=join(root,path); mkdirSync(dirname(out),{recursive:true}); writeFileSync(out,content); }
function get(root,path) { return readFileSync(join(root,path),'utf8'); }
function all(root,rel='') {
  return readdirSync(join(root,rel),{withFileTypes:true}).flatMap(e=>{
    const p=rel ? rel+'/'+e.name:e.name;
    return e.isDirectory()?all(root,p):[p];
  }).sort();
}
function digest(root) {
  return createHash('sha256').update(all(root).map(p=>p+'\0'+get(root,p)).join('\0')).digest('hex');
}
function install(root,{inventory,scope='PROJECT',path='SPECTODO.md',routes=[{workspace:'.',inventory:'SPECTODO.md',scope}]}) {
  const originalFiles=all(root).filter(p=>!p.startsWith('.agents/') && !p.startsWith('spec/'));
  const sourceIndex='# Source index\n\n'+originalFiles.map(p=>'- '+p).join('\n')+'\n';
  const existingAgents=existsSync(join(root,'AGENTS.md'))?get(root,'AGENTS.md'):'# Agent instructions\n';
  const marker='\n<!-- BEGIN SPECTODO ROUTING -->\n';
  const routing=marker+routes.map(r=>`Active workspace root ${r.workspace} maps to ${r.inventory} (scope ${r.scope}).`).join('\n')+'\n<!-- END SPECTODO ROUTING -->\n';
  const agent=existingAgents.includes(marker)?existingAgents.replace(/\n<!-- BEGIN SPECTODO ROUTING -->[\s\S]*?<!-- END SPECTODO ROUTING -->\n/,routing):existingAgents.trimEnd()+'\n'+routing;
  if(!existsSync(join(root,path)))put(root,path,inventory);
  if(!existsSync(join(root,'docs/spectodo-source-inventory.md')))put(root,'docs/spectodo-source-inventory.md',sourceIndex);
  if(agent!==existingAgents)put(root,'AGENTS.md',agent);
  return {originalFiles};
}
function audit(root, paths, routes, workspaces) {
  const candidates=paths.map(path=>({path,source:get(root,path)}));
  const e=validateRepository(candidates,routes,workspaces);
  const known=new Set(all(root));
  for(const {path,source} of candidates) e.push(...validateInventory(source,path,{knownPaths:known}).errors);
  assert.deepEqual(e,[]);
  assert.equal(new Set(paths).size,paths.length);
}
function ids(text) {
  return [...text.matchAll(/^- \[[ x]\] ([A-Z][A-Z0-9-]*-\d{3}) /gm)].map(m=>m[1]);
}
function migrateLegacy(root,scope) {
  const old=get(root,'SPECTODO.md');
  assert.ok(old.startsWith('# Versions\n'),'precondition: existing unscoped v0.1');
  const records=old.split('\n').filter(l=>/^- \[[ x]\] |^- [A-Z][A-Z0-9-]*-\d{3} /.test(l));
  const versionNames=old.split('\n').filter(l=>/^- V\d+: /.test(l));
  assert.ok(records.length>0 && versionNames.length>0);
  const newText='# Scope\n- '+scope+': .\n\n'+old;
  put(root,'SPECTODO.md',newText);
  const ledger='# Migration ledger\n\n'+records.map(l=>'- preserve: '+l).join('\n')+'\n\n'+versionNames.map(v=>'- version-preserved: '+v).join('\n')+'\n';
  put(root,'docs/spectodo-migration-ledger.md',ledger);
  assert.equal(newText.replace(/^# Scope\n- [A-Z]+: \.\n\n/,''),old);
  for(const line of records)assert.ok(newText.includes(line));
  return {records,versionNames};
}
function updateItem(root,path,from,to) {
  const before=get(root,path);
  assert.ok(before.includes(from));
  const after=before.replace(from,to);
  put(root,path,after);
  assert.deepEqual(ids(after),ids(before));
  return {before,after};
}

test('kickoff E2E: documentation-only initial / repeated / evidence update / audit',()=>{
  const root=sandbox();
  try {
    put(root,'README.md','# Plant study\nCurrent: design research; no application code.\n');
    put(root,'AGENTS.md','# Domain policy\nDo not mistake proposals for decisions.\n');
    put(root,'docs/baseline.md','# Baseline\nA user reviews observation choices.\n');
    put(root,'docs/proposal.md','# Proposal\nPossible future implementation; not delivered.\n');
    const inv='# Scope\n- STUDY: .\n\n# Versions\n- V0: Research\n- V1: Future product\n\n# Constraints\n- RULE-001 Proposed capabilities remain unimplemented until evidence exists\n\n## PLAN: Design\n- [ ] PLAN-001 [V0] [P1] A design baseline can be reviewed | D:x I:- P:- V:. | @docs/baseline.md\n\n## PRODUCT: Future capability\n- [ ] PRODUCT-001 [V1] [P1] Observation results are visible in the app | D:x I:. P:. V:. | @docs/proposal.md\n';
    const baseline=all(root);
    install(root,{inventory:inv,scope:'STUDY'});
    audit(root,['SPECTODO.md'],[{workspace:'.',inventory:'SPECTODO.md'}],['.']);
    const initial=get(root,'SPECTODO.md');
    const hash=digest(root);
    install(root,{inventory:inv,scope:'STUDY'});
    assert.equal(digest(root),hash,'second run must produce zero changed bytes');
    assert.deepEqual(ids(get(root,'SPECTODO.md')),ids(initial));
    assert.ok(baseline.every(x=>all(root).includes(x)),'initial documents must survive');
    for(const p of baseline)assert.ok(get(root,'docs/spectodo-source-inventory.md').includes('- '+p),'source census missing '+p);
    updateItem(root,'SPECTODO.md','- [ ] PLAN-001 [V0] [P1] A design baseline can be reviewed | D:x I:- P:- V:.','- [x] PLAN-001 [V0] [P1] A design baseline can be reviewed | D:x I:- P:- V:x');
    audit(root,['SPECTODO.md'],[{workspace:'.',inventory:'SPECTODO.md'}],['.']);
    assert.match(get(root,'SPECTODO.md'),/PRODUCT-001 .* I:\. P:\. V:\./);
  } finally {rmSync(root,{recursive:true,force:true});}
});

test('kickoff E2E: application code, two explicit scopes, rerun and failed test reconciliation',()=>{
  const root=sandbox();
  try {
    put(root,'README.md','# Shared project\nApplication is in apps/web/.\n');
    put(root,'AGENTS.md','# Existing instructions\nKeep application-specific rules local.\n');
    put(root,'docs/policy.md','# Shared policy\nDistinct scopes do not inherit progress.\n');
    put(root,'apps/web/src/app.mjs',"export const answer = () => 42;\n");
    put(root,'apps/web/tests/app.test.mjs',"import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport {answer} from '../src/app.mjs';\ntest('answer',()=>assert.equal(answer(),42));\n");
    const rootInv='# Scope\n- SHARED: .\n\n# Versions\n- V0: Shared policy\n\n## DOC: Documentation\n- [x] DOC-001 [V0] [P1] A shared policy can be read | D:x I:- P:- V:x | @docs/policy.md\n';
    const webInv='# Scope\n- WEB: apps/web/\n\n# Versions\n- V0: Working application\n\n## APP: App\n- [x] APP-001 [V0] [P1] App answer is 42 | D:x I:x P:- V:x | @apps/web/src/app.mjs @apps/web/tests/app.test.mjs\n';
    const declaredRoutes=[{workspace:'.',inventory:'SPECTODO.md',scope:'SHARED'},{workspace:'apps/web/',inventory:'apps/web/SPECTODO.md',scope:'WEB'}];
    install(root,{inventory:rootInv,scope:'SHARED',routes:declaredRoutes});
    put(root,'apps/web/SPECTODO.md',webInv);
    const routes=[{workspace:'.',inventory:'SPECTODO.md'},{workspace:'apps/web/',inventory:'apps/web/SPECTODO.md'}];
    audit(root,['SPECTODO.md','apps/web/SPECTODO.md'],routes,['.','apps/web/']);
    assert.match(get(root,'AGENTS.md'),/apps\/web\/SPECTODO\.md \(scope WEB\)/);
    const testFile=join(root,'apps/web/tests/app.test.mjs');
    const isolatedEnv={...process.env};
    delete isolatedEnv.NODE_TEST_CONTEXT;
    const runAppTest=()=>spawnSync(process.execPath,['--test',testFile],{encoding:'utf8',env:isolatedEnv});
    const verified=runAppTest();
    assert.equal(verified.status,0,verified.stdout+'\n'+verified.stderr);
    const hash=digest(root);install(root,{inventory:rootInv,scope:'SHARED',routes:declaredRoutes});
    assert.equal(digest(root),hash);
    put(root,'apps/web/src/app.mjs',"export const answer = () => 41;\n");
    assert.equal(get(root,'apps/web/src/app.mjs'),"export const answer = () => 41;\n");
    const broken=runAppTest();
    assert.notEqual(broken.status,0,'a real regression must fail the application test: '+broken.stdout+' '+broken.stderr);
    updateItem(root,'apps/web/SPECTODO.md',
      '- [x] APP-001 [V0] [P1] App answer is 42 | D:x I:x P:- V:x',
      '- [ ] APP-001 [V0] [P1] App answer is 42 | D:x I:~ P:- V:~ | !Implementation no longer returns 42');
    audit(root,['SPECTODO.md','apps/web/SPECTODO.md'],routes,['.','apps/web/']);
    assert.equal(ids(get(root,'apps/web/SPECTODO.md'))[0],'APP-001');
    assert.match(get(root,'SPECTODO.md'),/DOC-001 .* V:x/);
  } finally {rmSync(root,{recursive:true,force:true});}
});

test('kickoff E2E: existing v0.1 migration / source retention / rerun / reconciliation / audit',()=>{
  const root=sandbox();
  try {
    put(root,'README.md','# Historical project\n');
    put(root,'docs/work.md','# Specification evidence\nTask is documented, not yet implemented.\n');
    put(root,'AGENTS.md','# Keep existing product constraints\n');
    const original='# Versions\n- V0: Prototype\n\n# Constraints\n- RULE-001 Requirements are not silently discarded\n\n## TASK: Prototype\n- [ ] TASK-001 [V0] [P1] A tested prototype can be executed | D:x I:. P:- V:. | @docs/work.md\n- [x] TASK-002 [V0] [P2] A specification exists | D:x I:- P:- V:x | @docs/work.md\n';
    put(root,'SPECTODO.md',original);
    const existing=all(root);
    const outcome=migrateLegacy(root,'LEGACY');
    assert.equal(outcome.records.length,3);
    assert.equal(outcome.versionNames.length,1);
    install(root,{inventory:'unused',scope:'LEGACY'});
    audit(root,['SPECTODO.md'],[{workspace:'.',inventory:'SPECTODO.md'}],['.']);
    const hash=digest(root);install(root,{inventory:'unused',scope:'LEGACY'});
    assert.equal(hash,digest(root));
    assert.ok(existing.every(x=>all(root).includes(x)));
    updateItem(root,'SPECTODO.md',
      'TASK-001 [V0] [P1] A tested prototype can be executed | D:x I:. P:- V:.',
      'TASK-001 [V0] [P1] A tested prototype can be executed | D:x I:> P:- V:.');
    audit(root,['SPECTODO.md'],[{workspace:'.',inventory:'SPECTODO.md'}],['.']);
    for(const record of outcome.records)assert.ok(get(root,'docs/spectodo-migration-ledger.md').includes(record));
  } finally {rmSync(root,{recursive:true,force:true});}
});
