# Proposal: Spectodo Roadmap Companion（追加機能仕様案）

> **Status: proposed / 未採用・未実装。** 2026-11-03。
> この文書はレビュー対象の設計案であり、`spec/language-v0.2.md`を変更しない。導入先の`ROADMAP.md`の自動生成や新規要件の自動採用も、まだ認可されていない。
> 根拠・比較: [ロードマップ先行調査](../research/2026-11-03-roadmap-options.md)。

## 1. 目的と範囲

Spectodoの永続的な要件・状態の正本は各scopeの`SPECTODO.md`である。本提案は、**「何を目指しているか（Goal）」「何をもって達成と判断するか（Exit）」「どの順序・どの程度の時期を想定するか」**を、既存Vnに対応させて持続的に参照可能にする任意の補助機能を追加する。

企画・調査のみ／実装中／稼働後のすべてで適用可能とし、ChatGPT AndroidとGitHub Androidで扱える通常のMarkdownを基本にする。タイムラインUI、DB、CLI、専用renderer、日付入力、GitHub Projects登録を必須としない。

### 非目標

- 新しいTODO・要件・作業項目・デプロイ状態・タスク進捗の正本を作ること。
- 既存のVersion/priority/D/I/P/V/overall checkbox/active-version選択を再定義すること。
- 低コストAgentへ渡すファイル単位の実行手順（`docs/optional-execution-plans.md`の責務）。
- ユーザーが未確定とした目標・時期・依存関係・仕様項目をAIが勝手に決めること。

## 2. 三つの独立した層

| 層 | 内容 | 正本 | 例 |
|---|---|---|---|
| 仕様・実装状態 | Constraint、Vn、item ID、statement、D/I/P/V、priority、refs | scopeの`SPECTODO.md` | 「ログインできる」/V0/I:x/V:x |
| ロードマップ計画 | Vnの意図、代表的な退出条件、任意の時期と依存、Outlook | 任意のscopeの`ROADMAP.md` | 「V1で最小限のプレイ体験を成立させる」 |
| 詳細実行 | 変更ファイル、操作順、検証、停止・復帰 | 明示依頼時の`docs/spectodo-execution/` | 「手順3: テストを実行する」 |

現在の達成件数・進捗割合・既定active version・blocked判定をロードマップ独自の手動フィールドとして保存しない。これらは**表示時にSPECTODOから導出**または根拠付きで個別報告する。ロードマップを開いただけで、古いスナップショットが「現在状態」に見える設計にしない。

## 3. 配置と導入条件

1. 任意機能。通常のSpectodo新規導入・再キックオフ・日常更新では作成しない。
2. ユーザーがロードマップの作成・更新を**明示的に依頼**したscopeだけ、scope rootの`ROADMAP.md`を生成・更新する案とする。配置例: root `SPECTODO.md`に対しroot `ROADMAP.md`、`apps/web/SPECTODO.md`に対し`apps/web/ROADMAP.md`。
3. scope rootは現行`AGENTS.md`等の**既存の明示的なworkspace routing**を通じて確定する。`ROADMAP.md`の有無・位置から新しいscopeを推論しない。親scopeのロードマップを子scopeへ自動継承しない。
4. 既存の同名ファイルが別目的のロードマップなら上書きしない。内容と所有者を確認し、明示的に共用・移行・別名を判断する。
5. 既存v0.1はそのまま有効。旧specへ新v0.2構文を混入させたり、ロードマップ追加をv0.2移行の理由にしない。v0.1対応を提供するなら別途互換性テスト後に判断する（初期pilotはv0.2 scopeを対象）。
6. 初期案では他scopeのVnやGithub Issues/Milestonesを自動統合しない。

## 4. ロードマップ文書の最小構造（提案）

```md
# Spectodo Roadmap
- Scope: GAME
- Inventory: SPECTODO.md

## V0: Prototype
- Goal: 最小限のゲームループが実際に成立する。
- Exit: プレイ開始からクリアまでの確認可能な動作（GAME-001, GAME-002）を満たす。
- Target: unscheduled

## V1: MVP
- Goal: 継続プレイに必要な最低限の保存機能が使用できる。
- Exit: セーブと再開の要件（SAVE-001, SAVE-002）を満たす。
- Target: 2027-Q2 (forecast)
- Dependencies: V0
- References: docs/mvp-goals.md

## Outlook (uncommitted)
- Candidate: 複数プレイヤー対応。採用・対象バージョン・時期は未決定。
```

上記のGAME/SAVEは**形式説明用の架空ID**であり、実在リポジトリの要件であるとは主張しない。実作成時は存在するcanonical inventoryのIDのみを使う。

### 4.1 共通ヘッダー

- `# Spectodo Roadmap`: 文書種別。
- `Scope`: 当該canonical `SPECTODO.md`のscope IDと厳密一致。異なるscopeのロードマップを混同しない。
- `Inventory`: 同じscope rootの`SPECTODO.md`への相対参照。相対リンク解決可能であることを確認する。

### 4.2 Vn セクション

- `## Vn: Label`: 同scopeの`# Versions`に宣言されたID/labelをそのまま使用。Vnの順序は数値昇順。IDは本体から取得し新規に採番しない。
- `Goal`（必須）: その段階で実現したい結果を、細かい作業手順ではなく1～2文で示す。資料から確定できなければ`undecided`と書き、案を確定扱いしない。
- `Exit`（必須）: 確認可能な成果・合格条件の短い要約。可能なら既存Requirement IDを記載する。未定なら`undecided`。別の合格義務を秘密裏に増やしてはいけない。新たな検証可能機能が必要なら正式なRequirement追加について審査する。
- `Target`（任意）: `unscheduled`、または判断根拠のある年／半期／四半期／月／日。予想の場合は`(forecast)`、明示合意された期限だけ`(committed)`を付ける。入力がなければ`unscheduled`とし、自動的に現在時刻から日付を割り当てない。
- `Dependencies`（任意）: 同一scope内の先行Version IDのカンマ区切り。存在確認・自己参照禁止・循環禁止。初期案ではVn数値順に一致する先行Versionだけを記録し、日程計算もcomplete判定も変更しない。外部scope/API/技術依存は詳細資料の参照に留める。
- `References`（任意）: 具体的な根拠・背景・決定文書へのリンク。パス/URLの到達可能性を確認する。

**表記上の目安**: Vnにつき短い縦型リスト。幅広い表は正本に使わない。Goal/Exit本文は原則短く保ち、詳しい資料は`References`へ退避する。

### 4.3 宣言したVersionとの対応

`ROADMAP.md`が存在する場合、同scopeの全宣言Versionを**ちょうど一度ずつ**列挙することを目標にする。宣言されていないVnをRoadmapだけに先行確定しない。宣言Versionが0ならRoadmapは空の完了計画ではなく、inventoryにVersion定義がないことを明示する。

新しい将来案を検討すること自体は妨げない。未採用案は`## Outlook (uncommitted)`以下に書くが、採用済みVersionやRequirementと見せかけない。既存のIssue/調査文書があればそこへリンクし、Outlookの項目からD/I/P/Vや優先度を生成しない。正式採用後に正本のVersion/Requirementを整備し、重複する候補文を整理する。

### 4.4 Exit とRequirementの関係

`Exit`に挙げた少数のIDが完了しても、そのVersion内の他のRequirementが残っていれば段階は完了ではない。Version完了の十分条件は、そのVersionに属する**すべての**Requirementのoverall checkboxが`[x]`であること（0件は例外）である。Exitが重要な未達条件を示すのに対応Requirementが見つからなければ、集計状態を都合よく「完了」へ上書きせず、**仕様の欠落・要件化の判断待ち**と報告する。

ExitはVersionの意図の説明であり、D/I/P/Vとは別のチェックボックス・承認ステータスを持たない。「デプロイ済み」「公開済み」の断定も既存Requirementと検証証拠に従う。

## 5. 現在状態を表示するアルゴリズム

「ロードマップを見せて」「今どうなっている」などの参照依頼時に、次を実行する。

1. 利用中workspaceのroutingからcanonical scopeと`SPECTODO.md`を特定。必要なら対応する`ROADMAP.md`も読む。未作成なら**既存のVnから簡易版を表示し、未作成であると注記**する。表示だけの依頼は自動作成を意味しない。
2. 各Versionについて、当該scopeのすべてのRequirementを数える（カテゴリ横断）。`total=N`、`done=D`、`remaining=N-D`。チェックボックスの`[x]`は仕様定義に従ってD/I/P/Vから一致を検査する。
3. `N=0`なら「要件未定義（0件）」、`N>0,D=N`なら「要件すべて完了」、`N>0,D<N`で全項目の適用軸に着手証拠`x,~,>`がないなら「未着手」、それ以外は「進行中（未完了あり）」。これは**集計ラベル**であり独立した永続statusではない。
4. 既定active Versionはv0.2 §3.2に厳密に従う。最小の未完了Version。明示targetがある場合はそれを作業文脈上のactiveとして扱うが、永続ファイルにactiveを記録しない。後ろのVersionへ先行着手した事実があっても既定選択を変更しない。
5. `D/N`は**件数比**としてなら任意で表示できる。工数消化率・期間消化率・達成確率を意味しない。0件のとき0%/100%と表示しない。
6. 既存の`!gap`、参照元・証拠・依存矛盾から確実に分かる未解決事項を必要に応じて表示する。「未完了=blocked」とは推論しない。
7. 一覧はVn→Goal→Target→完了件数→重要な未完了事項とリンクの順にMarkdownで提示。日時・時期を表せない場合は「未定」。巨大な全Requirement一覧は明示依頼がない限りそのまま複写しない。

ロードマップ文書に持続的な数値サマリーを保存しないため、SPECTODOの通常更新はそのままでよい。表示のたびに最新の正本を読む。GitHub上の`ROADMAP.md`だけでは現在の完了数を表示できないという限界は、初版で許容し、必要性を実利用で測定する。

## 6. 作成・更新・監査のAgent操作

### 6.1 明示された作成

1. routing→現行language→対象scopeの正本→関連する採用済み企画・設計・研究・Issueを読む。
2. 現行Versionと全Requirement IDを棚卸しし、各段階のGoal/Exitの根拠を特定。既存のhistorical proposalを根拠なく採用済みにしない。
3. 目標や時期に合意がなければ`undecided`/`unscheduled`とし、判断を要する箇所を列挙。
4. 既存のロードマップがあるときは差分を確認して既存意図を保全する。いきなり置換しない。
5. 追加・更新された文書と実際の`SPECTODO.md`のID/Version/リンクを再照合。候補や根拠なし日付が正本へ混入していないことを確認。

### 6.2 明示された更新

- Version名・ID・Requirementの所属変更があれば、Roadmapの参照への影響を監査する。ID/既存判断は可能な限り保存し、不明な矛盾は指摘する。
- `SPECTODO.md`更新のたびにROADMAPを**必ず書き換える運用にはしない**。変更がGoal/Exit/Target/Version宣言へ影響するときだけ整合させる。数値進捗は保存しないため更新不要。
- `ROADMAP.md`のGoalだけを変更する依頼は、既存Requirement/状態/Versionを勝手に変更する権限ではない。要件変更が必要だと判明したら提案として切り離す。
- 再実行して同じ入力なら不要な差分を生まない（冪等）。既存Git履歴と他者変更を尊重し、衝突を自動上書きしない。

### 6.3 監査の検査項目

- 正しいcanonical scopeで一意に発見できること。
- ROADMAPに書かれたVersion集合とInventory宣言Version集合が一致し、各Vnが重複しないこと。
- Vnのlabel・Exit ID・Dependencies IDが存在し、参照先が期待する同scopeであること。
- IDの誤参照・依存循環・Vn逆向き依存・存在しないパス・曖昧なtargetの確度。
- 退出条件が未採用案や資料の古い記述を新要件として押し込んでいないこと。
- D/I/P/Vの状態やpriority、Version所属、scope routingへ未承認の副作用がないこと。
- 既存の詳細実行計画を新たな要件やロードマップstageに混ぜ込んでいないこと。

## 7. 検証ケースと合格基準

| ID | Fixture/操作 | 期待結果 |
|---|---|---|
| RM-01 | 企画のみ、V0/V1、時期なし | Target未定で作成でき、I:-/P:-の仕様意味を変えない |
| RM-02 | 実装済みV0が全[x]、V1に未完了 | V0は完了、V1は未完了、activeはv0.2規則のV1 |
| RM-03 | V0が未完了でもV2のD:>あり | V2先行着手を表示しつつ、既定activeはV0 |
| RM-04 | V3を宣言したが対応要件0件 | 「要件未定義」であり完了率を作らない |
| RM-05 | 完了済みRequirementを複数含む大規模category inventory | version単位の集計がカテゴリ横断で正確。全仕様文をROADMAPへ複写しない |
| RM-06 | v0.2複数scopeで同名のV1 | scope間の要件数・Goal・Exitを混在させない |
| RM-07 | RoadmapのExitにunknown IDを入力 | レビューで不整合を発見し、架空のIDを生成しない |
| RM-08 | Version label変更、Requirement移動、既存決定の改訂 | 対応するロードマップだけ差分更新。履歴と根拠が残る |
| RM-09 | 同じ指示を2回実行 | 2回目は不要な変更・新規ID・期日を発生させない |
| RM-10 | 既存ROADMAP.mdが別用途 | 無断上書きをしない |
| RM-11 | 既存v0.1と、既存詳細実行計画があるscope | 旧構文の自動移行や実行計画の置換がない |
| RM-12 | Androidでrendered Markdownのロードマップを確認 | 横長表に依存せず、Goal/Exit/Targetとリンクへ到達できる |
| RM-13 | Agentによる要件更新後、参照だけを依頼 | ROADMAPを事前更新せずに、最新SPECTODOから進捗が導出される |
| RM-14 | Outlookに未採用の候補がある | 当該候補が実装進捗/active selection/完了数に入らない |

**合格の定義**: 実ファイルをfixture化し、構文・計数・参照整合性は繰り返し自動検証できること。Goal/Exitの意味・根拠・Android表示とAgent再実行の正確さは実ケースで別途確認する。proposalを書いただけでこれらを「テスト済み」としない。

## 8. 代替案の採否と段階的導入

- **初期提案**: A（表示のみ）+ C（明示依頼時の任意ROADMAP）を採用候補とする。常時同期、追加UI、必須CLI、必須日付は採用しない。
- **今回のPRの範囲**: 調査と**未採用の仕様案のみ**。正式言語、Skills、README、SPECTODO、導入先リポジトリを変更しない。
- **採用決定後の作業**: 試験用の例、fixtureと検査、既存Agent Skillへの「表示・任意作成・更新・監査」の追加、わかりやすいREADMEの指定文、Android/Agent pilot、自己inventoryへのRequirement追加・検証。既存v0.2 grammarは必要が生じるまで変更しない。
- **採用判断のゲート**: RM-01～14の検証方針、スマホでの実用性、実際のAgentがscope/状態を混同しないこと、運用コストと参照性を観測。十分に機能しない場合はformat拡張や生成専用viewへ設計を修正する。

## 9. 残る判断点（決定済みと区別する）

1. **閲覧入口**: Markdownの恒久計画を中心としChatGPTで最新集計する案を推奨。GitHub上の単一ROADMAPファイルに常時最新の進捗数値を出すことを要件とするなら、生成スナップショットの時点・更新保証を別仕様で定義する必要がある。
2. **Outlookの扱い**: 未採用の将来方向まで同じRoadmapに置く案を含めたが、企画資料/Issueへの参照のみに限定する方が誤採用リスクは低い。pilotで確認。
3. **scope横断**: 今回は意図的に対象外。横断の必要性が実例で出たら、固有のcross-scope ID/所有権/参照先/可視性を別途設計する。
4. **依存の強さ**: 初期Dependenciesは説明・監査のみ。既存v0.2 active selection/priorityを上書きして作業を自動停止させるhard dependency機能は追加の合意とテストが必要。

これらはレビュー可能な未決事項であり、本文のサンプルや候補値だけで採用確定したことにはしない。
