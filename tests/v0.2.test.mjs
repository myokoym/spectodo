import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateInventory, validateRepository} from '../scripts/validate-v0.2.mjs';

const read = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
const single = '# Scope\n- PROJECT: .\n\n# Versions\n- V0: Planning\n\n## PLAN: Planning\n- [ ] PLAN-001 [V0] [P1] Documentation can be reviewed | D:x I:- P:- V:.';
const nested = '# Scope\n- STORE: apps/store/\n\n# Versions\n- V0: Build\n\n## WEB: Store\n- [ ] WEB-001 [V0] [P1] Product catalog is visible | D:x I:. P:. V:.';
test('root v0.2 repository is structurally valid',()=> assert.deepEqual(validateInventory(read('SPECTODO.md'),'SPECTODO.md').errors,[]));
test('planning-only design outcome is valid',()=> assert.deepEqual(validateInventory(single.replace('V:.','V:x').replace('[ ]','[x]'),'SPECTODO.md').errors,[]));
test('intended future implementation stays pending',()=> assert.deepEqual(validateInventory(nested,'apps/store/SPECTODO.md').errors,[]));
test('root and nested routes are unambiguous',()=>assert.deepEqual(validateRepository([{path:'SPECTODO.md',source:single},{path:'apps/store/SPECTODO.md',source:nested}],[{workspace:'.',inventory:'SPECTODO.md'},{workspace:'apps/store/',inventory:'apps/store/SPECTODO.md'}],['.','apps/store/']),[]));
test('missing and duplicate routes are rejected',()=> assert.ok(validateRepository([{path:'SPECTODO.md',source:single}],[{workspace:'.',inventory:'SPECTODO.md'},{workspace:'.',inventory:'SPECTODO.md'}],['.']).length>0));
test('checkbox mismatch is rejected',()=> assert.ok(validateInventory(single.replace('[ ]','[x]'),'SPECTODO.md').errors.length>0));
test('gap and escapes are validated',()=>{const bad=single.replace('D:x','D:~');assert.ok(validateInventory(bad,'SPECTODO.md').errors.length>0); const ok=single.replace('Documentation can be reviewed','Pipe \\| and slash \\\\ can be read');assert.deepEqual(validateInventory(ok,'SPECTODO.md').errors,[]);});
test('idempotent read/audit leaves identical file bytes',()=>{const source=read('SPECTODO.md');assert.deepEqual(validateInventory(source,'SPECTODO.md'),validateInventory(source,'SPECTODO.md'));assert.equal(source,read('SPECTODO.md'));});
test('v0.1 root migration preserves all record lines exactly',()=>{const old=read('examples/SPECTODO.md');const migrated='# Scope\n- PROJECT: .\n\n'+old;assert.deepEqual(validateInventory(migrated,'SPECTODO.md').errors,[]); assert.equal(migrated.replace(/^# Scope\n- PROJECT: \.\n\n/,''),old);});
test('v0.2 scoped sample matches declared canonical path',()=>assert.deepEqual(validateInventory(read('examples/scoped-SPECTODO.md'),'apps/storefront/SPECTODO.md').errors,[]));
test('v0.2 root/planning samples pass with staged paths',()=>{assert.deepEqual(validateInventory(read('examples/root-v0.2.md'),'SPECTODO.md').errors,[]);assert.deepEqual(validateInventory(read('examples/planning-v0.2.md'),'SPECTODO.md').errors,[]);});
test('duplicate scope roots are rejected',()=>{const dup=nested.replace('STORE: apps/store/','ANOTHER: .');assert.ok(validateRepository([{path:'SPECTODO.md',source:single},{path:'SPECTODO.md',source:dup}],[{workspace:'.',inventory:'SPECTODO.md'}],['.']).length>0);});

test('duplicate item IDs are rejected',()=>{
  const two=single.replace('Documentation can be reviewed |','Documentation can be reviewed |')+'\n- [ ] PLAN-001 [V0] [P2] Another behavior is specified | D:x I:. P:. V:.';
  assert.ok(validateInventory(two,'SPECTODO.md').errors.some(x=>x.includes('duplicate ID')));
});
test('references can be checked against actual repository files',()=>{
  const good=single+' | @README.md';
  assert.deepEqual(validateInventory(good,'SPECTODO.md',{knownPaths:new Set(['README.md'])}).errors,[]);
  assert.ok(validateInventory(good,'SPECTODO.md',{knownPaths:new Set()}).errors.some(x=>x.includes('missing reference')));
});
test('invalid backslash escapes are rejected',()=>{
  assert.ok(validateInventory(single.replace('Documentation can be reviewed','Invalid \\n escape'),'SPECTODO.md').errors.length>0);
});
test('incremental update preserves item identity while reconciling evidence',()=>{
  const before=single,after=single.replace('D:x I:- P:- V:.','D:x I:- P:- V:x').replace('[ ]','[x]');
  assert.deepEqual(validateInventory(before,'SPECTODO.md').errors,[]);
  assert.deepEqual(validateInventory(after,'SPECTODO.md').errors,[]);
  assert.equal((before.match(/PLAN-001/g)||[]).length,1);
  assert.equal((after.match(/PLAN-001/g)||[]).length,1);
  assert.equal(after.replace('D:x I:- P:- V:x','D:x I:- P:- V:.').replace('[x]','[ ]'),before);
});
