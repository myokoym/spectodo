# Spectodo v0.1 導入方法

## ChatGPT / Coding Agent への依頼

既存プロジェクトへ導入する場合は、対象repositoryを開いた状態で次のように依頼する。

```text
このプロジェクトにSpectodo v0.1を導入して。
参照元: https://github.com/myokoym/spectodo

参照元の現在のstable v0.1に従い、
- rootに SPECTODO.md を作成する
- spec/language-v0.1.md を導入する
- .agents/skills/spectodo/SKILL.md を導入する
- 既存のREADME、仕様書、実装、設定、テスト等を確認し、現在分かる範囲から初期inventoryを作成する
- 既存文書はSpectodo導入を理由に削除・置換しない
- 不明な進捗を推測で完了扱いしない
- 導入後にSPECTODO.mdの構文と参照切れを監査する
```

これだけでよい。人間がSpectodoの構文を手入力することは前提にしない。

既に `SPECTODO.md` が存在する場合は、新規作成せず既存inventoryを読み取り、stable v0.1との整合を確認する。

## 導入されるファイル

最低限、次の3つを使う。

```text
SPECTODO.md
spec/language-v0.1.md
.agents/skills/spectodo/SKILL.md
```

- `SPECTODO.md`: そのプロジェクトの仕様・進捗inventory。rootに置くcanonical file。
- `spec/language-v0.1.md`: Spectodo v0.1の構文・意味・validation rules。
- `.agents/skills/spectodo/SKILL.md`: Agentがinventoryを追加・更新・監査するためのrepository skill。

`SPECTODO.md` は参照元repositoryからコピーするものではない。導入先プロジェクトの実態を調べて新しく作る。

`spec/language-v0.1.md` と `.agents/skills/spectodo/SKILL.md` は参照元のstable v0.1をそのまま導入する。

## canonical inventory

プロジェクトのcanonical Spectodo inventoryはrepository rootの次のファイルとする。

```text
SPECTODO.md
```

別名のcanonical inventoryを追加しない。

v0.1ではsecondary file向けのgeneric suffixは標準化しない。

## 導入時の初期inventory作成

Agentは導入先repositoryを確認し、既に確認できる仕様と進捗を `SPECTODO.md` に反映する。

原則:

- 既存の仕様・README・code・test・deployment configuration等を証拠として使う
- 永続的なproject-wide ruleは `# Constraints`
- 検証可能なcapability/outcomeはRequirement
- 完了済み仕様も削除せずinventoryへ残す
- design / implementation / deployment / validationを独立して扱う
- 証拠が足りない状態を推測で `x` にしない
- design note、implementation note、work logはinventoryへ埋め込まない
- 必要な詳細は `@ref` で既存文書等へ参照する
- Spectodo導入を理由に既存文書を削除・統合しない

## Agentによる発見

Agentはrootの `SPECTODO.md` をcanonical inventoryとして扱う。

- `SPECTODO.md` があればそれを使う
- supporting fileやexampleをcanonicalとみなさない
- `SPECTODO.md` が既にある場合、別inventoryを勝手に作らない
- `SPECTODO.md` がなければ、導入作業でのみ新規作成する

## 人間の利用

通常運用ではChatGPT / Agentが更新する。

人間は主にGitHub等の通常Markdown表示から `SPECTODO.md` を確認する。sourceを直接編集する操作性はv0.1の必須要件ではない。
