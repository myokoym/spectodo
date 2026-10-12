import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('README and copied guide offer the same safe Japanese invocation',()=>{
  const readme=read('README.md');
  const adoption=read('docs/adoption.md');
  const guide=read('docs/optional-execution-plans.md');
  const skill=read('.agents/skills/spectodo/SKILL.md');
  const kickoff=read('.agents/skills/spectodo-kickoff/SKILL.md');
  const start=readme.indexOf('### 指定方法（そのままコピーして使う）');
  const end=readme.indexOf('## 共通導入',start);
  assert.ok(start>=0&&end>start,'copyable Japanese usage must appear in README');
  const entry=readme.slice(start,end);
  const prompts=[...entry.matchAll(/~~~text\n([\s\S]*?)\n~~~/g)].map(x=>x[1]);
  const portablePrompts=[...guide.matchAll(/~~~text\n([\s\S]*?)\n~~~/g)].map(x=>x[1]);
  assert.equal(prompts.length,2,'must give one planning-only and one execution prompt');
  assert.deepEqual(portablePrompts,prompts,'copied guide must contain the identical usage commands');
  for(const p of prompts){
    assert.match(p,/Spectodoの詳細実行計画/);
    assert.match(p,/対象「AUTH-001」/);
    assert.match(p,/検証|確認/);
  }
  assert.match(prompts[0],/今回は実作業を開始しない/);
  assert.match(prompts[0],/失敗時の停止条件/);
  assert.match(prompts[1],/作業を実行してください/);
  assert.match(prompts[1],/想定外の問題/);
  assert.match(prompts[1],/対象の計画が存在しない、または一意に特定できない場合は停止/);
  assert.match(prompts[1],/SPECTODO\.mdのD\/I\/P\/V/);
  assert.match(entry,/専用コマンドやSkillの全文を読む必要はありません/);
  assert.match(entry,/古い固定SHA/);
  assert.match(adoption,/\[README「指定方法（そのままコピーして使う）」\]\(\.\.\/README\.md#指定方法そのままコピーして使う\)/);
  assert.match(guide,/このガイドを導入先に配布すれば/);
  assert.match(guide,/## 最短の指定方法（そのままコピー）/);
  assert.doesNotMatch(guide,/\.\.\/README\.md/, 'consumer README may not contain the Spectodo usage section');
  assert.match(guide,/https:\/\/github\.com\/myokoym\/spectodo\/blob\/main\/README\.md#指定方法そのままコピーして使う/);
  assert.match(skill,/Optional detailed execution plans/);
  assert.match(skill,/explicitly requests/);
  assert.match(kickoff,/optional-execution-plans\.md/);
  assert.match(kickoff,/examples\/execution-plan\.md/);
});

test('Japanese optional execution guide states opt-in, recovery and evidence rules',()=>{
  const guide=read('docs/optional-execution-plans.md');
  for(const h of ['## 1. 使う条件と責任の所在','## 2. 保存場所と識別方法','## 3. 計画に必要な内容','## 4. 計画の作成手順','## 5. 実行・停止・計画更新','## 6. 実モデル・費用対効果の検証（未実施）'])
    assert.ok(guide.includes(h),'missing guidance: '+h);
  for(const rule of ['初期状態では無効','明示的に依頼','D/I/P/V','推測で進まず停止して報告','計画作成やレビューを含む総費用','企画のみ'])
    assert.ok(guide.includes(rule),'missing rule: '+rule);
  assert.match(guide,/\.\.\/examples\/execution-plan\.md/);
  assert.match(guide,/\(#最短の指定方法そのままコピー\)/);
});

test('Japanese worked example has three bounded steps and no fabricated completion',()=>{
  const example=read('examples/execution-plan.md');
  const steps=example.split(/^### 手順\d+：/m).slice(1);
  assert.equal(steps.length,3);
  for(const [i,step] of steps.entries())
    for(const field of ['- 前提：','- 対象：','- 作業：','- 期待結果：','- 確認：','- 失敗時：'])
      assert.ok(step.includes(field),'step '+(i+1)+' missing '+field);
  assert.match(example,/架空の導入先リポジトリ/);
  assert.match(example,/## 合格条件、差し戻し、停止条件/);
  assert.match(example,/## 中断・引き継ぎ記録/);
  assert.match(example,/最後に確認できた手順：なし/);
  assert.match(example,/実際に確認した証拠：なし/);
});

test('canonical inventory preserves language grammar and keeps model pilot incomplete',()=>{
  const inventory=read('SPECTODO.md');
  const feature=inventory.split('\n').find(s=>s.startsWith('- [')&&s.includes(' AGENT-012 '));
  const pilot=inventory.split('\n').find(s=>s.startsWith('- [')&&s.includes(' VALID-007 '));
  assert.ok(feature&&feature.includes('@docs/optional-execution-plans.md'));
  assert.ok(pilot&&pilot.includes('V:.')&&pilot.includes('@docs/optional-execution-plans.md'));
  assert.ok(!inventory.includes('### 手順1：'));
  assert.ok(!read('spec/language-v0.2.md').includes('## 詳細実行計画'),'no change to grammar');
});
