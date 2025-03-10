**パッケージ仕様書**

**1. 概要**

このパッケージ（`@team-decorate/alcts`）は、TypeScript で記述されたモデルマッパーライブラリです。

**2. バージョン**

2.0.2

**3. 主要な機能**

- TypeScript モデルのマッピング
- テスト駆動開発（TDD）

**4. ファイル構成**

```
.
├── .clinerules
├── .gitignore
├── .node-version
├── .prettierrc
├── CHANGELOG.md
├── Makefile
├── package.json
├── README.md
├── tsconfig.json
├── yarn.lock
├── .cursor/
├── .docker/
├── .git/
├── .github/
├── db/
├── jest/
├── mocks/
├── node_modules/
├── public/
└── src/
```

**5. 依存関係**

- `@types/pluralize`: "^0.0.29"
- `pluralize`: "^8.0.0"

**6. 開発依存関係**

- `@team-decorate/alcts`: "^1.1.1"
- `@types/jest`: "^29.2.1"
- `core-js`: "^3.6.5"
- `jest`: "^29.2.2"
- `jest-environment-jsdom`: "^29.2.2"
- `jest-node-exports-resolver`: "^1.1.6"
- `linq`: "^3.2.3"
- `ts-jest`: "^29.0.3"
- `tslib`: "^2.8.1"
- `typescript`: "^4.8.4"

**7. スクリプト**

- `build`: "./node_modules/.bin/tsc"
- `test`: "jest --forceExit -i"
- `type-check`: "tsc --noEmit"

**8. テスト**

Jest を使用。テストファイルは`src/__tests__`ディレクトリに配置。

**9. コードの品質管理**

- 未使用の import は削除する。
- `.clinerules`に従う。

**10. 開発手順**

- docker app alcts が立ち上がっていなければ root ディレクトリで`make up`を実行。
- docker app alcts が立ち上がっている事を確認後`make connect`で docker 内に入り package install、test は container 内で行う。
