# Архитектура MoneyFlow

## Структура проекта

```
src/
├── core/                    # Ядро приложения
│   ├── constants/           # Константы (категории, ключи storage)
│   ├── plugins/             # Vue-плагины (форматирование валюты)
│   ├── types/               # Типы и интерфейсы
│   └── utils/               # Чистые утилиты (даты, id, persist)
├── store/                   # Pinia stores
│   ├── transactions.store.ts
│   ├── budget.store.ts
│   ├── categories.store.ts
│   └── settings.store.ts
├── router/                  # Vue Router
├── composables/             # Композиционные функции
│   ├── useCurrency.ts
│   └── usePeriodFilter.ts
├── ui/                      # Переиспользуемый UI
│   ├── layout/              # AppLayout, AppHeader
│   ├── components/          # AppCard, StatCard, PeriodFilter
│   └── views/               # NotFoundView
├── modules/
│   ├── transactions/       # Модуль транзакций
│   │   ├── TransactionsView.vue
│   │   ├── TransactionDetailView.vue
│   │   ├── TransactionFormView.vue
│   │   └── components/
│   ├── budget/             # Модуль бюджета
│   │   ├── BudgetView.vue
│   │   └── components/
│   ├── travel/            # Модуль путешествий
│   │   ├── TravelView.vue
│   │   ├── components/    # TravelForm, TravelSummary, RouteMap, StopsList, ActivitiesList
│   │   ├── composables/   # useTravelCalculator, useRouteService, useActivitiesService
│   │   ├── services/      # routeApi, placesApi, transportApi (внешние API + mock)
│   │   ├── store/         # travel.store
│   │   └── types.ts
│   └── dashboard/         # Дашборд
│       ├── DashboardView.vue
│       └── components/
├── styles/
├── plugins/                 # Vuetify и др.
├── App.vue
└── main.ts
```

## Принятые решения

### 1. Состояние (Pinia)

- **Не храним производные данные в state**: суммы доходов/расходов и баланс считаются в getters или в функциях store (`getStatsByRange`), а не сохраняются в state.
- **Единственный источник правды**: транзакции и бюджеты хранятся в store и синхронизируются с LocalStorage через `persist()` после каждой мутации.
- **Разделение store по доменам**: transactions, budget, categories, settings — каждый store отвечает за свою область.

### 2. Роутинг

- **Params для детальной страницы**: маршрут `transactions/:id` и `transactions/:id/edit` используют `route.params.id`; компоненты получают `id` через props (props: true) или через `useRoute()`.
- **Lazy-loaded views**: все страницы подключены через `() => import(...)` для разбиения бандла.

### 3. Плагин валюты

- Глобальные методы `$formatCurrency` и `$formatCurrencyCompact` регистрируются через `CurrencyPlugin`. Опции (валюта, локаль) задаются при `app.use(CurrencyPlugin, options)`.
- В Composition API удобнее использовать composable `useCurrency()`, который внутри обращается к `globalProperties`.

### 4. Provide / Inject

- **Период фильтра**: в `TransactionsView` и `DashboardView` создаётся один экземпляр `usePeriodFilter()`, он передаётся потомкам через `provide(PERIOD_FILTER_KEY, periodFilter)`. Компонент `PeriodFilter` получает его через `inject` и отображает/меняет тот же период, что и родитель — без дублирования состояния.

### 5. Async-компоненты и shallowRef

- В дашборде блок «Бюджет за месяц» подгружается как асинхронный компонент: `defineAsyncComponent({ loader: () => import('...') })`. Результат хранится в `shallowRef`, чтобы не делать глубокую реактивность для самого компонента (оптимизация).

### 6. Слоты и component :is

- **AppCard**: слоты `title`, default и `actions` для гибкой верстки карточек.
- **StatCard**: слот `value` для кастомного отображения суммы.
- **RouterView**: используется `v-slot="{ Component, route }"` и `<component :is="Component" :key="route.path">` для анимации смены страниц (Transition).
- В дашборде: `<component :is="BudgetSummaryComponent">` для отображения асинхронно подгруженного компонента.

### 7. Контейнеры и презентационные компоненты

- **Контейнеры** (views): `TransactionsView`, `BudgetView`, `DashboardView` — подключают store, router, composables и передают данные в дочерние компоненты.
- **Презентационные**: `TransactionList`, `TransactionListItem`, `StatCard`, `AppCard` — получают данные через props и сообщают о действиях через emit; не зависят от store напрямую (кроме случаев, где это оправдано, например категории в форме).

### 8. Валидация форм

- В формах транзакции и бюджета используется Vuetify `VForm` с `ref` и правилами в виде функций (required, positive). Отправка только после успешного `validate()`.

### 9. Анимации

- Смена страниц: Transition с именем `page` в App.vue.
- Список транзакций: TransitionGroup с именем `list` для плавного появления/удаления элементов (классы в `global.scss`).

### 10. Темная тема и адаптивность

- Тема хранится в `settings.store` и применяется через `useTheme()` Vuetify в App.vue.
- Адаптивность: Vuetify grid (VRow, VCol), брейкпоинты (d-none d-sm-flex), мобильное меню в хедере.

## Зависимости между модулями

- **core** не зависит ни от кого.
- **store** зависит от core (types, constants, utils).
- **composables** могут использовать store и core.
- **ui** компоненты минимально зависят от store (предпочтительно props/emit).
- **modules** используют store, router, composables и ui.
