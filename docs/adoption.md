# Spectodo v0.2 stable 共通導入ガイド

初回導入は **対象リポジトリにSpectodoファイルが一切ない状態** から開始できます。Spectodoの言語バージョンは共通の **v0.2 stable** に統一し、プロジェクトごとに選択しません。コードなしの企画段階、コードあり、既存v0.1/v0.2のいずれも対象です。

## 統一キックオフ依頼文（新規リポジトリへそのまま貼り付け）

対象リポジトリを開いたCodexへ、**次の短い指示をそのまま渡すだけ**で構いません。詳細手順は外部の共通Skillに集約しています。

~~~text
このリポジトリをSpectodo v0.2 stableでキックオフしてください。
共通Skill：https://github.com/myokoym/spectodo/blob/main/.agents/skills/spectodo-kickoff/SKILL.md
これは外部配布元のファイルです。導入先に存在しなくても配布元から取得し、
同一コミットの正式仕様・導入ガイド・関連Skillに従ってください。
既存資料・コード・履歴の全面調査、資料構造の再編成、根拠付きの詳細inventory、
README・AGENTS.mdの整備、検証まで実際に実施してください。
既存v0.1は公式移行手順で監査付き移行とし、既存変更・決定経緯を保護してください。
詳細実行計画は今回は生成せず、結果と残存課題を報告してください。
~~~

## 詳細実行計画も作りたい場合（明示的なオプション）

**上記のキックオフ依頼文の末尾に、次の1文を追加**してください。この追加指示がある場合に限り、通常キックオフの後に詳細実行計画を一括作成します。実装は開始しません。

> 追加オプション：詳細実行計画も有効化し、採用済みで未完了の全Requirementを依存順の作業単位へまとめ、検証・停止・復旧・再開方法まで記載した計画を一括作成してください。実装は開始しないでください。

このオプションは1項目制限ではありません。全scope・対象Versionを棚卸しし、`docs/spectodo-execution/README.md` を案内・coverage表として各作業単位の手順を参照可能にします。未決事項は該当単位だけ保留し、独立した作業の計画作成を続けます。

通常キックオフや日常のSpectodo更新では**詳細実行計画を自動生成しません**。個別の計画作成・既存計画の連続実行を指示するための日本語文は、導入先にも配布される [詳細実行計画ガイド](optional-execution-plans.md) にあります。

## 配布元・バージョン・参照のルール

- 配布元：https://github.com/myokoym/spectodo
- 正式仕様：[spec/language-v0.2.md](../spec/language-v0.2.md)
- 共通キックオフSkill：[.agents/skills/spectodo-kickoff/SKILL.md](../.agents/skills/spectodo-kickoff/SKILL.md)
- 通常運用Skill：[.agents/skills/spectodo/SKILL.md](../.agents/skills/spectodo/SKILL.md)
- 旧版移行：[docs/migration-v0.1-to-v0.2.md](migration-v0.1-to-v0.2.md)
- 詳細計画（任意）：[docs/optional-execution-plans.md](optional-execution-plans.md) と [記入例](../examples/execution-plan.md)

これらは **配布元 myokoym/spectodo 内のパス** であり、導入先に初めから存在する必要はありません。ローカルで見つからないことを理由に停止せず、外部のSkill URLを最初に読みます。

初回は配布元のmainのHEAD SHAを確認し、必要な仕様・Skill・導入ガイド・任意ガイドを**同じSHA**から取得します。採用したSHAを導入先AGENTS.mdに記録し、再実行はそのSHAを再利用します。更新指示が明示された場合のみ新しい配布元SHAへ一式を揃え、古いv0.1 SHAをv0.2の固定点として再利用しません。外部取得に失敗した場合は他のアクセス方法を試し、それでも取得不能なら非破壊的な調査だけ行い、Spectodo固有の変更はせず取得エラーを報告します。

## 共通Skillが責任を負う処理

共通Skillを正本として、**リポジトリ全域の実ファイル・Git履歴の棚卸し、現在の決定と過去のproposalの判別、資料の統合・分割・再配置、source-to-requirementの対応、Scope/Version/Constraint/Requirement/進捗の構築、v0.1移行、AGENTS.mdのrouting、検証と再実行時の冪等性**を扱います。ユーザー向けプロンプトに同じ手順を複写しません。作業の提案だけで終了せず、実際のファイル変更と検証結果を報告します。

詳細な手順・判断・例外処理は共通Skillと正式仕様の責務です。必要に応じてそちらを更新し、利用者に長い依頼文を再生成させない方針とします。
