# SauceDemo BDD (Cucumber.js + Playwright)

Домашнє завдання: BDD-тести на Gherkin для сайту [saucedemo.com](https://www.saucedemo.com/),
реалізовані через **Cucumber.js** (Gherkin runner) + **Playwright** (UI-автоматизація).

## Структура проєкту

```
sauce-demo-bdd/
├── cucumber.js                     # конфіг Cucumber.js
├── tsconfig.json
├── package.json
├── .env.example                    # приклад змінних оточення
├── features/
│   ├── login.feature
│   ├── add-product-to-cart.feature
│   ├── delete-product.feature
│   ├── checkout.feature
│   └── step-definitions/
│       ├── login.steps.ts
│       ├── basket.steps.ts
│       └── checkout.steps.ts
└── src/
    ├── pages/
    │   ├── base.page.ts             # Page Object (перенесено з вашого проєкту)
    │   └── product-card.page.ts
    └── support/
        ├── world.ts                 # Cucumber World (аналог fixtures)
        └── hooks.ts                 # Before/After: запуск/закриття браузера
```

## Встановлення

```bash
npm install
cp .env.example .env
npx playwright install chromium
```

## Запуск тестів

```bash
npm test
```

Звіт (HTML) з'явиться в `reports/cucumber-report.html`.

Запуск у видимому браузері (не headless):

```bash
HEADLESS=false npm test
```

## Що покриває кожен feature-файл

| Feature-файл                  | Відповідник з вашого проєкту          |
|--------------------------------|----------------------------------------|
| `login.feature`                 | `login-as-standart-user.spec.ts`      |
| `add-product-to-cart.feature`   | `add-product-to-cart.spec.ts`         |
| `delete-product.feature`        | `delete-product.spec.ts`              |
| `checkout.feature`              | `checkout.spec.ts`                    |

## Важливий нюанс щодо Scenario Outline

У `add-product-to-cart.feature` є два сценарії:
1. **Один сценарій** з послідовним додаванням 3 товарів — рахунок кошика зростає кумулятивно (1 → 2 → 3), як у вашому оригінальному тесті.
2. **Scenario Outline** — кожен приклад (`Examples`) виконується в **новому** браузерному контексті (`Before`-хук створює свіжий `context`/`page` для кожного сценарію), тому там очікується `1`, а не `1/2/3`. Це особливість BDD-раннерів: Outline-приклади ізольовані одне від одного, на відміну від циклу `for` у вашому `.spec.ts`.

## Наступні кроки для розширення

- Додати тег `@smoke` / `@regression` у фічі та запускати вибірково: `npm run test:tags -- "@smoke"`.
- Додати параметризацію `BASE_URL`/`LOGIN`/`PASSWORD` для різних типів користувачів SauceDemo (`locked_out_user`, `problem_user` тощо) — окремий `.feature` для негативних кейсів логіну.
