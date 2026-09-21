# Spectodo

Spectodoは、**プロジェクトの仕様と、その設計・実装・デプロイ・適合確認の進捗を1つのMarkdown inventoryで管理する形式**です。

完了済み項目も削除せず残すため、単なるTODO一覧ではなく、現在のプロジェクトが「何を備えていて、どこまで確認できているか」を後から再構成できます。

Spectodo Language v0.1はstableです。

## 特徴

- canonical inventoryはrepository rootの `SPECTODO.md`
- 1 Requirement = 1 Markdown task-list item = 1 source line
- category / target version / priority / D-I-P-V progressを保持
- 完了済みRequirementもinventoryから削除しない
- 永続的なproject-wide ruleは `# Constraints` としてRequirementから分離
- design note、implementation note、work logはinventoryへ埋め込まない
- 必要な詳細はrepository-relative pathやURLを `@ref` で参照
- 専用CLI・専用renderer・database・boardを通常利用の前提にしない
- ChatGPT / Coding Agentを主な更新者とし、人間によるsource直接編集を必須にしない

## 例

```md
# Versions
- V0: Prototype
- V1: MVP

# Constraints
- SEC-001 認証情報を平文保存しない

## AUTH: 認証
- [ ] AUTH-001 [V0] [P1] Android実機でメールアドレスとパスワードを使ってログインできる | D:x I:x P:x V:~ | !Android実機でのログイン検証が未完了
- [x] AUTH-002 [V0] [P1] ログアウトできる | D:x I:x P:x V:x
```

進捗軸:

- `D` = Design
- `I` = Implementation
- `P` = Deployment
- `V` = Verification

状態:

- `x` = done
- `~` = partial
- `>` = in progress
- `.` = todo
- `-` = not applicable

先頭checkboxはD/I/P/Vから導出します。すべてが `x` または `-` のときだけ `[x]` になります。

`V` はstatement自体を証明するために必要な検証へ限定します。statementが要求していないpolish・tuning・主観的なquality評価を元Requirementの `V:~` 理由にせず、追跡する場合は別Requirementとしてversionとpriorityを割り当てます。

## 導入

既存プロジェクトへの導入手順と、ChatGPT / Coding Agentへそのまま渡せる導入依頼文は **[Spectodo v0.1 導入方法](docs/adoption.md)** を参照してください。

導入時に人間がSpectodo構文を手入力することは前提にしていません。

## 主なファイル

- [Spectodo v0.1 導入方法](docs/adoption.md) — 導入手順と導入依頼文の正本
- [Spectodo Language v0.1](spec/language-v0.1.md) — 構文・意味・validation rulesの正本
- [公式example](examples/SPECTODO.md) — 有効なSpectodo inventoryの例
- [SPECTODO.md](SPECTODO.md) — このrepository自身のcanonical inventory
- [Repository Agent Skill](.agents/skills/spectodo/SKILL.md) — Agent向けの追加・更新・監査ルール

調査・検討履歴は `research/` に保存しています。historical researchは、現行仕様が明示的に採用していない限りnormativeではありません。

## 現在の状態

- Spectodo Language: **v0.1 stable**
- canonical project filename: **`SPECTODO.md`**
- dedicated CLI / renderer: **不要**
- このrepositoryのV0 / V1 / V2 Requirements: **完了**

syntax / semanticsのsource of truthは `spec/language-v0.1.md`、このrepositoryの現在状態のsource of truthは `SPECTODO.md` です。
