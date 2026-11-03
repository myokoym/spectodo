import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateInventory} from '../scripts/validate-v0.2.mjs';

const skill=readFileSync(new URL('../.agents/skills/spectodo/SKILL.md',import.meta.url),'utf8');
const kickoff=readFileSync(new URL('../.agents/skills/spectodo-kickoff/SKILL.md',import.meta.url),'utf8');
const readme=readFileSync(new URL('../README.md',import.meta.url),'utf8');

test('roadmap queries are explicitly routed to the canonical Versions/Requirements',()=>{
  assert.match(skill,/## Handle roadmap requests using the canonical inventory/);
  assert.match(skill,/Resolve the active workspace to its canonical `SPECTODO\.md` first/);
  assert.match(skill,/all.*categories/);
  assert.match(skill,/not.*second tracking system/i);
  assert.match(skill,/Do NOT create `ROADMAP\.md`/);
  assert.match(skill,/Do not assume the absence of `ROADMAP\.md` means the project has no roadmap/);
  assert.match(kickoff,/Treat the target Version declarations and their associated canonical Requirements as Spectodo's existing roadmap backbone/);
  assert.match(kickoff,/MUST NOT create a standalone `ROADMAP\.md`/);
  assert.match(readme,/ロードマップの確認・更新/);
  assert.match(readme,/別のロードマップ正本やROADMAP\.mdは勝手に作らないでください/);
});

test('show and update instructions preserve v0.2 progress and version semantics',()=>{
  assert.match(skill,/lowest Version with incomplete Requirements/);
  assert.match(skill,/no requirements defined/);
  assert.match(skill,/not.*complete/i);
  assert.match(skill,/Requirement assignments\/statements\/priorities\/progress/);
  assert.match(skill,/Keep category grouping, item IDs, completed requirements, scope boundaries, and status axes intact/);
  assert.match(skill,/do not turn a plan into a parallel task ledger/);
});

test('future version proposals cannot silently become stable v0.2 metadata',()=>{
  assert.match(skill,/Stable v0\.2 has no structured Goal\/Exit\/target-date\/dependency fields/);
  assert.match(skill,/Do not silently insert unsupported metadata into a v0\.2 inventory/);
  assert.match(kickoff,/Do not silently upgrade v0\.1\/v0\.2 on kickoff/);
  const existing='# Scope\n- DEMO: .\n\n# Versions\n- V0: Prototype\n- V1: Release\n\n## APP: Functionality\n- [x] APP-001 [V0] [P1] Works | D:x I:x P:- V:x\n- [ ] APP-002 [V1] [P1] Ships | D:x I:. P:. V:.\n';
  assert.deepEqual(validateInventory(existing,'SPECTODO.md').errors,[]);
  const unsupported=existing.replace('- V1: Release','- V1: Release\n  - Goal: Shipping');
  assert.ok(validateInventory(unsupported,'SPECTODO.md').errors.some(e=>e.includes('invalid version declaration')));
});

test('an explicit separate roadmap request remains possible but cannot supersede canonical inventory',()=>{
  assert.match(skill,/If a separate roadmap document is \*\*explicitly requested\*\*/);
  assert.match(skill,/supporting explanation or a derived view/);
  assert.match(skill,/do not replicate mutable D\/I\/P\/V as a second truth/);
  assert.match(kickoff,/preserve it, extract only adopted requirements/);
});
