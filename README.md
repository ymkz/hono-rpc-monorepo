# hono-rpc-monorepo

## Documents

- [API仕様書](docs/apispec/index.html)
- [データベース](docs/database/README.md)

## Tasks

### clean

```sh { name=clean }
find . -name '.next' -type d -prune -exec rm -rf '{}' +
find . -name '.wireit' -type d -prune -exec rm -rf '{}' +
find . -name 'coverage' -type d -prune -exec rm -rf '{}' +
find . -name 'dist' -type d -prune -exec rm -rf '{}' +
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
find . -name 'pnpm-lock.yaml' -type f -prune -exec rm -rf '{}' +
find . -name 'next-env.d.ts' -type f -prune -exec rm -rf '{}' +
find . -name 'tsconfig.tsbuildinfo' -type f -prune -exec rm -rf '{}' +
```

### up

```sh { name=up }
docker compose up -d --wait --wait-timeout=60
```

### down

```sh { name=down }
docker compose down
```

### exec-mysql

```sh { name=exec-mysql }
docker compose exec hono-rpc-monorepo-db mysql app -uapp -p${MYSQL_PASSWORD}
```

### generate-db-docs

```sh { name=generate-db-docs }
tbls doc mysql://app:${MYSQL_PASSWORD}@localhost:3306/app docs/database/schema --force
```
