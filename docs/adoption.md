# Spectodo v0.2 stable 共通導入ガイド

この手順はSpectodo v0.2 stableの共通導入手順です。新規導入は、対象リポジトリの内容・開発段階・scope数にかかわらず **Spectodo Language v0.2** を使う。既存v0.1の維持は互換性対応であって、新規導入の選択肢ではない。

## 初回導入の原則（配布元と導入先を混同しない）

ここに記す `.agents/skills/...`、`spec/...`、`docs/...` は **配布元 myokoym/spectodo 内のパス**。導入先には一切存在しなくてよい。導入先にSkillがないことを理由に停止・v0.1への後退・独自仕様の生成をしない。

- 配布元：https://github.com/myokoym/spectodo
- この正本：https://github.com/myokoym/spectodo/blob/main/docs/adoption.md
- 正式仕様：https://github.com/myokoym/spectodo/blob/main/spec/language-v0.2.md
- キックオフSkill：https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo-kickoff/SKILL.md
- 運用Skill：https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo/SKILL.md
- 移行規程：https://github.com/myokoym/spectodo/blob/main/docs/migration-v0.1-to-v0.2.md
- 既存v0.1形式の読み取り用：https://github.com/myokoym/spectodo/blob/main/spec/language-v0.1.md

**ピン留め規則**：初回だけ配布元mainのHEAD SHAを確認し、同じSHAからすべて取得する。導入後は適用した配布元コミットSHAをAGENTS.mdに記録し、次回の再実行はその固定SHAで行う。Spectodo共通基盤の明示的な更新を頼まれた場合に限り、新しいmain SHAを取得して一式を同期・検証する。これにより日常の再実行が外部更新に左右されない。Spectodo Languageのバージョンは共通の **v0.2 stable** であり、プロジェクト別に選ばせない。既存v0.1は維持可能だが、以下のキックオフ依頼はv0.2への明示的な監査付き移行を含む。

**アクセス規則**：まず配布元のmain SHAをGitHub API/接続済みツール/git cloneで確認する。以後、`https://raw.githubusercontent.com/myokoym/spectodo/<固定SHA>/<パス>` 等で全ファイルを固定SHAから取得する。最初に配布元README・仕様のv0.2 stable表示を照合する。失敗時は利用可能な別手段を試し、取得先とエラーを報告する。全経路で参照不能ならSpectodo固有のファイル変更は行わず、対象リポジトリの非破壊的調査だけ進める。未確認の仕様を推測して進めない。

## 統一キックオフ依頼文（新規リポジトリへそのまま貼り付け）

以下が、導入先リポジトリを開いたCodexに渡す **唯一の全文プロンプト**。個別プロジェクトでSpectodoのバージョン・導入方式を再設計しない。

~~~text
# リポジトリのキックオフ：資料構造の再編成とSpectodo v0.2共通導入

作業対象は、現在Codexが開いているリポジトリです。
Spectodoの配布元リポジトリは、参照用であって作業対象ではありません。

目的は既存資料・コード・履歴を実際に調査し、Codexが後続作業で正確に理解・更新できる
資料構造へ再編成したうえで、根拠付きの詳細Spectodo inventoryを導入することです。
企画・検討資料だけの段階、コード実装済み、既存Spectodoありのいずれにも対応します。
作業案の提案だけで終わらず、ファイルへの反映・検証まで行ってください。
今回の対象は資料と仕様管理基盤です。新機能の実装を勝手に開始しないでください。

【0. 既存状態の保護と配布元の確実な取得】
- 作業を始める前に、導入先のAGENTS.md等の有効な指示、Gitブランチ、
  既存の未コミット変更、既存SPECTODO.mdとローカルSkillの有無を確認し、
  ユーザーの変更を破壊しないでください。
- Spectodo配布元：https://github.com/myokoym/spectodo
- 公式ガイド：https://github.com/myokoym/spectodo/blob/main/docs/adoption.md
- キックオフSkill：https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo-kickoff/SKILL.md
- 通常運用Skill：https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo/SKILL.md
- v0.2正式仕様：https://github.com/myokoym/spectodo/blob/main/spec/language-v0.2.md
- v0.1移行規程：https://github.com/myokoym/spectodo/blob/main/docs/migration-v0.1-to-v0.2.md
- v0.1旧仕様：https://github.com/myokoym/spectodo/blob/main/spec/language-v0.1.md

  これらのパスはすべて「配布元Spectodo内」のパスです。
  導入先に存在しない状態が正常です。ローカルのSkill探索だけで停止しないでください。

  既に配布元のv0.2 stableコミットSHAが導入先のAGENTS.md等に記録されている場合、
  共通基盤の明示的更新指示がなければそのSHAを再利用してください。
  旧v0.1由来のSHAだけが記録されている場合は、今回のv0.2移行に使わず、
  初回v0.2取得と同様に配布元mainを確認してください。
  初回またはSHA未記録なら、GitHub接続ツール/API/git clone等から
  配布元mainの現在のHEAD SHAを取得してください。
  同一SHAのREADME・正式仕様・ガイド・両Skillを取得・照合し、
  v0.2 stableであることを確認してください。
  旧v0.1の移行が必要なら移行規程と旧仕様も同じSHAから取得してください。
  必要に応じて配布元の任意の検証スクリプトを取得できますが、
  専用CLIや追加サービスは必須ではありません。
  取得した仕様・両Skillを導入先の対応パスへ配置・同期し、
  使用した配布元URL・SHAと配置先をAGENTS.mdおよび完了報告に記録してください。
  既存ローカルファイルの差分を確認してから更新し、無断で破棄しないでください。
  言語バージョンはv0.2 stableに統一します。個別に選択しないでください。
  外部取得に失敗したら別の利用可能な手段を試し、全て失敗した場合は
  対象リポジトリの非破壊的な調査のみ進め、Spectodo固有の書込みは止め、
  試行URL・実エラー・未実施範囲を報告してください。旧仕様で代替しないでください。

【1. リポジトリ全体の根拠調査】
- README、AGENTS.md、企画・検討・決定・調査・設計・仕様資料、
  Issue/ロードマップ、コード・設定・テスト・CI・デプロイ記録（あれば）、
  既存inventory、関連するGit履歴を実際に読み、調査対象と除外対象を記録してください。
- ファイル名や見出しだけで判断せず、現行の正本、採用済み決定、
  proposal、廃案・旧版、履歴、不明な情報を分類してください。
- 目的、対象、要件、検証可能な振る舞い、永続制約、決定根拠、
  未決事項、矛盾・調査不足を抽出してください。
- ファイルごとの出典、正本性、仕様候補と対応先を記録したsource/evidence
  crosswalkを整備してください。現行要件ごとに、SpectodoのID、
  Constraint、または登録対象外とする根拠を対応付けてください。
  ただのファイル一覧を「網羅的な要件抽出」とみなさないでください。

【2. ドキュメント構造の実際の改善】
- Codexが初見でプロジェクトの目的・現行仕様・根拠・未決事項・次の仕事を
  たどれるよう、資料の役割、正本、参照経路を整理してください。
- 重複、矛盾、巨大ファイル、過剰分割、無意味な階層、名称の不整合を検討し、
  合理的な場合は実際に資料を統合・分割・移動・改名・書き直してください。
  索引を追加するだけで既存構造の問題を放置しないでください。
- 採用理由、却下理由、調査根拠、重要な検討経緯、未決事項を保持し、
  移動・統合前後のファイル対応表とリンクの修正を残してください。
  既存の重要情報を欠落させたり、proposalを無断で確定仕様にしたりしないでください。
- 過剰な資料生成や無意味な変更は避け、問題がない構造は維持してください。
  既存AGENTS.mdの有効な制約、開発ルール、ブランチ方針を維持してください。

【3. 共通Spectodoの詳細導入】
- 配布元の正式キックオフSkillとv0.2仕様に従ってください。
  scopeはリポジトリの実在する独立プロジェクト境界から機械的に決め、
  通常はroot 1件とします。単なるディレクトリ差で分割しないでください。
  canonical SPECTODO.mdとworkspace routingをAGENTS.mdで一意に対応付けてください。
- 要件、制約、Category、対象Version、Priority、D/I/P/Vを根拠から設定し、
  完了済みの振る舞いも保持してください。Priorityは未着手Design項目の着手順であり、
  Versionはプロジェクト側の目標で、Spectodo Languageの版ではありません。
- 各仕様は検証できる文として記載し、正本資料を@refで参照してください。
  Detailや議論は参照先資料へ残し、SPECTODO.mdの1行に詰め込まないでください。
- 検討だけの成果も仕様として管理できますが、設計済みを実装済み・検証済みと
  推定しないでください。将来実装する項目はI:.などを使用し、
  実装・デプロイ自体が適用外の調査成果のみI:-/P:-を使ってください。
- 既存v0.1の場合、このキックオフはv0.2への明示的移行指示です。
  変更前に全Constraint、Requirement、Version、reference、routeの
  disposition ledgerを作成し、ID・根拠・進捗を監査してから移行してください。
- 既存v0.2の場合、既存ID・意味・進捗を基準として不足を増補してください。
  別inventoryの複製や根拠のない進捗の上方修正・リセットは禁止です。
- 重要な判断に根拠がない場合は「未確定」として記録し、推測で埋めないでください。

【4. Codexの作業導線と再現性の検証】
- READMEを入口、AGENTS.mdを作業ルールと正本への案内として整備してください。
  設計・調査・実装・検証の詳細は正本資料へ残し、AGENTS.mdへ重複転記しないでください。
- 第1監査：全調査対象について、現行要件→Requirement/Constraint/除外根拠、
  元資料→移行後の正本の対応が欠落していないか検査してください。
- 第2監査：Spectodoの構文・ID・scope/route・Version・checkboxとD/I/P/V、
  gap・@ref、重複、リンク、証拠と進捗の一致を検査してください。
- 第3監査：作業終了状態に対して、同じ固定SHAと同じ資料を使う
  キックオフを再実行（可能ならdry-runとファイルハッシュ比較）し、
  不要な変更・新ID・重複・資料移動が出ないことを確認してください。
- 各監査で修正が必要なら修正し、影響した範囲を再監査してください。
  実行していない検証を「成功」と記載せず、解消不能な問題は未完了で報告してください。

【5. 完了報告】
対象ブランチ・調査範囲・除外と理由、配布元固定SHA・取得方法・導入済みファイル、
資料の再編前後対応表、SpectodoのScope/Category/Version/Requirement/Constraint数、
根拠の対応状況・未解決事項、監査ごとの実測結果、再実行時の差分、
未実施・ブロッカーを報告してください。提案だけで完了扱いにしないでください。
~~~

## 何を入れるか

- 単一プロジェクト：root SPECTODO.md にScope宣言、通常は PROJECT: .。
- 独立した複数scope：各scope root直下に SPECTODO.md、全workspace routeをAGENTS.mdなどの共通instructionsで宣言する。
- 仕様書のみ：実在する企画・調査成果から検証可能なstatementを起こす。I:-、P:- は本当に適用外の場合だけ。将来実装予定なら I:. のまま保持する。
- 既存v0.1：維持運用は許されるが、明示された共通基盤へのアップグレードでは全recordを監査し、v0.2へ移行する。silent migrationは禁止。

必須成果物は正本inventory、workspace-to-inventory route、適用する言語仕様とAgent Skill、source/evidence crosswalk・移行ledger（該当時）、検証報告。詳細記録をinventoryの1行に押し込まない。

## 作業順序

1. 全ファイルと履歴の候補を分類（current / historical / superseded / uncertain）。既存の根拠を優先し、推測で実装や検証をxにしない。
2. 正本候補・独立した管理境界を発見。単一プロジェクトはroot 1件を既定値とし、明確な独立scopeだけ分割する。
3. 既存inventoryは破棄せず、ID/statement/axisごとに突合。v0.1移行ならdocs/migration-v0.1-to-v0.2.mdに従う。
4. 詳細inventoryを作り、証拠文書は@refで結ぶ。古い提案を実装済みにしない。
5. エージェントルート、共有policy、資料索引を同期。既存資料は根拠なく削除しない。
6. 構文・参照・coverage・情報欠落・重複・scope衝突・冪等性を検証する。仕様と実態が合わない箇所は未完了で報告する。

## 更新

同じSkillと記録済みのv0.2配布元SHAを用いて再実行・監査する。配布元の更新は別途明示して一式を同期する。新しいinventoryを複製しない。増分情報を突き合わせて必要な行だけ変更する。ステータスのxは実装と独立した検証証拠による。対象target version（V0等）はSpectodo Languageのv0.2と無関係。

参照：[共通キックオフSkill](../.agents/skills/spectodo-kickoff/SKILL.md) / [移行手順](migration-v0.1-to-v0.2.md) / [v0.2検証記録](validation-v0.2.md)。
