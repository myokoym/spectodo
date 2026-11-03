# Spectodoロードマップ統合機能の先行調査（2026-11-03）

> Status: research / 未採用。対応する検討仕様: [roadmap-companion.md](../proposals/roadmap-companion.md)
> 2026-11-03再検討: 当初の「ロードマップ補助ファイルを第一候補とする」結論は撤回し、**ロードマップをSpectodoの本体機能として扱う**方針で比較を再評価した。

## 1. 何がすでに存在するか（現行 main の事実）

- `spec/language-v0.2.md` §§3, 5: `# Versions`にV0/V1等を宣言し、要件のversion/priority/D/I/P/Vと全体の完了を管理する。最も早い未完了バージョンを既定activeとして導出する。
- `spec/language-v0.2.md` §16: 依存関係・実行計画を正本の構文には含めない。
- 同 §18: 「version declarations need optional goal/exit metadata」を**将来版で検討する事項**として明記。
- `README.md`および`SPECTODO.md`: 目標バージョンと各要件の完了済み/未完了の一覧がすでに主機能。
- `research/2026-09-20-format-direction.md`: 「ロードマップに近い性格」「phase自体のGoal/Exit Criteriaは冒頭のphase summary」と記述。categoryは要件の主構造、phaseは属性、という原案。
- `research/2026-09-20-initial-design-history.md`: 論理モデルにProject/Scope→Stage/Phase/Milestone→Goal/Exit Criteria→Requirementsと明記。Roadmap **view**はCOULD/P2だが、**StageとGoal/Exitまで別製品として切り出す根拠にはならない**。
- `research/2026-09-20-todo-task-management-literature-review.md`: 全体把握とアクティブな作業選択を分離し、軽量なMarkdown・永続仕様・低更新負荷を重視。
- `docs/optional-execution-plans.md`: 実装ファイル/手順/検証/中断再開を管理する明示的なオプションで、製品ロードマップ自体とは別の関心。

**結論**: ロードマップの中核（Versionの順序、属するRequirement、要件完了状況）はすでにSpectodo内に存在する。「ロードマップ機能がない」とだけ表現するのは不正確で、「**骨格はあるがGoal/Exitを含めたロードマップとして不十分**」が正しい。これを新たな正本に切り離すより、Version定義に足す方が本来の設計意図に忠実。

## 2. 概念上の区別

1. **ロードマップの情報モデル**: Scope→Version/Stage→Goal/Exit→Requirement→進捗。Spectodo本体の管理対象。
2. **ロードマップビュー**: 上記モデルから、Versionの順序・目的・達成率・今後の到達点を俯瞰する表示。専用UIや別ファイルである必要はない。
3. **詳細実行計画**: 個別作業の手順、対象ファイル、確認、停止/復旧。ロードマップとは別の成果物。
4. **カレンダー・ガント**: 日付とスケジュールを可視化する表現手段の一つ。日付が未定でもロードマップは存在できる。

## 3. 外部一次資料の比較

| 方式 | 観測できる設計・役割 | Spectodoに適用する意味 |
|---|---|---|
| GitHub Projects Roadmap | Projectの項目をdate/iterationフィールドに沿ってtimelineとして表示 | タイムラインは**表示形式**。日付をSpectodoのロードマップの成立条件にしない |
| GitHub Issues/Milestones | マイルストーンにIssue/PRを束ね、達成状況を追う | Version→Requirementと進捗集計が中心にあることの参考 |
| Linear Initiatives/Projects/Timeline | Initiativeで目的や複数Projectを束ね、Projectやtimelineで段階的見通しを示す | 目標と細かい要件の粒度は分けるが、それだけで別の正本を増やさない |
| OpenProject Roadmap | Versionsと紐づくWork Packageをroadmap上で表示し進捗を追う | VnとRequirementを保持したままGoal/Exitを足すSpectodoと直接対応 |
| Jira Product Discovery | アイデアやProjectを月/四半期などの軸で示すタイムライン/ロードマップ | 日付の確度を超えてコミットを捏造しない |
| GOV.UK Service Manual | ロードマップを成果・方向性の計画として扱い、詳細なbacklogと区別 | Goal/Exitは本体、実行手順は別、という機能分担を支持 |
| Aha! Roadmaps / ProdPad | Now/Next/Laterなど確定日なしの計画を扱う | SpectodoのVn順序を壊さず、日付は任意とする |
| GitHub Spec Kit community extensions | roadmapの第三者拡張が存在する。公式本体機能・推奨の保証ではない | 浅い計画表現の参考にとどめる |

### 確認資料（一次・公式優先）

- GitHub Projects Roadmap: https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/customizing-the-roadmap-layout
- GitHub Issues Milestones: https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones
- Linear Initiatives: https://linear.app/docs/initiatives
- Linear Timeline: https://linear.app/docs/timeline
- Linear Projects: https://linear.app/docs/projects
- OpenProject Roadmap: https://www.openproject.org/docs/user-guide/roadmap/
- Jira Product Discovery Timeline: https://support.atlassian.com/jira-product-discovery/docs/create-a-timeline-view/
- GOV.UK Service Manual: https://www.gov.uk/service-manual/agile-delivery/developing-a-roadmap
- Aha! Roadmaps（date-less roadmapの説明）: https://support.aha.io/aha-roadmaps/support-articles/roadmaps/share-a-roadmap-without-firm-dates~7444638211083491690
- ProdPad（Now Next Later）: https://www.prodpad.com/glossary/now-next-later-roadmap/
- Spec Kit Community extensions: https://github.github.com/spec-kit/community/extensions.html

製品の存在は採用根拠にならず、Spectodoの当初の設計目的と現行制約で判断する。

## 4. 実現方式の再比較

| 案 | 内容 | 評価 |
|---|---|---|
| A: v0.2の現状維持+対話時にバージョン集計 | スキーマ変更なしでVnと未完了要件を表示 | 互換性良好。ただし**Goal/Exitの永続的な正本がない**ため不足 |
| **B: `# Versions`を拡張してGoal/Exitを本体に内包** | Versionに関連する目標・終了条件を持たせ、要件と進捗は既存通り保持 | **第一候補**。初期設計と一致。厳密なv0.2 grammarの変更なので新しい言語版で検証/移行が必要 |
| C: 任意`ROADMAP.md`をロードマップ正本にする | 計画情報を別ファイル化 | v0.2無変更で試せるが、Versionの意味/目標が別管理に分裂し、現行仕様との一体性に欠ける。**主案から撤回** |
| D: GitHub Projects/Milestonesを正本にする | GitHub固有の管理UIで代替 | 他リポジトリ/agentからの再現性、二重管理、コネクタの操作面で不利。任意ビューだけ検討 |

### 推奨

**Spectodoの次の言語仕様の候補としてBを定義し、Aはその表示方式として取り込む。** v0.2 stableは勝手に変更せず、互換性・移行・validator・Agent Skillの変更範囲を別途検証する。Cは上位概念の正本としては採用しない。必要ならBから自動生成した閲覧用Markdownを作れるが、そのファイルを第2の正本にしない。

## 5. 言語版と移行についての制約

- 既存の`# Versions`のVn IDとLabel、Requirementの1行形式、Category、Priority、D/I/P/V、Constraintをそのまま維持する。新しい情報はVersionに所属させる。
- v0.2 strict grammarがVersion配下のGoal/Exitを認めない場合、v0.2 stableを事後改変したり、古いvalidatorに黙って読み込ませたりしない。**v0.3候補**としてgrammar、validator、migrationを用意する。
- 新たな`version goal`によりRequirementの受け入れ条件を勝手に変更しない。Exitは既存要件群との関係を明確にする。欠落する具体的な成果があればRequirement化を検討する。
- Date/Targetは任意、ForecastとCommitmentを混同しない。期限のない企画段階も扱えるようにする。
- 完了状態はVersionに別フィールドとして保存せず、属する要件のcheckboxとD/I/P/Vから導出する。0件は「未定義」で、完了と見なさない。
- 複数scopeで`V1`のようなIDはscope-local。親子の自動継承やscope横断集計を勝手に追加しない。
- 以前のv0.1/v0.2を利用するプロジェクトを無断移行しない。将来の新規導入では、Spectodo中央の正式言語版のみを案内する原則を維持する。

## 6. 検証方針

1. 企画のみ、コードとdeployなし、時期未定でもVn Goal/Exitを保持し、不要な進捗状態を捏造しない。
2. V0全要件[x]/V1未完了、V0未完了でV2先行着手、0件バージョンの3ケースで正しい進捗/activeを導出する。
3. Version名称変更、要件所属変更、Requirement ID変更の影響を、新しいVersion定義/Exit照合とともに整合させる。
4. 多scope/親子scope/旧v0.1・v0.2を混同しない。正本の二重化を起こさない。
5. 人間のGitHub Android閲覧、ChatGPT Androidの更新指示、別Agent/再実行で同じ意味と状態を保持する。
6. 新版validatorおよび既存v0.2 validatorによるそれぞれ正しい判定と拒否動作を検証。実測前に「実装完了」を宣言しない。
7. 100件以上のRequirementでも一覧性を損なわず、ロードマップ要約がCategory別の本体要件を複写しないことを検証。

## 7. まだ確定させない論点

- Versionにつける必須Goal/Exitの粒度と、後方互換性を両立する最小構文。
- Date/Targetと依存関係を初版の文法に含めるか（Goal/Exitを確実に先行検証）。
- 願望/未採用候補をVersion宣言に混ぜない仕組み。
- GitHub上でロードマップだけを短く見せたい場合の**派生ビュー**。第二の正本は作らない。
- scope横断のPortfolio型ロードマップの要否。独立scopeの原則を損なわないか。

## 8. 検討履歴の訂正

当初の案では「ロードマップは`SPECTODO.md`とは別の任意`ROADMAP.md`」とする案Cを推奨した。しかしこれは、v0.2の構文保全を上位目的として扱いすぎ、当初の「ロードマップも含んだ仕様・状態管理」という目的に合わない。**この推奨を撤回**し、Bを第一候補に変更する。区別すべきなのは「ロードマップ情報と詳細実行手順」および「情報モデルと表示ビュー」であって、「ロードマップとSpectodo本体」ではない。
