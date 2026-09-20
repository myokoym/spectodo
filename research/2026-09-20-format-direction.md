# 2026-09-20 フォーマット方向性調査

## 目的の再定義

spectodo が目指すものは、一般的なタスク管理ツールや SDD フレームワークそのものではない。

主目的は、**完結したアプリについて「何を備えているか」と「各仕様項目がどの段階まで進んでいるか」を、スマートフォンの ChatGPT 等から読み書きしやすい Markdown で一覧化すること**。

ロードマップに近い性格を持つが、将来予定だけでなく、完了済みの項目も残して最終的なアプリの仕様・実装状態を再構成できることを重視する。

### 今回明示された制約

- CLI は不要。存在してもよいが、利用の前提にしない。
- Agent Skills を用意し、AI agent が形式を理解して読み書き・更新できること。
- category を表現できること。
- phase を表現できること。
- 1 項目に対して、設計・実装・デプロイ・検証など複数段階の進捗を独立して表現できること。
- 設計メモ、実装メモ、作業ログ等を本体へ溜め込まない。
- 詳細資料を参照する場合も、原則として repository-relative path / URL に留める。
- 将来の TODO だけではなく、完了済み項目も保持する。
- 「完成したアプリの進捗と仕様項目一覧」として読めること。
- スマートフォンの ChatGPT や GitHub で、長い横スクロールや専用 UI を要求せず扱いやすいこと。

## 既存方式の再評価

### Backlog.md

参考になる点:

- Markdown native。
- stable ID、status、labels、priority、acceptance criteria、documentation/reference 等を持つ。
- AI agent 向けの運用規約が明確。

今回合わない点:

- CLI が正式な編集インターフェースで、直接 Markdown 編集を明示的に禁止している。
- task ごとにファイルが分かれる。
- Implementation Plan / Implementation Notes / Comments / Final Summary まで task 本体に持つ。
- status は主に task lifecycle を表し、設計・実装・deploy・verification の複数軸を一つの仕様項目に持たせるモデルではない。

結論: **フィールド設計の一部は参考になるが、運用モデルは採用しない。**

Sources:
- https://github.com/MrLesk/Backlog.md
- https://github.com/MrLesk/Backlog.md/blob/main/src/guidelines/agent-guidelines.md

### GitHub Spec Kit

参考になる点:

- specification → plan → tasks → implement → converge と段階を明示する。
- Agent Skill ベースの実行を持つ。
- roadmap は通常の Markdown とし、stable ID / name / intent / scope / dependencies / status / sub-spec link を持つ「浅い」成果物として扱う。

今回合わない点:

- CLI による初期化が前提。
- feature ごとに spec / plan / tasks 等の複数 artifact が増える。
- workflow/process を進めるための仕組みであり、完成後も残るアプリ全体の仕様項目 inventory が主目的ではない。

結論: **roadmap の shallow artifact と stable ID の考え方、phase discipline は参考にする。artifact 分割モデルは採用しない。**

Sources:
- https://github.com/github/spec-kit
- https://github.com/github/spec-kit/blob/main/docs/concepts/spec-of-specs.md
- https://github.com/github/spec-kit/blob/main/docs/quickstart.md

### OpenSpec

参考になる点:

- current truth と proposed change を分離する。
- AI coding assistant を前提に、要求を repository 内の Markdown として扱う。

今回合わない点:

- proposal / specs / design / tasks 等の change-centric な複数 artifact を中心にする。
- 今回不要な design artifact まで管理対象へ入りやすい。
- アプリ全体の feature inventory を最小形式で俯瞰する用途とは異なる。

結論: **current truth を優先する考え方だけ参考にする。**

Source:
- https://github.com/Fission-AI/OpenSpec

### Beads

参考になる点:

- stable task identity。
- dependencies と長期 agent context を強く扱う。

今回合わない点:

- CLI / database が中心。
- 人間が GitHub / ChatGPT から Markdown を直接読む用途には不透明。
- task graph が今回必要な範囲より重い。

結論: **不採用寄り。**

Source:
- https://github.com/steveyegge/beads

### Requirements Traceability / Verification Matrix

NASA の requirements traceability では、requirement を stable ID で保持し、design / implementation / test 等への trace を維持する考え方が使われている。

今回そのままの重い matrix は不要だが、

- 仕様項目を消さない
- stable ID を持つ
- design / implementation / verification を別軸として追う
- 詳細 evidence は参照で繋ぐ

という考え方は目的と非常に近い。

Sources:
- https://www.nasa.gov/reference/appendix-d-requirements-verification-matrix/
- https://swehb.nasa.gov/spaces/SWEHBVC/pages/100598308/Software+Requirements+Analysis

## 現時点の推奨方向

### 1. canonical source は「1つの Markdown inventory」を基本とする

小〜中規模のアプリでは、まず root から直接到達できる 1 ファイルを source of truth とする。

仮称例:

- `SPECTODO.md`
- `PROJECT.md`
- `SPEC-TODO.md`

ファイル名はまだ確定しない。

大規模化した場合だけ、category 単位の分割を許可し、root の index から全項目へ到達できるようにする。

### 2. category を主構造、phase を属性にする

完成後のアプリを読むときは、開発順より「認証」「UI」「ゲームプレイ」「データ」等の機能領域で探せる方が自然。

そのため:

- category: Markdown heading でまとめる
- phase: 各 item の metadata
- phase 自体の Goal / Exit Criteria は冒頭の phase summary に保持

とする方向が良い。

これにより、roadmap と完成後の仕様 inventory の両方として使える。

### 3. overall task status だけに潰さない

各仕様項目に複数の progress axis を持たせる。

default candidate:

- 設計
- 実装
- デプロイ
- 検証

ただし「設計」は project によって不要な場合もあるため、progress axis は project header で定義可能にする。

status vocabulary の候補:

- ✓ 完了
- △ 部分
- ○ 未着手
- — 非該当

「作業中」を独立 status とするかは未決定。永続的な仕様 inventory では、作業中かどうかより partial / incomplete の方が長期的意味を持つ。

### 4. 1 item に保持する情報を絞る

最小候補:

- stable ID
- title
- phase
- one-line specification
- multi-axis progress
- gap（partial のときだけ）
- refs（必要なときだけ）

設計理由、実装計画、作業ログ、議論、最終サマリー等は持たない。

詳細が必要なら:

- `docs/...`
- `src/...`
- issue / PR URL

等への参照だけを持つ。

### 5. スマホ向けに wide table を canonical にしない

phase × category × 4 progress axes × refs を 1 行 table にすると、GitHub mobile で横方向に広くなりやすい。

canonical は縦型 list を優先する。

例:

```md
## 認証

### AUTH-01 メールログイン

- Phase: P1
- 仕様: メールアドレスとパスワードでログインできる。
- 進捗: [設計✓] [実装✓] [配備✓] [検証△]
- Gap: パスワード再設定の実機検証が未完了。
- Ref: `docs/auth.md`
```

情報が少ない項目は compact form も許容候補:

```md
- **AUTH-01 メールログイン** — P1 — [設計✓] [実装✓] [配備✓] [検証△]
  - 仕様: メールアドレスとパスワードでログインできる。
  - Gap: パスワード再設定の実機検証。
  - Ref: `docs/auth.md`
```

現時点では compact form を本命とする。

### 6. phase summary は shallow に保つ

例:

```md
## Phases

- **P1 Core** — 完了
  - Goal: 最小の完成体験を成立させる。
  - Exit: P1 対象 item の必須 progress axis が完了。
- **P2 Release** — 進行中
  - Goal: 公開可能な状態にする。
  - Exit: deploy / validation を含む release 条件を満たす。
```

ここに設計詳細や task breakdown は書かない。

## Agent Skills 方向

Agent Skills は今回かなり相性が良い。

OpenAI の現行ドキュメントでは、Skill は `SKILL.md` を中心に、必要に応じて references / scripts / assets を持てる。今回 CLI を前提にしないため scripts は必須にしない。

初期構成候補:

```text
skills/
└── spectodo/
    ├── SKILL.md
    ├── references/
    │   └── format.md
    └── assets/
        └── template.md
```

`SKILL.md` が扱う操作:

1. locate — canonical spectodo file を特定
2. read — 現在 phase、未完了、partial、category 別状態を要約
3. add — 新しい仕様項目を追加
4. update — 仕様または各 progress axis を更新
5. reconcile — repository の実態と inventory の不一致を確認
6. audit — ID 重複、unknown phase/category、partial なのに Gap がない、broken ref 等を点検

重要な制約:

- 設計メモ・実装メモ・調査ログを inventory へ生成しない。
- 詳細は path / URL 参照にする。
- 「画面に表示がある」だけで実装完了にしない。
- 実装完了と検証完了を独立判定する。
- 完了済み item を削除しない。
- agent が推測だけで stage を完了に変更しない。repository / deployment / test 等の evidence を確認する。

Sources:
- https://developers.openai.com/ja-JP/docs/build-skills
- https://developers.openai.com/ja-JP/api/docs/guides/tools-skills
- https://agentskills.io/

## ChatGPT mobile との関係

フォーマット本体は単なる Markdown なので、ChatGPT + GitHub access から直接扱えるようにする。

一方、OpenAI の現行ドキュメントでは:

- standalone skills: ChatGPT desktop / Codex CLI / IDE extension
- plugin に含めた skills: Web / desktop / mobile ChatGPT と Work

となっている。

したがって、**フォーマット設計と Agent Skill を分離**する。

- format: どの環境でも Markdown として読める。CLI 不要。
- skill: Codex 等では repository/local skill として利用できる。
- mobile ChatGPT でも Skill の自動利用まで求める場合は、将来 plugin packaging を追加する。

これにより「スマホで使うために独自 CLI が必要」という逆転を避けられる。

Source:
- https://developers.openai.com/ja-JP/docs/build-skills

## 現時点の結論

既存ツールの丸ごと採用ではなく、次の組み合わせが最も目的に近い。

1. **Git 管理された plain Markdown を canonical source にする。**
2. **roadmap の shallow structure** を phase 表現に使う。
3. **requirements traceability の multi-axis 発想**を、設計 / 実装 / deploy / verification の progress 表現に使う。
4. **Backlog.md の stable ID / concise spec / refs** は参考にするが、CLI・plan・notes・comments は持ち込まない。
5. **Agent Skills** で人間が形式を暗記しなくても追加・更新・監査できるようにする。
6. canonical view は wide table ではなく、**category ごとの compact vertical list** を本命にする。

まだ未決定:

- canonical file 名
- status vocabulary の最終記号/語
- 「作業中」を partial と分けるか
- phase の必須性 / phase の複数所属
- progress axis の project-level customization syntax
- 1 ファイルから category split へ移行する閾値


## 2026-09-20 追加検討: strict one-line Markdown language

その後の検討で、先の「compact vertical list」案にも構造上の問題があると判断した。

主な問題:

- 1仕様を複数行・nested list で表現すると、項目数に対して行数が大きく増える。
- 人間向けラベルと machine-readable data の境界が曖昧。
- Unicode の状態記号を canonical syntax に使う必要性が弱い。
- Agent が自由に整形すると parser が壊れる余地が大きい。

現在は、**Markdown の厳密なサブセットを Spectodo Language として定義する案**を実験対象とする。

実験用 artifact:

- `spec/language-v0.1.md` — strict syntax / semantics draft
- `examples/sample.spectodo.md` — standard Markdown として読める実例
- `.agents/skills/spectodo/SKILL.md` — repository-scope Agent Skill

v0.1 の中心案:

```md
# Phases
- P1: Core
- P2: Release

## AUTH: 認証
- AUTH-001 [P1] メールアドレスとパスワードでログインできる | D:x I:x P:x V:~
- AUTH-002 [P1] ログアウトできる | D:x I:x P:x V:x
- AUTH-003 [P2] パスワードを再設定できる | D:x I:~ P:. V:. | !メール送信後の更新処理が未実装 | @docs/auth.md
```

構造上の方針:

- 1仕様 = 1 list item = 1 source line
- category = stable ID 付き H2
- phase = stable ID を宣言し item から参照
- 自然文そのものを specification statement とし、title/spec の二重管理を避ける
- progress axes は v0.1 では `D / I / P / V` の固定4軸・固定順序
- status alphabet は ASCII のみ:
  - `x` done
  - `~` partial
  - `>` in progress
  - `.` todo
  - `-` not applicable
- partial がある場合は `!gap` 必須
- references は `@path` / `@URL` のみ
- design notes / implementation notes / work logs 等は inventory に持たない
- custom renderer は作らない。GitHub / ChatGPT 等の標準 Markdown 表示を primary human view とする
- parser / validator は将来追加可能だが、CLI は通常利用の前提にしない

前節の Unicode 状態記号および複数行 item 例は、この v0.1 実験より前の候補として扱う。採用済み仕様ではない。

OpenAI の現行ドキュメントでは repository-scope の Codex skills は `.agents/skills` に配置するため、実験 skill もその標準位置に置いた。

Source:
- https://developers.openai.com/ja-JP/docs/build-skills
