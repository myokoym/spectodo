import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,existsSync,copyFileSync,rmSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {applyKickoff} from '../scripts/kickoff-v0.2.mjs';
import {validateInventory,validateRepository} from '../scripts/validate-v0.2.mjs';

// This exercises the local-file consequences of a clean-room bootstrap.
// It is NOT an autonomous Codex run and does not test live GitHub connectivity.
test('new planning-only repository can install pinned source files, create inventory and rerun unchanged',()=>{
  const consumer=mkdtempSync(join(tmpdir(),'spectodo-external-bootstrap-'));
  const source=new URL('../',import.meta.url);
  const put=(p,s)=>{mkdirSync(dirname(join(consumer,p)),{recursive:true});writeFileSync(join(consumer,p),s);};
  const get=p=>readFileSync(join(consumer,p),'utf8');
  const required=[
    'spec/language-v0.2.md',
    '.agents/skills/spectodo-kickoff/SKILL.md',
    '.agents/skills/spectodo/SKILL.md',
    'docs/optional-execution-plans.md',
    'examples/execution-plan.md',
  ];
  try {
    put('README.md','# Museum research\nDocumentation-only planning.\n');
    put('AGENTS.md','# Existing rules\nPreserve documented decisions.\n');
    put('docs/requirements.md','# Current requirements\nA visitor can review the exhibit plan.\n');
    for(const p of required)assert.equal(existsSync(join(consumer,p)),false,'consumer must start without '+p);
    // In CI all source files come from the single checkout commit, mirroring a pinned source SHA.
    for(const p of required){
      const original=new URL(p,source);
      const target=join(consumer,p);
      assert.ok(existsSync(original),'required upstream source must exist: '+p);
      mkdirSync(dirname(target),{recursive:true});
      copyFileSync(original,target);
      assert.equal(get(p),readFileSync(original,'utf8'),'installed file bytes must match source: '+p);
    }
    put('AGENTS.md',get('AGENTS.md')+'\nSpectodo source: myokoym/spectodo, pinned SHA: example-pinned-source.\n');
    const inv='# Scope\n- PROJECT: .\n\n# Versions\n- V0: Research\n\n## PLAN: Planning\n- [ ] PLAN-001 [V0] [P1] A visitor can review the exhibit plan | D:x I:- P:- V:. | @docs/requirements.md\n';
    const routes=[{workspace:'.',inventory:'SPECTODO.md',scope:'PROJECT'}];
    const first=applyKickoff({root:consumer,inventories:{'SPECTODO.md':inv},routes});
    assert.ok(first.changes.includes('SPECTODO.md'));
    assert.equal(get('SPECTODO.md'),inv);
    assert.match(get('AGENTS.md'),/Preserve documented decisions/);
    assert.match(get('AGENTS.md'),/pinned SHA: example-pinned-source/);
    const known=new Set(['README.md','AGENTS.md','docs/requirements.md','SPECTODO.md',...required,'docs/spectodo-source-inventory.md']);
    assert.deepEqual(validateInventory(inv,'SPECTODO.md',{knownPaths:known}).errors,[]);
    assert.deepEqual(validateRepository([{path:'SPECTODO.md',source:inv}],[{workspace:'.',inventory:'SPECTODO.md'}],['.']),[]);
    const firstIndex=get('docs/spectodo-source-inventory.md');
    for(const p of required)assert.ok(firstIndex.includes('- '+p),'installed source missing from index: '+p);
    const before=required.concat(['SPECTODO.md','AGENTS.md','docs/spectodo-source-inventory.md']).map(p=>get(p));
    const rerun=applyKickoff({root:consumer,inventories:{'SPECTODO.md':inv},routes});
    assert.deepEqual(rerun.changes,[],'fixed-source rerun must not churn installed files');
    assert.deepEqual(required.concat(['SPECTODO.md','AGENTS.md','docs/spectodo-source-inventory.md']).map(p=>get(p)),before);
  } finally {rmSync(consumer,{recursive:true,force:true});}
});
