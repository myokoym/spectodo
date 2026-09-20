# Versions
- V0: Core format
- V1: Agent and validation
- V2: Release readiness

## CORE: 基本方針
- [x] CORE-001 [V0] [P1] 専用CLIを前提にせずMarkdownファイルだけで日常的に読み書きできる | D:x I:x P:- V:x
- [x] CORE-002 [V0] [P1] 専用レンダラーを前提にせずGitHubやChatGPTの標準Markdown表示で読める | D:x I:x P:- V:x
- [x] CORE-003 [V0] [P1] 完了済み項目も削除せず完成したアプリの仕様項目一覧として保持できる | D:x I:x P:- V:x
- [x] CORE-004 [V0] [P1] 設計メモや実装メモや作業ログを本体へ埋め込まず必要な詳細は参照先へ分離できる | D:x I:x P:- V:x
- [ ] CORE-005 [V0] [P2] スマートフォン上のChatGPTやGitHubから長い横スクロールや専用UIなしで扱える | D:x I:~ P:- V:. | !実プロジェクト規模での可読性と編集性を未検証

## LANG: 言語仕様
- [x] LANG-001 [V0] [P1] 1仕様項目を1つのMarkdownリスト項目かつ1ソース行として表現できる | D:x I:x P:- V:x
- [x] LANG-002 [V0] [P1] categoryをstable ID付きH2見出しとして表現できる | D:x I:x P:- V:x
- [x] LANG-003 [V0] [P1] versionをV0からのstable IDで宣言し各仕様項目から1つ参照できる | D:x I:x P:- V:x
- [x] LANG-004 [V0] [P1] 各仕様項目がdesign implementation deployment validationの4軸進捗を独立して持てる | D:x I:x P:- V:x
- [x] LANG-005 [V0] [P1] 構文記号をASCIIに限定し自然言語本文だけUnicodeを許可できる | D:x I:x P:- V:x
- [x] LANG-006 [V0] [P1] 状態をx done ~ partial > in-progress . todo - not-applicableの5値で表現できる | D:x I:x P:- V:x
- [x] LANG-007 [V0] [P2] partial状態を持つ項目に不足内容を!gapとして1つ記録できる | D:x I:x P:- V:x
- [x] LANG-008 [V0] [P2] repository-relative pathまたはURLを@refとして仕様項目から参照できる | D:x I:x P:- V:x
- [x] LANG-009 [V0] [P1] item IDをcategory IDと連動したstable IDとして一意に管理できる | D:x I:x P:- V:x
- [x] LANG-010 [V0] [P1] statementを単なる題名ではなく現在または意図した振る舞いを表す仕様文として記述できる | D:x I:x P:- V:x
- [x] LANG-011 [V1] [P1] strict grammarとvalidation errorを機械解析可能な形で定義できる | D:x I:x P:- V:x | @spec/language-v0.1.md
- [x] LANG-012 [V1] [P3] 実プロジェクトで不足が確認されるまでcustom progress axisを導入しない | D:x I:x P:- V:x
- [ ] LANG-013 [V0] [P1] 各仕様項目が数値priorityを持ち次にDesignへ新規着手する項目をversion内のcategory横断で選べる | D:x I:x P:- V:~ | !priorityに基づく次項目選択を実運用で未検証 | @spec/language-v0.1.md

## AGENT: Agent運用
- [ ] AGENT-001 [V1] [P1] repository内Agent SkillがSpectodo inventoryを発見して読み取れる | D:x I:x P:- V:. | @.agents/skills/spectodo/SKILL.md
- [x] AGENT-002 [V1] [P1] Agent Skillが既存categoryとversionを尊重して新しい仕様項目を追加できる | D:x I:x P:- V:x | @.agents/skills/spectodo/SKILL.md
- [x] AGENT-003 [V1] [P1] Agent Skillが証拠または明示指示に基づいて各進捗軸を更新できる | D:x I:x P:- V:x | @.agents/skills/spectodo/SKILL.md
- [x] AGENT-004 [V1] [P1] Agent Skillがimplementationとvalidationを独立して判定し表示だけやmockだけを実装完了と誤認しない | D:x I:x P:- V:x | @.agents/skills/spectodo/SKILL.md
- [x] AGENT-005 [V1] [P2] Agent SkillがID重複 unknown version 軸欠落 ~ without gap などの形式不整合を監査できる | D:x I:x P:- V:x | @.agents/skills/spectodo/SKILL.md
- [x] AGENT-006 [V1] [P2] Agent Skillが設計メモや作業ログをinventoryへ勝手に追加しない | D:x I:x P:- V:x | @.agents/skills/spectodo/SKILL.md
- [ ] AGENT-007 [V1] [P1] Agent Skillが進行中項目をpriorityだけで中断せず新規着手時はactive version内で低いpriority番号をcategory横断で優先できる | D:x I:x P:- V:. | @.agents/skills/spectodo/SKILL.md
- [x] AGENT-008 [V1] [P1] repository作業でSpectodo対象の実態が変わった場合は同じ作業内で関連項目をreconcileしてから終了できる | D:x I:x P:- V:x | @.agents/skills/spectodo/SKILL.md

## VALID: 検証
- [x] VALID-001 [V1] [P1] 公式サンプルがlanguage draftに準拠したSpectodo inventoryとして読める | D:x I:x P:- V:x | @examples/sample.spectodo.md
- [x] VALID-002 [V1] [P1] Spectodo自身をSpectodo形式で管理してself-hosting上の欠点を検出できる | D:x I:x P:- V:x | @SPECTODO.md
- [ ] VALID-003 [V1] [P2] 100件以上の仕様項目でも項目数とほぼ1対1の行数増加に抑えられる | D:x I:. P:- V:.
- [ ] VALID-004 [V1] [P2] スマートフォン画面で多数項目を一覧したときに状態と仕様文を実用的に読める | D:x I:. P:- V:.
- [ ] VALID-005 [V1] [P1] ChatGPTが専用parserなしでもlanguage specに従って既存inventoryを壊さず更新できる | D:x I:x P:- V:~ | !更新後のinventory reconcile漏れが一度発生しclose-the-loop修正後の継続再現性は未検証
- [ ] VALID-006 [V1] [P2] 将来validatorを実装した場合にlanguage specのvalidation rulesを自動検査できる | D:x I:. P:- V:.

## DOCS: 文書化
- [x] DOCS-001 [V0] [P1] READMEから現在のformat experimentとlanguage sample Agent Skillへ到達できる | D:x I:x P:- V:x | @README.md
- [x] DOCS-002 [V0] [P2] 既存方式の調査結果と採否理由をresearch文書に保持できる | D:x I:x P:- V:x | @research/2026-09-20-format-direction.md
- [x] DOCS-003 [V0] [P1] language syntax semantics validation rules renderer policyを1つのdraft仕様から確認できる | D:x I:x P:- V:x | @spec/language-v0.1.md

## REL: リリース準備
- [ ] REL-001 [V2] [P1] language specをdraftからversioned stable specificationへ昇格できる | D:~ I:. P:- V:. | !実プロジェクトでのdogfoodingと未決定事項の解消が必要
- [ ] REL-002 [V2] [P1] canonical inventory file名とrepository導入手順を正式に定義できる | D:~ I:. P:- V:. | !現在はSPECTODO.mdをdogfooding用に採用しているが一般仕様として未確定
- [ ] REL-003 [V2] [P2] 必要性が確認された場合のみparserまたはvalidatorを追加できる | D:. I:. P:- V:.
- [ ] REL-004 [V2] [P2] 必要性が確認された場合のみ大規模inventoryのcategory分割方式を定義できる | D:. I:. P:- V:.
