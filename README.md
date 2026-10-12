# Spectodo

Spectodoは、検証可能な仕様と設計・実装・デプロイ・検証の状態を、GitHubで読めるMarkdown inventoryとして残す形式です。完了済み項目を保存し、企画・調査だけの段階からコード実装・運用まで同じ形式で扱います。

**現在の正式仕様は Spectodo Language v0.2 stable** です。新規導入・明示的なアップグレードは共通のv0.2を使用し、対象プロジェクトに言語バージョンを選ばせません。既存v0.1ファイルはそのまま有効で、明示的な移行なしに再解釈しません。

## 仕様の見方

~~~
# Scope
- PROJECT: .

# Versions
- V0: 企画

# Constraints
- DOC-001 未確認事項を確定事項として記載しない

## PLAN: 企画
- [ ] PLAN-001 [V0] [P1] 主要ユースケースが確認可能な仕様文として定義されている | D:~ I:- P:- V:. | !ユースケース一覧の検証が未完了
~~~

Scopeはinventoryが表す対象を定義します。単一プロジェクトはroot SPECTODO.md、独立した複数scopeは各rootにSPECTODO.mdを配置します。V0等は製品の目標バージョンで、Spectodo Language v0.2とは別です。x=完了、~=部分、>=進行中、.=未着手、-=非適用です。全軸がxまたは-のときだけチェックボックスが[x]になります。

## 任意の詳細実行計画

低コストモデルへ作業を委譲する場合など、**明示的に要求された作業だけ**を対象に、ファイル単位の変更手順・前提条件・検証方法・停止条件・再開位置を補助Markdownへ詳述できます。標準のSPECTODO.mdやv0.2構文は変更せず、普段は生成しません。[共通運用ガイド](docs/optional-execution-plans.md)と[作業例](examples/execution-plan.md)を参照してください。実モデルでの精度・費用対効果は今後の検証対象です。

## 共通導入

**新規リポジトリでは、ローカルSkillの存在を前提にしません。** [ゼロから使える唯一の統一依頼文・外部取得手順](docs/adoption.md)を対象リポジトリのCodexに渡し、外部配布元 https://github.com/myokoym/spectodo から同一コミットの正式仕様とSkillを取得して導入します。導入したSHAを記録し、再実行ではその固定SHAを使います。配布元の[共通キックオフSkill](.agents/skills/spectodo-kickoff/SKILL.md)が、資料・コード・履歴の棚卸し、scope設定、資料構造の改善、詳細inventory、source index、移行、検証を一貫して実行します。日常的な[運用Skill](.agents/skills/spectodo/SKILL.md)は追加・更新・照合・監査を行います。CLIや専用rendererは日常利用に不要です。

## 正本と資料

- [v0.2 stable仕様](spec/language-v0.2.md) — 新規導入の正式仕様
- [v0.1 stable仕様](spec/language-v0.1.md) — 既存利用者の互換形式（変更なし）
- [v0.2正式化レビュー](docs/v0.2-stable-decision.md) — 差分、解決事項、互換性
- [v0.1移行・rollback規程](docs/migration-v0.1-to-v0.2.md)
- [検証・残存課題](docs/validation-v0.2.md)
- [root新規例](examples/root-v0.2.md) / [複数scope例](examples/scoped-SPECTODO.md) / [設計-only例](examples/planning-v0.2.md) / [legacy v0.1例](examples/SPECTODO.md)
- [このrepositoryのinventory](SPECTODO.md) と [workspace routing](AGENTS.md)

調査履歴は research/ に保存しています。過去の提案と当時の調査は、現行仕様が明示的に採用しない限りnormativeではありません。
