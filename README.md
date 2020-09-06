# wireframe

pro dev spusťte:

```bash
npm run install # instalace node balíků

USER=user API_KEY=api_key API_HOST=api_host API_INSTANCE_NAME=api_instance_name [PORT=port]  npm run dev
```

- Takto se spustí jednoduchý server, který servíruje:

  1.  statickou html stránku
  2.  statický javascript
  3.  endpointy pro kampaně a kategorie

- spustí se dev skript pro generovani js

spuštění serveru je možno provést i separátně od sestavení js:

```bash
npm run install
npm run client:build
USER=user API_KEY=api_key API_HOST=api_host API_INSTANCE_NAME=api_instance_name [PORT=port] npm run server:dev
```
