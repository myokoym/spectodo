# Proposal: Spectodo本体へのロードマップ統合（次期言語仕様候補）

> **Status: proposed / 未採用・未実装（2026-11-03）**。
> このproposalは現行`spec/language-v0.2.md`を変更しない。構文を追加するなら将来のSpectodo Language版（仮称v0.3）と移行規程を必要とする。
> 根拠・方式比較: [先行調査](../research/2026-11-03-roadmap-options.md)。

## 1. 訂正した基本方針

**ロードマップはSpectodoの外部ツール・別正本ではなく、Spectodo本体のVersion管理とRequirement管理を一体として理解するための機能**である。

当初の「別ファイル`ROADMAP.md`にGoal/Exitを置く」案は撤回する。元々のSpectodo設計意図はScope→Version/Stage→Goal/Exit→Requirement→D/I/P/Vであり、現行v0.2はそこからVersionのID/順序と要件の詳細・進捗までを実装した段階である。欠けているのはVersionに属する目的・到達基準と、全体を簡潔に俯瞰する標準表示である。

この目的に対し、以下を区別する。

- **本体のロードマップ**: Versionが目指す状態/退出条件、要件と進捗へのつながり。
- **ロードマップビュー**: 本体データから必要時に要約した表示。表示専用派生物なら別ファイルでもよいが、独立した正本にしない。
- **詳細実行計画**: 手順・ファイル・検証・停止/再開。既存`docs/optional-execution-plans.md`が扱う別の関心事。
- **ガント/スケジュール**: 日付が明らかな場合に使える追加表示。ロードマップ成立の前提ではない。

## 2. 目的と最低条件

1. 企画段階から完成/運用段階まで、**各Versionの目的・到達基準・採用済み要件の全体像**を同じSpectodoで保持する。
2. 何が完了し何が残るかを、既存の要件のD/I/P/V/overall checkboxから正確に導出する。完了済み要件を消さない。
3. VersionはScopeごとに定義する。既存のカテゴリ別Requirement閲覧を維持し、ロードマップのために全要件を別表へ複写しない。
4. 少なくともGitHub Androidの標準Markdown表示とChatGPT Android操作で、専用CLI/DB/rendererに依存しない。
5. 人間が直接sourceを編集することを必須にしない。AgentがVersion/Goal/Exitの追加・更新・監査を理解できる。
6. 期日や工数が未定でも正しく使える。予測を確定期限と偽装しない。
7. 既存v0.2とv0.1を無断で書き換えず、新言語版として公表する際は移行規程と検証を備える。

## 3. 追加する情報モデル

```text
Project / Scope
  └─ Target Version (V0, V1, ...)
       ├─ Label                    [既存]
       ├─ Goal                     [追加候補]
       ├─ Exit Criteria            [追加候補]
       ├─ Target time              [任意・採否未決]
       └─ Requirements             [既存: 各カテゴリの要件にVnを付与]
            ├─ stable Item ID
            ├─ priority
            ├─ statement
            ├─ D / I / P / V
            └─ refs/gap
```

**Versionは単独のTaskや別scopeではない。** 自身の永続的な進捗checkboxや手動statusを持たず、所属するRequirementsから状態を導出する。

### 3.1 Goal（目的）

そのVersionで何が実現するかを1〜2文で記す。企画のみなら「重要なユースケースを検証可能な計画にする」、実装段階なら「ユーザーが基本操作を完結できる」など、対象の成熟度に合う具体性を要求する。既存資料から決められない場合は`undecided`として、AIが勝手に目標を確定しない。

### 3.2 Exit Criteria（到達基準）

そのVersionが成立したと判断するための観測可能な条件。対象Version内のRequirementの**すべて**が完了することが既定の要件完了条件であり、代表Requirementを数件だけ列挙して他を無視しない。Goal/Exitに具体的な追加の機能義務があるなら対応Requirementとして正式に管理すべきか検討する。

Exit CriteriaはGoalを明確にする**説明・検証方針**であって、D/I/P/Vとは別の第5進捗軸でも、追加の未記録チェックリストでもない。矛盾があるときは完了フラグを勝手に上書きせず、Goal/ExitとRequirementの不整合を指摘する。

### 3.3 Target / ordering（未採用の拡張候補）

Vnの数値順が目標バージョンの順序という既存ルールを維持する。日付は必須にしない。追加するなら`unscheduled`か、年/半期/四半期/月/日で根拠のある精度を選び、`forecast`（予測）と`committed`（確定期限）を明示的に分離する。期日の有無からRequirementの完了状態は導出しない。

初期版でVersion依存関係を文法化する必要性は未証明。数値順は既存だがhard dependencyではないため、実行阻止や日程計算を新設する場合は、明示的な別検討を行う。

### 3.4 計画・進捗・状態の所有権

| 情報 | 正本 | 規則 |
|---|---|---|
| Scope、Vn ID/Label | `SPECTODO.md` | 現行v0.2 |
| Vn Goal/Exit | **`SPECTODO.md`の`# Versions`拡張案** | 本proposal |
| Requirement/priority/D/I/P/V/gap | `SPECTODO.md` | 現行v0.2の意味を維持 |
| Versionごとの進捗数・割合・現在active | 正本から導出した表示 | 別のmutable statusを保存しない |
| 実装の手順・停止/再開 | 明示依頼時の補助実行計画 | 既存のoptional execution plan |
| 将来案・未採用アイデア | 検討資料/Issue | 採用済みVnやRequirementに混ぜない |
| ロードマップ閲覧専用ファイル/HTML | 必要な場合だけ正本から生成 | 第二の正本にしない |

## 4. v0.3で検討する構文の一例（**確定構文ではない**）

現行の`# Versions`宣言を保ったうえで、各Version配下に短いメタデータを紐づける案を第一候補とする。

```md
# Scope
- GAME: .

# Versions
- V0: Prototype
  - Goal: 最小限のプレイ体験を成立させる。
  - Exit: GAME-001とGAME-002を含むV0の全要件を検証する。
- V1: MVP
  - Goal: プレイ記録を保存し、再開できる。
  - Exit: V1の全要件が受け入れ基準を満たす。
  - Target: unscheduled

# Constraints
- CORE-001 日付が未確定でも要件と進捗を管理できる

## GAME: ゲームプレイ
- [ ] GAME-001 [V0] [P1] プレイヤーを移動できる | D:x I:x P:- V:.
- [ ] GAME-002 [V0] [P1] 敵を攻撃できる | D:x I:> P:- V:.
```

例の`GAME`/ID/文は架空のデータで、実際の導入先を意味しない。**v0.2のstrict grammarではこのメタデータ行は規定されていないため、v0.2ファイルに無断で追加してはいけない。**

#### 構文の検討ポイント

- 読みやすいインデント付きリスト、1行メタデータ形式、Version直下に簡潔な段落を設ける方式を、実機レンダリング/厳密parserの容易さ/改行・escapeルールで比較する。
- Itemの1要件1行・カテゴリ別H2見出し・四軸・`@ref`の意味は現行のまま。
- Goal/Exitを必須フィールドにするかは互換性と情報源の不足を見て判断する。候補段階で全既存Versionに架空のGoalを埋めることはしない。
- Goalが長文になる場合は`@ref`相当の参照へ逃がすが、`# Versions`本体に読むべき要点を残す。
- 各Versionが１つのID/Labelを持つこと、ID重複拒否、未宣言Version参照拒否、scope-local IDの原則は引き継ぐ。

## 5. ロードマップ表示（本体からの導出）

`ロードマップを表示`を別コマンドに依存させず、Agentがactive workspaceに対応するcanonical inventoryから以下を構成する。

1. `AGENTS.md`など既存のscope routingを読み、現在のworkspaceに対応する`SPECTODO.md`を確定。親子scopeを自動合算しない。
2. `# Versions`のVnとGoal/Exitを数値昇順に読み、すべてのカテゴリに散在する同VersionのRequirementを集計する。
3. 各Versionに`N`件のRequirementがあり`D`件がoverall `[x]`なら、`D/N`は**要件件数の完了状況**。工数進捗率・公開確率ではない。チェック欄と四軸が不整合なら正本を監査する。
4. `N=0`なら「要件未定義」、`N>0,D=N`なら「要件上は完了」、その他は「未完了あり」。完了でないことだけを根拠にblockedと判断しない。
5. 既定のactive Versionは**現行v0.2 §3.2と同じ**、最小の未完了Vn。明示された作業targetがある場合だけその文脈を優先し、永続activeフィールドは増やさない。V2に先行着手してもV0の未完了を隠さない。
6. 出力にはVn/Goal/Exit/Target（存在時）/進捗件数/未完了の要点/詳細へのリンクを示す。詳細要件をROADMAPへ複製せず、必要に応じて一時的な表示用Markdownを生成してもよい。

### ミニ表示例（架空）

```md
V0 Prototype — 要件2件中0件完了
目標: 最小限のプレイ体験
残り: GAME-001, GAME-002

V1 MVP — 要件未定義
目標: 保存と再開
Target: 未定
```

## 6. 操作・変更・整合性監査

### 作成／更新

- 新しいVn/Goal/Exitの作成は、既存の採用済み資料・要件・現行inventoryのVersionを調べて行う。historical proposalを現在の採用済み仕様に自動昇格しない。
- Goal/Exitの見直しは、対応Requirementの欠落や対象Versionとの不一致を報告する。Goalを更新したからといってD/I/P/VやPriorityを自動変更しない。逆に実態が変わった場合は既存の進捗reconciliationを行う。
- 既存VnのIDを改番・改名するときは、全RequirementのVersion参照とGoal/Exit/関連資料を監査する。採番の再利用や歴史的達成状況の消失を避ける。
- 更新を繰り返しても同じ内容のVersion/Goal/Exitを重複作成しない。証拠のない日付/期限/依存を追加しない。
- Agentは実行計画の手順実施とVersion達成を混同しない。部分検証のまま`V:x`を宣言しない。

### 監査・異常時

- routingとscopeが一意か、Version ID/Labelが重複しないか、未宣言VersionをRequirementが参照しないか。
- Goal/Exitで参照するRequirement IDが実在し、同じscopeにあるか。特定のVersionへのExitが別Versionを不適切に完了条件としていないか。
- Goal/Exitで具体的な完了義務が増えたのにRequirementへ反映されていないか。両者が矛盾したら**完了したふりをせず未決事項として報告**。
- `[x]`とD/I/P/Vの整合、0件Version、部分完了/先行着手/未採用案の誤集計。
- 旧言語形式に対して新grammarを誤適用しない。各scopeのVersionを混同しない。

## 7. 新言語版への移行（採用する場合の必須条件）

- **今はv0.2 stableが正本**。proposalやPRが存在するだけでは新規導入へ新版を使わない。
- 新版を正式化するなら、grammar/validation errors/agent Skill/kickoff/docs/examples/CIを同一版として改定し、Spectodo中央の公開版を切り替える。導入先に個別の言語バージョン選択を要求しない。
- v0.2の既存canonical inventoryを自動移行しない。移行時はScope、Vn、Constraint、Requirement、四軸・refs・優先度を一対一で保持し、Goal/Exitの根拠と未決を記録。元の意味・履歴を失わない。
- v0.1 legacyについても暗黙にv0.3を適用しない。v0.1→v0.2→新版と同等の監査が必要。
- 旧v0.2を扱うAgent/validatorが新Versionメタデータを読めない場合を明確にテストする。互換性が成立しないときは移行/更新の前に報告する。

## 8. 受け入れ検証ケース（未実施）

| ID | 条件・操作 | 期待結果 |
|---|---|---|
| RM-01 | 企画のみ、コードなし、日付なし | Goal/Exitを保持。I:-/P:-は妥当性に従い、完了を捏造しない |
| RM-02 | V0全要件[x]、V1未完了 | V0要件完了、既定activeはV1 |
| RM-03 | V0未完了、V2にD:> | V2先行着手は見えるが既定activeはV0 |
| RM-04 | V3宣言・Requirement 0件 | 完了100%にしない。要件未定義 |
| RM-05 | 100件以上のcategory横断要件 | 一覧は要約、件数は全カテゴリー集計、全仕様文を二重化しない |
| RM-06 | 独立scopeに同名V1 | Scope間でGoal/Exit/件数/進捗を合算しない |
| RM-07 | Exitに未宣言ID/別VersionのID | 異常として検出。架空のRequirementを作成しない |
| RM-08 | Versionラベル・Requirement所属の変更 | 対応するGoal/Exit・参照を監査、進捗は保持 |
| RM-09 | 同一Agent操作を2回実行 | 2回目は重複・無意味な差分・状態リセットなし |
| RM-10 | v0.2 strict validatorで新版メタデータを読む | 誤ってv0.2準拠とせず、明示的な移行/差異を検出 |
| RM-11 | 既存v0.1/v0.2 projectを日常更新 | 新版へ暗黙移行せず従来の意味で読み書き |
| RM-12 | GitHub Android/ChatGPT Androidで表示 | Version/Goal/Exit/各Requirementへのアクセスが可能 |
| RM-13 | Goal/Exitと実要件が矛盾 | 状態をごまかさず、修正判断と未解決点を提示 |
| RM-14 | 詳細実行計画や未採用企画案が存在 | 実行手順/候補をVersionの達成済み要件へ混入しない |
| RM-15 | 新版を採用してmigration→再移行/rollback | Vn/Requirement/四軸/Constraint/refsの履歴・意味を保持 |

検証はテストfixture、変更差分、実際のAgent操作、Android人手確認に分け、数値・成功率は実測するまでは報告しない。

## 9. 段階的な設計・実装順（未承認の作業計画）

1. 本提案を基準に「Version→Goal/Exit→Requirement」の意味モデルと最小構文の候補を比べる。
2. 候補syntaxをv0.2 strict grammar・validator・スマホ表示と突き合わせ、将来の言語版案を決定する。
3. fixture、validatorとAgent Skillで作成・表示・更新・監査・移行を検証する。
4. 企画only・開発中・完成済みと多scopeの実プロジェクトでpilotし、冪等性/更新費用/誤採用を測定する。
5. 受け入れ基準に達した場合にのみ、中央の新安定版としてリリースする。

## 10. 未決事項と前提の境界

- Goal/Exitを**新言語版で必須**とするか、v0.2からの移行用に`undecided`を許すか。推奨は空欄の捏造を避け、未決が表現可能な仕様。
- Goal/ExitのVersion定義の文法。第4節は案であって正式な構文ではない。
- 日付・Version dependenciesを同時導入するか。**初期段階ではGoal/Exitに集中**し、スケジュールを無理に規格化しないことを推奨。
- 主要な閲覧先がSPECTODOのVersions部分で足りるか、別の**派生ビュー**が必要か。別の正本は作らない。
- portfolio/複数scopeのロードマップを一括表示する必要性があるか。v0.2のscope-local所有権を超えた設計は別途実証する。

**今回の成果物は調査・検討仕様のみ**。現行正式仕様の変更、動作する機能の導入、旧利用先への移行を実施したものではない。
