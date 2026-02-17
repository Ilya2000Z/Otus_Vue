# Nuxt Shop — учебный проект Otus

Веб-приложение на **Nuxt 3** с SSR, **GraphQL** API и состоянием на **Pinia**.

## Навыки

- Кросс-платформенные приложения на Vue (Nuxt)
- SSR / Nuxt: файловый роутинг, `useAsyncData`, серверные API
- GraphQL: схема на сервере, запросы с клиента через composable

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

## Структура

- `pages/` — страницы (главная, каталог, товар, корзина, профиль)
- `server/api/` — API: `graphql.post.ts` (GraphQL), `products.get.ts` (REST поверх GraphQL)
- `server/utils/graphql.ts` — схема и резолверы GraphQL
- `stores/cart.ts` — Pinia-сторе корзины
- `composables/useGraphQL.ts` — запросы к GraphQL API

## Сборка

```bash
npm run build
npm run preview
```
