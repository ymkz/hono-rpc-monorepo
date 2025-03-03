# ローカル開発環境のセットアップ

[mise](https://mise.jdx.dev/)の利用を前提とする。

## クレデンシャルの設定

必要な値を `.env.secret` に設定する。\
mise が `.env.secret` の内容を自動で読み込みディレクトリ内では環境変数が設定されているものとして扱える。

```
# api
MYSQL_PASSWORD=app

# web
API_URL=http://localhost:8080
```
