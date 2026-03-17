# Тесты для конструктора календаря мероприятий 3snet

[![Playwright Tests](https://img.shields.io/badge/Playwright-Tests-green)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

Автоматизированные тесты для страницы [https://dev.3snet.info/eventswidget/](https://dev.3snet.info/eventswidget/)

## 📋 Содержание тестов

| # | Тест-кейс | Описание |
|---|-----------|----------|
| 1 | Загрузка страницы | Проверка основных элементов интерфейса |
| 2 | Начальное состояние | Проверка пустых полей и отсутствия кода |
| 3 | Изменение темы | Выбор темной темы и проверка кода |
| 4 | Очистка страны | Сброс выбранной страны |
| 5 | Генерация кода | Проверка с разными параметрами |
| 6 | Кнопки "Очистить" | Проверка наличия обеих кнопок |

## 🚀 Быстрый старт

```bash
# Клонировать репозиторий
git clone https://github.com/vagap85/3snet-events-widget-test.git
cd 3snet-events-widget-test

# Установить зависимости
npm install

# Установить браузеры Playwright
npx playwright install

# Запустить тесты
npx playwright test

📊 Результаты запуска
Running 6 tests using 6 workers
  6 passed (4.9s)

📊 Отчёт HTML
  npx playwright show-report

📁 Структура проекта
text
├── pages/          # Page Objects (модели страниц)
│   └── widgetPage.ts
├── tests/          # Тест-кейсы
│   ├── example.spec.ts
│   └── widget.spec.ts
├── data/           # Тестовые данные
│   └── testData.json
├── utils/          # Вспомогательные функции
│   └── helpers.ts
├── playwright.config.ts  # Конфигурация Playwright
└── package.json          # Зависимости и скрипты
🌐 Поддерживаемые браузеры
✅ Chromium

✅ Firefox

✅ WebKit (Safari)

📝 Примечания
Тесты используют Page Object Model для удобства поддержки

Есть явные ожидания для стабильной работы

Тестовые данные вынесены в отдельный JSON файл

При падении тестов сохраняются скриншоты и видео

🤝 Требования
Node.js 18 или выше

npm или yarn

Git

📄 Лицензия
ISC
