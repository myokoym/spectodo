# Versions
- V0: Prototype
- V1: MVP
- V2: Release

# Constraints
- SEC-001 認証情報を平文保存しない

## AUTH: 認証
- [ ] AUTH-001 [V0] [P1] Android実機でメールアドレスとパスワードを使ってログインできる | D:x I:x P:x V:~ | !Android実機でのログイン検証が未完了
- [x] AUTH-002 [V0] [P1] ログアウトできる | D:x I:x P:x V:x
- [ ] AUTH-003 [V1] [P2] パスワードを再設定できる | D:x I:~ P:. V:. | !メール送信後の更新処理が未実装 | @docs/auth.md
- [ ] AUTH-004 [V0] [P2] 二要素認証でログインを保護できる | D:. I:. P:. V:.

## DATA: データ
- [x] DATA-001 [V0] [P1] ユーザー設定を端末に保存できる | D:x I:x P:- V:x | @src/storage/settings.ts
- [ ] DATA-002 [V1] [P1] 旧形式の保存データを現行形式へ移行できる | D:x I:> P:- V:.
- [ ] DATA-003 [V0] [P1] ユーザーデータをエクスポートできる | D:. I:. P:. V:.
