import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateInventory} from '../scripts/validate-v0.2.mjs';

// These are contract/format checks, NOT proof that a live LLM obeys the guidance.
const skill=readFileSync(new URL('../.agents/skills/spectodo/SKILL.md',import.meta.url),'utf8');
const kickoff=readFileSync(new URL('../.agents/skills/spectodo-kickoff/SKILL.md',import.meta.url),'utf8');
const readme=readFileSync(new URL('../README.md',import.meta.url),'utf8');
const proposal=readFileSync(new URL('../proposals/roadmap-integrated.md',import.meta.url),'utf8');

test('a roadmap request starts at canonical Versions and Requirements, not a new source of truth',()=>{
  for(const phrase of [
    'Resolve the active workspace through its existing canonical routing',
    'all associated Requirements across categories',
    'does **not** authorize a second authoritative plan',
    'Do not infer from the absence of',
    'Check existing',
    'do not necessarily constitute a complete product roadmap'
  ]) assert.ok(skill.includes(phrase),'missing operational guard: '+phrase);
  assert.ok(kickoff.includes('The mere word "roadmap" in a request MUST NOT trigger'));
  assert.ok(kickoff.includes('preserve its original content and authority'));
  assert.ok(readme.includes('独立した'));
});

test('display-only cannot authorize edits and real adopted new Versions remain possible',()=>{
  assert.ok(skill.includes('without changing files unless editing is also requested'));
  assert.ok(skill.includes('only when the user has authorized a modification'));
  assert.ok(skill.includes('Adding a genuinely adopted new Version/Requirement is allowed'));
  assert.ok(skill.includes('inventing a milestone, goal, date, dependency'));
  assert.ok(skill.includes('Preserve category grouping, stable IDs, completed Requirements'));
  assert.ok(skill.includes('If all Requirements are complete, v0.2 has no default active Version'));
  assert.ok(skill.includes('A Version with zero Requirements'));
});

test('an explicitly requested separate document remains possible but is not another state owner',()=>{
  assert.ok(skill.includes('Explicit separate document'));
  assert.ok(skill.includes('It is not a new owner of Version/Requirement/progress states'));
  assert.ok(skill.includes('respect that ownership instead of erasing'));
  assert.ok(kickoff.includes('an independent roadmap artifact is explicitly requested'));
});

test('stable v0.2 accepts Version/Requirement tracking and rejects new Goal metadata',()=>{
  const existing=[
    '# Scope',
    '- DEMO: .',
    '',
    '# Versions',
    '- V0: Prototype',
    '- V1: Release',
    '- V2: Future',
    '',
    '## APP: Functionality',
    '- [x] APP-001 [V0] [P1] Works | D:x I:x P:- V:x',
    '- [ ] APP-002 [V1] [P1] Ships | D:x I:. P:. V:.',
    ''
  ].join('\n');
  assert.deepEqual(validateInventory(existing,'SPECTODO.md').errors,[]);
  assert.ok(validateInventory(existing.replace('- V1: Release','- V1: Release\n  - Goal: Shipping'),'SPECTODO.md')
    .errors.some(e=>e.includes('invalid version declaration')));
  assert.ok(validateInventory(existing.replace('[V1]','[V8]'),'SPECTODO.md')
    .errors.some(e=>e.includes('unknown target version')));
  assert.ok(skill.includes('Neither assume Goal/Exit fields are necessary nor insert unrecognized lines'));
  assert.ok(proposal.includes('追加の必要性が先に立証された場合の比較候補の一つ'));
});

test('consumer repositories must explicitly refresh pinned sources to obtain later guidance',()=>{
  assert.ok(kickoff.includes('do not automatically update consumer repositories'));
  assert.ok(readme.includes('固定SHA'));
  assert.ok(readme.includes('明示的な更新'));
});

test('no claim of real-agent behavior validation arises from static contract tests',()=>{
  assert.ok(skill.includes('A passing static wording test does not prove real-agent compliance'));
  assert.ok(proposal.includes('未採用・未実装'));
});
