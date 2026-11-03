# ロードマップ機能の先行調査・方式比較（2026-11-03）

> Status: research / 未採用。Spectodo Language v0.2 stable の仕様変更ではない。
> 対応する追加仕様案: [roadmap-companion.md](../proposals/roadmap-companion.md)

## 1. 調査対象と問い

問いは「既存のV0/V1と要件一覧を壊さず、何を・なぜ・どこまで・どの順序で実現するかを、企画段階から運用段階まで俯瞰できるか」である。日付付きガントチャートや作業手順の追加そのものを目的にしない。

2026-11-03時点でリポジトリの次を点検した。

- `spec/language-v0.2.md` §§3, 5, 16–18: version ID、priority、active version、除外項目、将来検討。
- `SPECTODO.md`: V0–V3宣言、itemごとのversion/priority/D/I/P/V。
- `README.md`: Markdown inventoryを正本とする目的、任意の詳細実行計画。
- `docs/optional-execution-plans.md`: **実行手順**用の明示的オプション。ロードマップと別の目的。
- `research/2026-09-20-initial-design-history.md`: Roadmap view = COULD / P2、Stage/Goal/Exit Criteria は当時の候補。historicalであり現行仕様ではない。
- `research/2026-09-20-format-direction.md`: 浅いロードマップ成果物の発想には肯定的だが、artifactの過剰分割を避けるという方向。
- `research/2026-09-20-todo-task-management-literature-review.md`: 一覧性・軽い入力負荷・正本とアクティブな視野の分離が重視される。

**現行機能の境界**: Vnで目標順序を表し、versionごとのitemから完了状態を導出できる。しかし各段階のGoal、Exit Criteria、時期の不確実性、対外的な見通し、独立した全体表示はv0.2で定義されない。依存関係はv0.2本体の構文から意図的に除外される（§16）。v0.2 §18には「version declarations need optional goal/exit metadata」が将来検討として列記される。

## 2. 現行の一次資料による外部比較

| 方式 | 一次資料で確認できる設計 | Spectodoへの示唆・不適合 |
|---|---|---|
| GitHub Projects Roadmap | Issue/PR/ドラフト項目を日付/iterationフィールドでタイムライン表示。マーカーでmilestone表示 | 日付駆動の可視化には有効。ただしGitHub Projects自体をSpectodoの正本にすると既存Markdownと二重管理になり、ChatGPT/Coding Agentが同じ操作を再現できる保証もない |
| Linear Initiatives/Timeline | Initiativeが目標・優先順位・複数Projectを束ね、Timelineは細かなIssueでなくProjectを俯瞰。Projectの時期は年/半期/四半期/月/日から確度に応じ選択 | 目標と要件の階層分離、時期の粒度を確度に合わせる設計が有用。ただし専用UIとProject/Initiativeデータモデルを移植しない |
| OpenProject Roadmap | VersionごとにWork Packageを束ね、完了率と内訳を表示 | 既存のVn+要件モデルとの対応が特に直接的。進捗の集計元は要件側に一元化するべき |
| Jira Product Discovery | 企画のtimelinesは月/四半期を扱い、開始日と目標日のdate fieldが前提。複数領域を統合するRoadmapもある | 日付が無い検討フェーズに強制すると偽の精度が生まれる。日付依存のUIを初版の必須機能にしない |
| GitHub Spec Kit Community extensions | Community一覧にSpec Roadmap拡張が載る。ただし拡張は第三者製で、運営は実装の保証・推奨をしないと明記 | 本体組み込み機能の証拠にはしない。補助artifactとして分離する発想だけを比較材料にする |

### 参照URL（2026-11-03に確認）

- GitHub Projects Roadmap: https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/customizing-the-roadmap-layout
- Linear Initiatives: https://linear.app/docs/initiatives
- Linear Timeline: https://linear.app/docs/timeline
- Linear ProjectsのTimeframes: https://linear.app/docs/projects
- OpenProject Roadmap: https://www.openproject.org/docs/user-guide/roadmap/
- Jira Product Discovery Timeline: https://support.atlassian.com/jira-product-discovery/docs/create-a-timeline-view/
- Jira Product Discovery Roadmap: https://support.atlassian.com/jira-product-discovery/docs/create-a-roadmap/
- Spec Kit Community extensions（運営は第三者拡張を保証しない）: https://github.github.com/spec-kit/community/extensions.html

これらの製品が提供する機能の列挙は、Spectodoに同じ機能が必要であるという根拠にはならない。採否は既存の非UI・Markdown・AI主体・scope/完了状態の一元管理との適合で決める。

## 3. 問題を分割する

1. **計画**: バージョンの目的、代表的な出口条件、期待する順序、時期（不明なら不明）、根拠。
2. **現在状態**: 対象Vnの全RequirementのD/I/P/V・完了数・既定のactive version。これは`SPECTODO.md`が正本。
3. **実行手順**: ファイル/操作/テスト/停止再開など。既存`docs/optional-execution-plans.md`が担当。
4. **表示**: 対話中に計画+現在状態を統合して一覧化する。将来の専用renderer/Ganttは別問題。

この4つを混同すると、ロードマップ側で独自の「完了」「着手」「リリース済」を付けてD/I/P/Vと矛盾する。また、計画が企画段階から存在するという条件と「日付必須」は相容れない。

## 4. 採用候補の比較

| 案 | 概要 | 利点 | 主な代償/問題 | 暫定判断 |
|---|---|---|---|---|
| A: 現行v0.2のVnからオンデマンド集計だけ | 追加ファイルなし | 完全互換・低運用負荷 | Goal/Exit/時期の継続的な計画情報が残らない | 最小表示手段として採用候補。計画機能単独には不足 |
| B: v0.2の`# Versions`に新規フィールド | Goal/Exit/Target等を構文追加 | 1ファイルで閉じる | v0.2 strict grammar/互換性破壊。カテゴリ中心の軽量inventoryに計画が混入。新言語versionと移行が必要 | 今回は非推奨 |
| C: scopeごとの任意`ROADMAP.md` | Vnをキーにした浅い計画を別Markdownに保持 | v0.2/旧v0.1を変更せず、目標と詳細作業を分離できる。GitHub Androidでも読める | 両ファイルの整合監査が必要。文書だけでは集計値は自動更新されない | **第一候補** |
| D: GitHub Issues/Milestones/Projectsをロードマップ正本に | GitHub側の既成機能に任せる | UIの表現力 | GitHub外・clone後の再現性、Markdownとの重複、コネクタでの操作性、依存追加 | 任意の外部ビューに限る |

**推奨**: まずAを確実に提供し、持続的な計画情報が必要なscopeにだけCを作る。「ロードマップの作成・更新・表示」要求をAI向けに定義する。B/Dへの拡張は実利用の不足が示された後に判断する。

## 5. 互換性・運用上の評価

- `SPECTODO.md`のVersion/Requirement/Constraint/D/I/P/Vの意味とレコードは維持する。ロードマップは新たな`# Scope`や第2のinventoryではない。
- VnのIDはscope局所。異なるscopeの`V1`を同じマイルストーンと見なさない。親子scopeでも計画・進捗を暗黙継承しない。
- `ROADMAP.md`を正本の要件と取り違えない。Goalは説明、Exitは既存要件の要約・参照とする。新規の検証義務が発覚したら採用前にRequirement化を審査する。
- 進捗率は`[x]`の件数から**要求が明示された表示時に導出**できるが、努力量・残作業日数・リリース確率と混同しない。分母0は「完了」でなく「要件未定義」。
- `ROADMAP.md`を手で編集できることは必須ではない。AIが既存の意思決定・資料を読んで更新できることを主眼にする。
- 企画のみ/実装中/稼働中のどの段階にも適用。デプロイ非適用の`P:-`や検証の`V:.`を勝手に完了へ書き換えない。
- `ROADMAP.md`を作らないscopeは現行運用を続けられる。旧v0.1では明示移行なしにv0.2-onlyの解釈を適用しない。
- 目標時期は任意で、明示された確度以上に精密化しない。推測で期限を発生させない。
- GitHub/AndroidでMarkdownとして十分読めることを優先し、横長表、タイムラインアプリ、CLIを必須にしない。

## 6. 導入前に検証すべき具体例

| ケース | 期待されること |
|---|---|
| 要件がすべて完了したV0と未完了のV1 | V0はRequirements完了、既定activeはV1。ロードマップ自体の手動statusで上書きしない |
| V0未完了のままV2で一部作業開始 | V2の進捗は見えるが既定active選択はv0.2のままV0。順序をすり替えない |
| V3が宣言されるがItemが0件 | 分母0は「未定義」、100%とはしない。Goalは仮であればその旨表示 |
| 段階のExitに存在しないIDが指定 | 不整合を報告。架空IDや要件を勝手に作らない |
| V1要件のV2移動、V1の名称変更 | Vn/名称/Goal/Exit参照の影響を明示して整合。古い数値やIDを残さない |
| 複数scopeで両方V1を使用 | scope内だけで集計。プロジェクト横断の自動合算はしない |
| 企画段階で日付未定・実装非適用 | 日付を要求せず、D/Vに基づく進捗が表示可能 |
| 計画ありとなしで日常的に要件更新 | 要件更新のたびに別ファイルのstatusを二重更新しなくてよい |
| 独立した詳細実行計画をすでに持つ | ROADMAPを手順書に置き換えず、両者は目的と正本を分離 |
| 旧v0.1の消費先 | ロードマップ追加を理由に自動移行しない |
| スマートフォンで閲覧 | Vn/Goal/Exit/Target/注意事項を縦方向に追える |

## 7. 今回は解決しない範囲（意図的な先送り）

- 全scopeを1つのportfolioで束ねる多対多のinitiative hierarchy
- 専用Gantt/board/renderer、ドラッグ操作や日付自動計算
- 工数・キャパシティ・クリティカルパス、実績の統計的予測
- GitHub Projectsと双方向同期、Issues/Milestonesの自動作成
- 日々の作業順序をRoadmapで強制すること（v0.2 priorityと既存execution planの責務）
- 候補ideaの自動採用（Outlookは参考情報のみ）

採用前には小規模な企画-onlyと、多数の要件を持つ実装済みscopeの双方で、**生成コスト、再更新での差分、要件変更への追従、スマホ閲覧、別Agentでの再現性**を確かめる。専用形式やCLIは、その実測で不足が確認された場合だけ再検討する。
