# Spectodo 命名決定記録

日付: 2026-09-20  
状態: **決定済み**  
決定: 正式な product / project 表示名を **Spectodo** とする。

技術識別子は、必要に応じて小文字のまま使用する。

- Repository: `spectodo`
- File format / suffix: `.spectodo.md`
- Agent Skill / technical identifier: `spectodo`
- 将来 package / CLI を作る場合も、ecosystem 側の制約がなければ `spectodo` を既定候補とする。

この文書は、今回の命名調査と判断過程を、後で汎用的な命名ルールへ抽出できる形で残すための decision record / research note である。  
**ここに書く「ルール候補」は、まだ汎用ルールとして採用したものではない。**

---

## 1. 何を命名しているか

Spectodo は単なる TODO アプリではない。

現在の対象には少なくとも以下が含まれる。

- specification
- scope
- stage / phase
- implementation status
- validation status
- outstanding work
- completed work
- partial implementation とその gap
- intentionally omitted / out-of-scope
- priority
- references

発端は、単純な TODO では「現在の仕様」と「実際の実装・検証状態」の関係を十分に保持できなかったことにある。

意味上の核は次のように整理できる。

> **Spec + TODO**: 仕様と、何が済み・何が残り・何が部分実装で・何が検証済みかを結びつけて扱う。

名称が内部データモデルの全項目を列挙する必要はない。  
必要なのは、中心概念を表しつつ、重大なカテゴリ誤認を生まないことである。

---

## 2. 最終的に比較した表示名

今回、最後に重要になったのは全く別の候補語よりも、**同じ underlying string の表記差**だった。

### 2.1 Spectodo

**強み**

- 単なる内部機能ラベルではなく、固有名として扱いやすい。
- `Spec + todo` という意味の足場を残せる。
- TODO を視覚的に強調しすぎず、implemented / partial / omitted / validation まで含む余地がある。
- 中心概念とのつながりを維持しつつ、product identity を持たせられる。
- lowercase の技術識別子 `spectodo` と自然に対応する。

**弱み**

- 初見で `Spec + todo` の語境界が必ずしも明確ではない。
- `spect-` と切られたり、一旦は意味不明の造語として読まれる可能性がある。
- 公開時には短い descriptor を添えた方が理解しやすい可能性がある。

### 2.2 SpecTodo

**強み**

- CamelCase により `Spec + Todo` が一目で分かる。
- 開発者向けツールとして初見の説明性が高い。
- lowercase 技術識別子は同じ `spectodo` のままでよい。

**弱み**

- 独立した product 名より、「説明的な内部 utility 名」に見えやすい。
- `Todo` が視覚的に強調され、「spec から TODO を作るツール」と解釈されやすい。
- 実際には implemented / partial / intentionally omitted / validation も扱うため、この解釈は実態より狭い。
- URL / repository slug / package / CLI / file identifier 等で lowercase 化すると、主な長所である語境界の明示が消える。
- `Spec` + `Todo` は素直な説明語の組み合わせなので、無関係な第三者も独立に同じ名前を作りやすい。

### 2.3 SpecTODO

**強み**

- TODO という概念を最も明確に見せられる。
- developer tool のラベルとしては分かりやすい。

**弱み**

- `SpecTodo` 以上に TODO を強調しすぎる。
- code constant / internal tool 的な見た目が強い。
- Spectodo が扱う広い状態モデルとのズレが大きくなる。

### 2.4 SpecToDo その他の casing

underlying string は同じだが、`SpecTodo` 以上の実質的な利点を生まず、表記規則だけ複雑になるため採用しない。

---

## 3. なぜ Spectodo を採用したか

判断軸は、**初見での分解しやすさ** と **固有名としての識別性・意味上の余裕** の trade-off である。

`SpecTodo` は、初見で `Spec + Todo` と分解しやすい点では優れる。

一方 `Spectodo` は、

- proper name として扱いやすい
- conventional TODO list に見えすぎない
- `Spec + todo` という由来は残せる
- 既存の `spectodo` repository / `.spectodo.md` と自然に対応する

という強みがある。

このプロジェクトは、まさに **通常の TODO 表現だけでは不足する** ことから始まっている。

したがって `Todo` を強く見せると、起源は説明しやすくなる一方で、product 自体を「仕様TODO管理」に狭く見せる副作用がある。

最終的には、

> **正式表示名は Spectodo、意味上の由来は Spec + TODO**

とする。

---

## 4. 外部衝突の調査

名称衝突は、「同じ文字列が存在するか」ではなく、**実際の識別・流通・法的・市場上の混同が起こるか**で評価する。

### 4.1 GitHub: `wahid022/spectodo-app`

公開 repository が存在する。

- https://github.com/wahid022/spectodo-app

内部には以下の TODO 関連 spec がある。

- `001-todo-app`
- `003-enhanced-todo-dashboard`
- `004-smart-task-reminders`

確認時点では、star / fork 等の visible adoption signal がない小規模な個人 repository だった。

**判断:** 記録はするが、正式名称の blocker にはしない。

理由:

- established product
- active package
- major OSS
- app-store product
- 同カテゴリの商用 service

と、小規模な個人 repository を同じ重みで扱うべきではない。

「過去に一度でも同じ文字列が使われていること」を禁止すると、実際の混同回避に寄与しないまま有力な名称を大量に捨てることになる。

### 4.2 GitHub: `AleBonatti/SpecToDo`

`SpecToDo` 表記の repository も存在する。

- https://github.com/AleBonatti/SpecToDo

README 上の実際の application 名は **Everly** で、consumer 向け list / wishlist application とされている。

**判断:** Spectodo の直接的な product-name collision とはみなさない。

### 4.3 `spectodo.com`

完全一致の `.com` は Atom で販売されている。

- https://www.atom.com/name/Spectodo

販売ページ自体が `spec` / `todo` を root として説明し、task / project management や design / dev workflow を想定用途として挙げている。

こちらの用途に近い意味づけであるため、単なる無関係な parked domain よりは注意すべき情報である。

ただし、同ページは domain 購入に trademark や business registration は含まれないとも明記している。 citeturn938032search0

**判断:** channel constraint ではあるが、それ単独では product-name blocker にしない。

exact-match `.com` は今回の must-work channel として定義していない。  
名前の品質を落としてまで空き `.com` に合わせるべきではない。

将来 exact-match `.com` が business requirement になった場合は、その時点で domain acquisition または名称再検討を別問題として扱う。

### 4.4 一般 Web / store / trademark の preliminary search

今回の一般検索では、同カテゴリで明らかに支配的・有力な `Spectodo` 製品は確認できなかった。

ただし、これは **preliminary collision search** であり、法的な trademark clearance ではない。

negative search を、

> 商標が存在しないことの証明

として記録してはいけない。

商用公開や大きな投資を行う段階では、公式 DB と必要に応じた専門家確認を別 gate とする。

- J-PlatPat: https://www.j-platpat.inpit.go.jp/
- WIPO Global Brand Database: https://branddb.wipo.int/

---

## 5. 今回の命名検討で起きた問題

今回の過程には、今後ルール化する価値がある失敗があった。

### 5.1 low-signal collision を重く見すぎた

star 0 の個人 GitHub repository を、確立した競合製品に近い重さで扱ってしまった。

これは厳しすぎる。

確認すべきなのは、

> この文字列が世界のどこかで使われたことがあるか

ではなく、

> 重要な channel で、現実的な識別・流通・法的・市場混同を生むか

である。

### 5.2 product 名に data model 全体の説明を要求した

Spectodo が scope / stage / implementation / validation まで扱うことを理由に、`spec + todo` では狭すぎると評価した。

これは、名称に内部情報モデル全部を圧縮することを暗黙に要求していた。

product 名は中心概念を表せばよく、全 feature / field を名前だけで説明する必要はない。

### 5.3 `todo` を狭く解釈した

当初 `todo` を「未完了タスク一覧」とほぼ同義に扱った。

今回の文脈では、

> specification ↔ done / remaining / partial / omitted / validated

の関係として見る方が正確だった。

### 5.4 casing / word-boundary variant の比較が遅れた

`Spectodo` と `SpecTodo` は lowercase では同じ `spectodo` である。

そのため technical availability / collision の多くは共通であり、本質的な違いは表示上の意味の見せ方にある。

- `Spectodo`: proper name 寄り
- `SpecTodo`: descriptive tool name 寄り

この比較は、`ScopeState` や `DevBaseline` のような遠い代替案へ移る前に行うべきだった。

### 5.5 指摘ごとに結論を反転させた

検討中、

- Spectodo は狭い / 広いのでは
- SpecTodo の方が分かりやすい
- しかし SpecTodo は TODO を強調しすぎる

と、新しく指摘された軸へその都度寄りすぎた。

修正時は、新しい軸だけで結論を反転させず、**既存の評価軸すべてで再比較する**必要がある。

---

## 6. 後で抽出するルール候補

以下は **rule candidate** であり、まだ naming skill 本体へ反映していない。

### R1. naming layer を分離する

必要性が明示されていない限り、以下を別レイヤーとして評価する。

- product display name
- repository slug
- package / CLI identifier
- file format / extension
- domain
- store title
- social handle

`Spectodo` vs `SpecTodo` のような表示上の casing 差が、lowercase technical identifier には影響しないことがある。

### R2. 新しい候補語を発明する前に orthographic variant を比較する

compound / coined name では最低限、

- word boundary
- CamelCase
- acronym capitalization
- spacing / hyphenation
- lowercase technical form

を比較する。

同じ underlying string でも、casing によって意味の伝わり方や brandability は変わる。

### R3. collision severity は文脈で評価する

「完全一致の検索結果が1件ある」こと自体を hard gate にしない。

少なくとも次を見る。

1. same / adjacent category か
2. adoption / prominence があるか
3. active か abandoned か
4. product / package / repository / parked domain のどれか
5. must-work channel か
6. realistic confusion / legal risk があるか

小規模な個人 repository は記録しても、必ずしも blocker にはしない。

### R4. established direct collision と low-signal string reuse を分ける

強い blocker 候補:

- established same-category product
- 同 ecosystem の active package / CLI
- major OSS project
- must-work store 上の同名 product
- intended goods/services / market で重要な trademark conflict

low-signal な過去利用は同じ重さにしない。

### R5. full feature model を名前へ押し込まない

candidate が、

- central concept を表せるか
- material misrepresentation を起こさないか

を見る。

内部 object / state の全種類を名前へ含めることは要求しない。

### R6. explanation と brandability を両面評価する

`SpecTodo` のように語境界を見せると説明性は上がるが、

- generic 化
- descriptive internal-tool 化
- 一要素の過剰強調

が起こりうる。

`Spectodo` のような fused form は proper-name identity を得やすい一方、短い descriptor が必要になることがある。

どちらも自動的な正解ではない。

### R7. domain availability を普遍的な命名原則にしない

exact-match `.com` を hard gate にするのは、naming brief でその channel が mandatory と定義された場合だけにする。

domain availability のためだけに本体名称を歪めない。

### R8. negative search を legal clearance と書かない

調査範囲を正確に記録する。

適切:

- 「今回の検索では有力な同名競合を確認できなかった」
- 「preliminary search」

不適切:

- 「商標上安全」
- 「同名商標は存在しない」

公式な clearance 手順を踏んでいない場合は断定しない。

### R9. 指摘を受けたら反対方向へ即座に振らず、全体を再比較する

1. 指摘された問題を評価軸へ追加・修正する。
2. 現候補と代替候補を、関連する全評価軸で再比較する。
3. 指摘と無関係な既存の長所・弱点を保持する。
4. 最新の指摘だけを理由に結論を反転させない。

---

## 7. 既存 naming skill との関係

今回の判断は、後で以下と比較して必要な部分だけ抽出する。

- private naming rules for app/service naming
- private naming rules for repository naming

今回再確認できた既存原則:

- product name と repository / domain / package を分ける
- availability は候補品質の評価後に gate として使う
- AI-slop 的な抽象 compound を避ける
- 短さを自動的な長所にしない
- 一つの指摘から反対方向へ過剰補正しない

今回特に追加候補となるもの:

- **collision の存在ではなく実質的な severity を評価する**
- **compound 名では casing / word-boundary variant を早期比較する**
- **説明性と brandability の双方のデメリットまで比較する**
- **指摘後は反転ではなく全体再比較する**

---

## 8. 決定

命名は以下で確定する。

- **Official display name:** Spectodo
- **Repository / technical slug:** `spectodo`
- **Current Markdown format:** `.spectodo.md`

`SpecTodo` は「未決定の別候補」ではなく、比較した上で採用しなかった display variant として記録する。

今後名称を再オープンするのは、たとえば以下の **新しい重要情報** が出た場合に限る。

- 実質的な direct product collision
- relevant trademark problem
- mandatory channel が利用不能
- product の central concept が大きく変わる

無関係・低採用の小規模 project による単なる文字列利用だけでは、名称決定を再オープンしない。
