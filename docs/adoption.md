# Spectodo v0.2 stable 共通導入ガイド

この手順はSpectodo v0.2 stableの共通導入手順です。新規導入は、対象リポジトリの内容・開発段階・scope数にかかわらず **Spectodo Language v0.2** を使う。既存v0.1の維持は互換性対応であって、新規導入の選択肢ではない。

## 統一キックオフ依頼文

以下を対象リポジトリを開いたAgentに渡す。言語バージョンをプロジェクト単位で選ばせない。

~~~text
このリポジトリを全面調査し、Spectodoの共通キックオフを実行してください。
参照元：https://github.com/myokoym/spectodo
正式仕様：spec/language-v0.2.md
標準Skill：.agents/skills/spectodo/SKILL.md
キックオフSkill：.agents/skills/spectodo-kickoff/SKILL.md

最初にREADME、設計・提案・決定・議事・調査記録、実装、テスト、構成、
デプロイ、既存のSPECTODO.mdおよびAgent instructionsをリポジトリ全域で棚卸しする。
提案・古い仕様を現行仕様と取り違えず、矛盾・未決定・根拠不足を記録する。
Spectodo v0.2正式仕様に従い、scope route、必要な資料整理、詳細inventoryを整備する。
既存v0.1なら移行前に全件のdisposition ledgerを作る。既存v0.2なら冪等に更新する。
検証とセルフレビューを実施し、変更ファイル、根拠、欠落、未解決事項を報告する。
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
