import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('optional execution plan contract is discoverable and opt-in',()=>{
  const guide=read('docs/optional-execution-plans.md');
  const skill=read('.agents/skills/spectodo/SKILL.md');
  const kickoff=read('.agents/skills/spectodo-kickoff/SKILL.md');
  const adoption=read('docs/adoption.md');
  const readme=read('README.md');
  const example=read('examples/execution-plan.md');
  for(const heading of ['## Activation and ownership','## Deterministic file identity','## Required sections of every plan','## Execution, stopping and re-planning','## Validation and cost-benefit pilot'])
    assert.ok(guide.includes(heading),'missing contract section: '+heading);
  for(const rule of ['Default: OFF','D/I/P/V','STOP and escalate','total end-to-end cost','planning-only','code+tests'])
    assert.ok(guide.includes(rule),'missing safety/evaluation rule: '+rule);
  assert.match(skill,/Optional detailed execution plans/);
  assert.match(skill,/explicitly requests/);
  assert.match(skill,/staleness/);
  assert.match(kickoff,/optional-execution-plans\.md/);
  assert.match(adoption,/https:\/\/github\.com\/myokoym\/spectodo\/blob\/main\/docs\/optional-execution-plans\.md/);
  assert.match(readme,/任意の詳細実行計画/);
  assert.match(example,/fictional consumer repository example/);
  assert.match(example,/Last verified step: none/);
});
test('worked example has bounded verifiable steps rather than unverified completion claims',()=>{
  const s=read('examples/execution-plan.md');
  const blocks=s.split(/^### Step \d+: /m).slice(1);
  assert.equal(blocks.length,3);
  for(const [i,block] of blocks.entries())
    for(const field of ['- Prerequisites:','- Target:','- Action:','- Expected result:','- Check:','- On failure:'])
      assert.ok(block.includes(field),'step '+(i+1)+' missing '+field);
  assert.match(s,/## Acceptance, rollback and stopping/);
  assert.match(s,/## Checkpoint \/ handoff/);
  assert.match(s,/Evidence \/ checks actually run: none/);
});
test('canonical inventory tracks optional skill and real-model pilot separately',()=>{
  const inv=read('SPECTODO.md');
  const item=inv.split('\n').find(s=>s.startsWith('- [')&&s.includes(' AGENT-012 '));
  const trial=inv.split('\n').find(s=>s.startsWith('- [')&&s.includes(' VALID-007 '));
  assert.ok(item&&item.includes('@docs/optional-execution-plans.md'));
  assert.ok(trial&&trial.includes('V:.')&&trial.includes('@docs/optional-execution-plans.md'));
  assert.ok(!inv.includes('### Step 1:'));
  assert.ok(!read('spec/language-v0.2.md').includes('## Optional execution plans'),'language grammar should not embed optional workflow');
});
