# Initial Spectodo design history

> Historical snapshot. This document preserves early requirements, alternatives, rejected ideas, and naming/design discussion. It is not the current language specification or current project status. For current behavior, see `README.md`, `project.spectodo.md`, and `spec/language-v0.1.md`.

# Spectodo

開発中の **仕様・スコープ・段階・実装状態・検証状態・作業項目・優先度** を、Git/GitHub と ChatGPT / Coding Agent から無理なく扱える形で管理する仕組みを検討するリポジトリ。

> **Status:** **正式名称は Spectodo に決定済み。** 要件・管理方式・優先度等は引き続き検討中。以下は会話から抽出した**候補要件・評価候補・調査記録**であり、ユーザーが明示的に確定したものを除き決定事項ではない。  
> **Naming decision:** 表示名は **Spectodo**、repository / technical identifier は `spectodo`。判断記録は [`research/2026-09-20-naming-decision.md`](research/2026-09-20-naming-decision.md)。

## 1. 背景

発端は `private prototype repository` の開発管理だった。

単純な TODO では、次の区別や追跡が不十分だった。

- 何が現在の仕様なのか
- 何が実装済みなのか
- 何が部分実装なのか
- 何が未実装なのか
- 何を意図的に対象外としているのか
- 実装済みでも検証済みなのか
- どの段階・目的に属する作業なのか
- 詳細な調査・設計根拠がどこにあるのか

ただし、この問題は prototype 固有でも game 固有でもない。そのため、検討対象を汎用的な **development/project planning and tracking** の問題として扱う。

## 2. 検討上の原則

- 既存の開発管理手法・GitHub 機能を調査せず、独自形式を先に発明しない。
- `BACKLOG.md`、`STATUS.md`、独自 ledger 等を最初から正解としない。
- GitHub Issues / Milestones / Projects / Markdown / hybrid 等を同じ要件で比較する。
- ChatGPT から無理なく操作できることを重視するが、他の必須要件を無視して最優先にはしない。
- Coding Agent からも repository を通して理解可能であることを重視する。
- 既存の調査・合意・仕様を、管理形式変更のために削除・格下げしない。
- 情報を複数媒体に置く場合、source of truth を曖昧にしない。
- 「表示が存在する」ことと「システムが実装済み」であることを混同しない。
- 実装状態と検証状態を別軸として扱う。
- 現在の prototype は最初の concrete use case であり、この仕組み自体を prototype 専用にはしない。

## 3. 要件評価方式（未確定案）

以下の Necessity / Priority の二軸は、検討を整理するために提示した**評価案**であり、正式採用済みの方式ではない。

各要件には二つの軸を持たせる。

### Necessity

- **MUST** — 満たせない候補は原則として採用しない。
- **SHOULD** — 明確な trade-off がない限り満たす。
- **COULD** — 有用だが、大きな複雑性を追加してまで必須とはしない。

### Priority

- **P0 Critical** — 実質的な妥協を避ける。
- **P1 High** — 方式選定へ強く影響する。
- **P2 Medium** — 有意な副次評価項目。
- **P3 Low** — 利便性・拡張的な項目。

単純な加点式にはしない。

1. MUST を満たすか
2. P0 をどの程度確実に満たすか
3. その後に P1 / P2 / P3 の trade-off を比較する

## 4. Core requirements（候補・未確定）

ここに列挙した項目は、これまでの議論から抽出した**要件候補**である。MUST/P0 等の割り当ても含め、現時点では確定事項として扱わない。

| ID | Requirement | Necessity | Priority |
|---|---|---:|---:|
| R-M01 | 少数の明確な入口から、計画と現在状態の全体像を把握できる | MUST | P0 |
| R-M02 | 作業・仕様を段階/まとまりに所属させ、その目的を把握できる | MUST | P0 |
| R-M03 | 完了・実装済み項目も消さず、現在仕様・状態を再構成できる | MUST | P0 |
| R-M04 | 実装済み / 未実装 / 部分実装 / 意図的対象外を区別できる | MUST | P0 |
| R-M05 | 部分実装について「何が存在し、何が不足しているか」を分解できる | MUST | P0 |
| R-M06 | 項目名だけでなく、採用された正確な仕様へ到達できる | MUST | P0 |
| R-M07 | 現在の段階と未完了作業を識別できる | MUST | P0 |
| R-M08 | 段階ごとの目的と完了条件を明示できる | MUST | P1 |
| R-M09 | 未実装と意図的な out-of-scope を明確に区別できる | MUST | P0 |
| R-M10 | 既存の調査・決定・合意を管理方式移行で失わない | MUST | P0 |
| R-M11 | 詳細調査・設計根拠・source document へ trace できる | MUST | P1 |
| R-M12 | ChatGPT から日常的な参照・追加・状態更新を無理なく行える | MUST | P1 |
| R-M13 | Codex 等の Coding Agent が repository 経由で状態を理解・更新できる | MUST | P1 |
| R-M14 | Git / GitHub を中心とする現在の開発運用へ自然に組み込める | MUST | P1 |
| R-M15 | 複数媒体を使っても情報の ownership / source of truth が曖昧にならない | MUST | P0 |
| R-M16 | implementation status と validation status を独立して表現できる | MUST | P1 |

## 5. Secondary requirements（候補・未確定）

以下も要件・優先度ともに候補であり、方式比較の前提として固定しない。

| Requirement | Necessity | Priority |
|---|---:|---:|
| スマートフォン / GitHub Android 等でも状態を読み取りやすい | SHOULD | P1 |
| 変更履歴を追跡できる | SHOULD | P2 |
| コード変更と管理情報の同期負荷が低い | SHOULD | P1 |
| 依存関係を表現できる | SHOULD | P2 |
| 作業優先度・順序を表現できる | SHOULD | P1 |
| 小規模開発で管理コストが過大にならない | SHOULD | P1 |
| プロジェクト規模が増えても破綻しにくい | SHOULD | P2 |
| 自動進捗率 | COULD | P3 |
| Board view | COULD | P2 |
| Roadmap view | COULD | P2 |
| Filtering | COULD | P2 |
| Labels | COULD | P3 |
| Issue / PR 自動リンク | COULD | P2 |
| 自動集計 | COULD | P3 |
| Actions 等による整合性チェック | COULD | P2 |

## 6. 評価用の論理情報モデル

これは保存形式の決定ではない。各候補方式が必要情報を表現できるか比較するためのモデルである。

```text
Project / Scope
└── Stage / Phase / Milestone
    ├── Goal
    ├── Exit Criteria
    └── Work / Feature / Requirement
        ├── Specification
        ├── Scope
        ├── Implementation Status
        ├── Validation Status
        ├── Priority
        ├── Dependencies
        └── References
```

## 7. 独自案の検討から残すべき概念

独自 Markdown 管理方式そのものを採用したわけではない。ただし、その検討中に抽出された次の要求は方式比較へ残す。

- stage / phase ごとの Goal
- Exit Criteria
- completed item を管理面から消さない
- partial implementation の明示
- partial の内訳
- in-scope / out-of-scope
- implementation と validation の分離
- current stage の可視化
- outstanding work の可視化
- UI test fixture と通常仕様の分離
- research / source document への参照
- 「表示がある」だけで system implemented と判定しない
- 基本システムを省略する場合も omission を明示する
- 実装済み仕様を lossy な短縮表現へ置き換えない

## 8. 比較対象

少なくとも以下を候補として比較する。

1. Markdown TODO
2. `BACKLOG.md`
3. `STATUS.md` 型
4. SPEC + BACKLOG
5. GitHub Issues
6. Issues + sub-issues
7. Issues + Milestones
8. GitHub Projects
9. Markdown + Issues hybrid
10. 要件を満たすその他の既存方式

方式選定前に既存の software planning / requirements / tracking 慣行を確認する。

## 9. GitHub / ChatGPT 操作性について確認済みのこと

現在 ChatGPT から利用できる GitHub 操作には、少なくとも以下がある。

- Issue の作成
- Issue の取得・検索・更新
- Issue comments / labels / assignees
- repository file の取得
- repository file の作成・更新
- Issue 作成・更新時の既存 milestone 番号指定

一方、検討時点で確認した connector surface には、独立した milestone 作成操作や GitHub Projects の直接管理操作は見つかっていない。

したがって、GitHub 上で高機能であることと ChatGPT から同程度に操作できることは分けて評価する必要がある。

## 10. 既存用語・既存ツール調査

### GitHub の既存概念

- **Issues** — ideas / feedback / tasks / bugs 等の planning and tracking。
- **Projects** — work の planning and tracking。table / board / roadmap、priority 等の custom field を扱える。
- **Milestones** — Issues / Pull Requests を goal 単位でまとめ、進捗を追う。
- **ALM (Application Lifecycle Management)** — requirements から development / testing / deployment / maintenance 等まで含むため、今回の対象を指すには広すぎる。

現時点では今回の対象を独自カテゴリ名で決め打ちせず、**development/project planning and tracking** として扱う。

### 近接する既存 repository / tool

調査で確認した近接例:

- **Doorstop** — Git 管理下の requirements と test cases 等を結び、traceability を扱う。
- **reqmesh** — requirements / components / tests / decisions と status / priority / verification / traceability を扱う。
- **ReqStream** — requirements → test mapping、traceability、validation 等。
- **Reqord** — Requirement → Specification → GitHub Issue、lifecycle を追跡。AI coding tools も対象。
- **OpenSpec / SpecD 系** — AI coding assistant 向け spec-driven development。
- **ProjectState 系** — repository 内に project truth / state / backlog / evidence 等を保持する AI-assisted workflow。

この調査から、`ledger` はこの領域の標準的な中心語とは確認できなかった。

## 11. 命名検討履歴

### 11.1 失敗した初期案

当初 `Prototype Ledger` を提案したが撤回。

理由:

- prototype 専用ではない。
- `ledger` を software-development 上の実際の用法を確認せず採用した。
- 「台帳」という記録中心の意味へ不必要に寄せた。
- 後から「次の行動を導出する orchestration tool」等の目的を付加したが、その目的は要求されていなかった。

`Development Ledger` も同じ理由で採用しない。

### 11.2 naming rule の確認

命名検討では既存のprivate naming-rule sourceを参照した。公開文書では参照元のprivate識別子を保持しない。

重要原則:

- まず何を命名しているか分類する。
- repository の実際の role を確認する。
- 表面的な類義語展開ではなく、異なる naming principle から候補を作る。
- AI-slop 的な抽象語を「それっぽい」という理由だけで使わない。
- hard gate を先に通す。
- 既存利用・衝突を必要に応じて実検索する。
- 弱い候補を長い説明で救済しない。

### 11.3 Repository naming brief

**対象:** この開発管理方式/ツール自体を開発・管理する repository。

**role:** specification / scope / stage / implementation status / validation status / work / priority 等を扱う。

**users:** 本人、ChatGPT、Coding Agent。将来の他者利用は排除しない。

**scope:** prototype 限定でも game 限定でもない。

**名前に不要な現在事情:** `prototype`, `game`, `GitHub`, `Markdown`。

**勝手に含めない意味:** autonomous execution、next-action orchestration 等。

### 11.4 調査した命名方向

初期には次を検討した。

- `spec-track`
- `spec-status`
- `spec-map`
- `dev-spec`
- `project-state`
- `dev-state`
- `workgraph`
- `project-control`

しかし既存利用・意味範囲・generic 性を確認すると、多くは弱かった。

確認した主な問題:

- `SpecTrack` — 既存利用あり。
- `SpecMap` — 既存 AI tool / package 等と衝突。
- `DevSpec` — AI Agent 向け planning / implementation / review state を Git 管理する既存 framework がある。
- `SpecFlow` — 既存利用が非常に強い。
- `DevTrack` — 既存 developer-productivity 系名称あり。
- `DevState` — 複数の既存利用があり generic。
- `Workgraph` — 既存 project がある。
- `ProjectState` — 近接する既存 repository がある。
- `project-control` — “project controls” という既存業務概念が強い。

### 11.5 spec を中心語にする案への再評価

spec-driven development 系の既存ツールを調べると、`spec` は自然な語ではあるが、今回の対象は specification だけではない。

少なくとも:

- specification
- scope
- stage / phase
- implementation status
- validation status
- work items
- priority

を扱う。

そのため `spec-*` だけを本命にすると「仕様書作成 / SDD tool」と誤認される可能性がある。

### 11.6 比喩・一般語方向

説明語二語の組み合わせは generic / collision になりやすいため、具体語の転用も検討した。

検討領域:

- **Blueprint** — 計画・仕様には強いが、実装/検証状態が弱い。
- **Manifest** — 現在存在するものの記録には強いが、計画が弱い。
- **Register** — 状態管理に近いが ledger と同じく台帳寄り。
- **Compass** — 現在地/方向には強いが、仕様記録が弱い。
- **Baseline** — 合意された現在状態には強いが、TODO/進行が弱い。
- **Trace** — 仕様→実装→検証には強いが、scope/plan が弱い。
- **Control** — 全体管理を表せるが抽象的で企業的。

一語ですべての機能を説明する必要はないが、長い origin story がなければ成立しない名前も避ける。

### 11.7 正式名称の決定

正式な表示名は **Spectodo** とする。

- Display / product name: **Spectodo**
- Repository / technical identifier: `spectodo`
- Current Markdown format: `.spectodo.md`

意味上の核は **Spec + TODO**。ただし `SpecTodo` のように語境界を強く表示すると「仕様から TODO を作るだけのツール」に見えやすく、implemented / partial / omitted / validation を含む実際の対象を狭く見せるため、固有名としての **Spectodo** を採用した。

外部衝突、`SpecTodo` / `SpecTODO` との比較、今回の判断から後で抽出する命名ルール候補は [`research/2026-09-20-naming-decision.md`](research/2026-09-20-naming-decision.md) に記録する。

## 12. 現時点の決定状態

### 明示的に固定してよいこと

現時点で固定してよいのは、主として次の事実・制約だけである。

- この repository `myokoym/spectodo` を、ここまでの検討内容を失わず引き継ぐための記録場所として使う。
- 正式な表示名は **Spectodo**、repository / technical identifier は `spectodo` とする。
- prototype 専用・game 専用とする決定はしていない。
- autonomous execution / next-action orchestration を目的とする決定はしていない。
- 既存方式を比較せず独自方式を採用する決定はしていない。
- 既存の調査・合意内容を、管理方式変更を理由に勝手に削除・格下げしない。

### それ以外は原則未決定

特に以下はすべて未決定であり、この README の他節に具体案が書かれていても「採用済み」と解釈しない。

#### 目的・スコープ

- 最終的に何を管理対象とするか、その境界
- requirement / specification / feature / work item / task 等の粒度
- specification と work tracking を一体化するか分離するか
- 汎用的な仕組みにする範囲
- 独自ツールをそもそも作る必要があるか
- 管理規約、template、library、CLI、Web UI、GitHub integration 等のどの形になるか
- 公開 product / OSS とするか

#### 管理方式・source of truth

- 最終的な管理方式
- Markdown / Issues / sub-issues / Milestones / Projects / hybrid の採否と役割分担
- canonical source of truth をどこに置くか
- completed item をどこに保持するか
- research / source documents との参照方式
- Issue / PR / commit との関連付け
- 既存管理情報からの migration 方法

#### 状態・構造・用語

- status vocabulary
- validation vocabulary
- partial implementation の表現方法
- out-of-scope の表現方法
- implementation と validation の関連付け方
- phase / stage / milestone 等の最終用語と階層
- Goal / Exit Criteria を持つか、持つ場合の単位
- priority の体系・管理方式
- dependency の体系・管理方式
- 論理情報モデルそのものの採否

#### 操作・運用

- ChatGPT 操作性をどの程度まで必須にするか
- ChatGPT connector で直接操作できない GitHub 機能を許容するか
- milestone 作成や Projects 操作等を別手段で補うか
- Coding Agent が repository clone だけで状態復元できることをどの水準まで求めるか
- smartphone での閲覧・更新性をどの水準まで求めるか
- 自動同期・自動集計・整合性チェック等を採用するか
- 自動化機能の範囲
- 管理コストの許容水準

#### 評価方法

- MUST / SHOULD / COULD を正式採用するか
- P0 / P1 / P2 / P3 を正式採用するか
- 各候補要件の necessity / priority
- 候補方式の比較方法
- Mystery Dungeon prototype をどのように検証ケースとして使うか


### 読み方

この README では、過去の検討を失わないため具体案・候補・却下理由も残している。  
**「書かれている」ことと「決定している」ことを同一視しない。**  
今後、ユーザーが明示的に採用した事項だけを決定事項へ移す。

## 13. 最初の concrete use case: Mystery Dungeon prototype

最初のconcrete use caseにはprivate prototype repositoryを用いる。公開文書ではその識別子を保持しない。

現在の playable prototype では、たとえば以下のような「単純 TODO では表しにくい状態」がある。

- HP は current/max の内部状態を持つが、HUD は current のみ。
- 自然 HP 回復が未実装。
- Hunger は減少するが、0 の gameplay effect と food が未実装。
- Lv 表示はあるが EXP / level-up は未実装。
- 通常攻撃は **現在向いている隣接マスのみ**。attack 時の auto-facing はしない。
- UI validation fixture と PLAY mode の仕様を混同してはいけない。
- 一部システムは small playable version では意図的に out-of-scope。

このような状態を、implemented / partial / missing / intentionally omitted と validation state を分けて管理できることが実用上の検証材料になる。

## 14. 次の調査

要件を基準として、既存方式を実際の運用単位まで比較する。

特に確認する:

- GitHub Issues 単独で R-M01〜R-M16 をどこまで満たせるか
- Milestones を加えた場合
- GitHub Projects を加えた場合
- repository Markdown を canonical specification とする場合
- Markdown + Issues hybrid の source-of-truth 分担
- ChatGPT connector からの日常操作に欠落があるか
- Coding Agent が repository clone だけでどこまで状態復元できるか
- smartphone からの閲覧・更新負荷
- 小規模開発で管理作業自体が負担にならないか

---

この文書は検討履歴を消さず更新する。新しい方式を採用しても、過去の候補・却下理由・要件を無言で削除しない。


## 15. 現在のフォーマット実験

2026-09-20 時点で、専用 UI / renderer / CLI を前提にせず、標準 Markdown として読める厳密な one-line record 形式を実験している。

これはまだ正式採用ではない。既存の要件・比較検討を置き換えるものではなく、実際に要件を満たせるか検証するための draft。

- Language draft: `spec/language-v0.1.md`
- Example: `examples/sample.spectodo.md`
- Repository Agent Skill: `.agents/skills/spectodo/SKILL.md`
- Research: `research/2026-09-20-format-direction.md`

現在の中心仮説は、**1仕様 = 1 Markdown list item = 1 source line** とし、category / target version / numeric priority / multi-axis progress / gap / reference を厳密な ASCII 構文で表現すること。Version は V0 からの対象完成版、Priority は active version 内で次に Design へ新規着手する項目の選択順として扱う。


## 16. TODO / Task Management / Requirements 文献レビュー

フォーマット実験を進める前提となる調査を拡張し、個人タスク管理のHCI研究、チェックリスト研究、plain-text TODO形式、Definition of Done、要求トレーサビリティまで再調査した。

- `research/2026-09-20-todo-task-management-literature-review.md`

このレビューにより、標準Markdown checkbox・1項目1行・category grouping・stable ID は支持が強まった。`D/I/P/V` はSpectodoの決定済みの独立進捗軸として維持し、人間の手入力負荷に関する知見はAI主体の更新方式へそのまま適用しない。
