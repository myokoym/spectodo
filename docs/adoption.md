# Spectodo v0.2 stable 共通導入ガイド

この手順はSpectodo v0.2 stableの共通導入手順です。新規導入は、対象リポジトリの内容・開発段階・scope数にかかわらず **Spectodo Language v0.2** を使う。既存v0.1の維持は互換性対応であって、新規導入の選択肢ではない。

## ゼロからの導入：外部参照を先に解決する

この文書は **導入先リポジトリにSpectodoファイルが1つもない状態** から使う正本です。ここに挙げる .agents/skills/... と spec/... は **myokoym/spectodo 内の相対パス** であり、導入先に初めから存在することを要求しません。

- 配布元（導入先とは別のリポジトリ）：https://github.com/myokoym/spectodo
- 最初に取得する全文ガイド：https://github.com/myokoym/spectodo/blob/main/docs/adoption.md
- キックオフSkill：https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo-kickoff/SKILL.md
- 日常運用Skill：https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo/SKILL.md
- 正式v0.2仕様：https://github.com/myokoym/spectodo/blob/main/spec/language-v0.2.md
- v0.1移行規程：https://github.com/myokoym/spectodo/blob/main/docs/migration-v0.1-to-v0.2.md

初回は **配布元を外部URLまたはGitHubの接続済みツールで直接読む**。利用できる場合はGitHub API、raw URL、Git cloneのいずれかで取得してよい。まず配布元mainのHEADコミットSHAを解決し、その同一SHAを使って必要な全ファイルを読む。配布元のREADMEで正式バージョンを確認する。v0.2 stableを共通導入仕様として使い、対象リポジトリごとにバージョンを選択しない。調査したSHAを導入先のAGENTS.md等と作業報告に残す。参照パス、ブランチとSHA、取得したファイルが配布元のものかを検証する。

導入先にSkillが存在しないこと、または導入先のGit履歴にSpectodoがないことは、**取得失敗でも停止理由でもない**。ローカル探索を外部取得の代わりにしない。GitHub閲覧手段が失敗した場合は、別の利用可能な取得手段を試し、具体的なURLとエラーを記録する。配布元を最終的に確認できなければ未確認の言語仕様を推測・代用せず、資料棚卸しなど破壊的でない作業だけを進め、Spectodo導入はブロッカーとして報告する。「v0.1がstable」等、確認できていない旧情報で置き換えない。

取得後は正式仕様と両Skillを導入先の対応パスへ配置・更新し、AGENTS.mdの参照とルーティングを同期する。既存ファイルは比較・保存してから更新し、無断上書きをしない。既存v0.1の明示的な共通基盤移行は移行ledgerを作成してから行う。以後の通常運用は導入先に配置したSkillと仕様を使用する。

## 統一キックオフ依頼文（新規リポジトリからそのまま貼り付け可能）

以下を **導入先リポジトリを作業領域として開いたCodex** に渡す。配布元Spectodoリポジトリを作業対象と取り違えない。

~~~text
# 依頼：リポジトリのキックオフ再編成とSpectodo共通導入

作業対象は、いま開いているリポジトリです。Spectodoの配布元とは別物です。
企画・検討資料のみ、コードあり、既存Spectodoありのすべてを対象にしてください。
構造改善案の提示だけで終わらず、適切な資料の再編成とSpectodo詳細導入を実施してください。

【最初の必須手順：外部Spectodoを取得する】
配布元：https://github.com/myokoym/spectodo
参照入口：https://github.com/myokoym/spectodo/blob/main/docs/adoption.md
キックオフSkill：https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo-kickoff/SKILL.md
日常運用Skill：https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo/SKILL.md
正式仕様：https://github.com/myokoym/spectodo/blob/main/spec/language-v0.2.md
移行規程：https://github.com/myokoym/spectodo/blob/main/docs/migration-v0.1-to-v0.2.md

上記は「配布元リポジトリ内」のパスです。導入先のローカルに存在しなくて正常です。
ローカルで探して見つからないことを理由に停止しないでください。

GitHubの利用可能な接続ツール/API/raw URL/git cloneのいずれかで配布元mainの
最新コミットSHAを取得し、その同一SHAからREADME・正式仕様・両Skill・
導入ガイド・必要な移行規程を取得してください。取得元URLとSHAを記録し、
配布元でv0.2がstableであることを検証してください。
対象リポジトリ独自の言語バージョン選択は行わず、共通のv0.2 stableを使います。
古い検索結果や導入先の不存在からv0.1に戻さないでください。

外部参照が失敗した場合は複数の利用可能な取得方法を試してください。
配布元の内容を確認できない場合でも、対象リポジトリの非破壊的な棚卸しは進め、
取得を妨げた具体的なURLとエラーを報告してください。
仕様を推測して独自のSpectodoを生成してはいけません。

【調査とキックオフ整備】
1. 導入先のGit状態・既存instructionsを確認し、既存変更を保護してください。
2. README、AGENTS.md、企画・調査・議事・提案・決定・仕様・設計資料、
   コード・設定・テスト・CI・履歴・既存inventoryを内容まで全面調査してください。
3. 現行の正本、検討中、却下済み、旧版、根拠不足を区別してください。
   目的、要件、制約、決定事項、根拠、未決事項、情報欠落・矛盾を記録してください。
4. 初見のCodexでも作業を継続できる資料構成へ実際に再編成してください。
   必要に応じて文書の統合・分割・移動・改名・書き直し、索引と参照を修正します。
   既存構造の無条件維持や資料の無条件追加は不要です。
   ただし決定事項、調査根拠、重要な検討経緯、却下理由を失わず、
   元資料と移行先を追跡可能にしてください。
5. 配布元の正式Skill・仕様を導入先へ配置し、AGENTS.mdの読み順・正本への案内・
   workspace→inventoryの明示的ルーティングを整備してください。
6. Spectodo v0.2の仕様に沿って、根拠付きの詳細inventoryを作成・更新してください。
   Requirement・Constraint・Category・対象Version・Priority・D/I/P/Vを
   原資料と照合し、既存の完了事項も保持してください。実装や検証を推測で
   完了扱いにせず、コードなしの成果物と将来実装する仕様を区別してください。
   既存v0.1なら今回の明示的な移行指示に基づき全件ledgerを作って移行し、
   既存v0.2ならID・進捗を保ち冪等に更新してください。
7. 正本資料、source/evidence crosswalk、必要な移行記録、AGENTS.md、
   Spectodo本体と導入元SHAの整合を確認してください。
8. 文書の情報欠落・重複・リンク切れ、Scope/route競合、構文、ID、
   ステータスと根拠の一致を検証し、同じキックオフを再実行しても
   不要なファイル変更・ID再採番・重複が増えないことを確認してください。

【完了報告】
変更した資料とその移行元、採用した正式仕様と取得SHA、導入済みSkill、
inventoryのCategory/Version/Requirement数と根拠、実施した検証結果、
残存ブロッカーを報告してください。確認できていないことを完了とは書かないでください。
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

同じSkillを再実行して更新・監査する。新しいinventoryを複製しない。増分情報を突き合わせて必要な行だけ変更する。ステータスのxは実装と独立した検証証拠による。対象target version（V0等）はSpectodo Languageのv0.2と無関係。

参照：[共通キックオフSkill](../.agents/skills/spectodo-kickoff/SKILL.md) / [移行手順](migration-v0.1-to-v0.2.md) / [v0.2検証記録](validation-v0.2.md)。
