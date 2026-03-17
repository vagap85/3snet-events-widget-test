import { test, expect } from '@playwright/test';
import { WidgetPage } from '../pages/widgetPage';

test.describe('Конструктор календаря мероприятий', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);
    await widgetPage.goto();
  });

  test('Проверка загрузки страницы и основных элементов', async () => {
    await expect(widgetPage.heading).toBeVisible();
    await expect(widgetPage.themeButtons).toHaveCount(2);
    await expect(widgetPage.countrySelect).toBeVisible();
    await expect(widgetPage.clearCountryButton).toBeVisible();
  });

  test('Проверка начального состояния', async () => {
    // Проверяем, что поля размера пустые
    await expect(widgetPage.widthInput).toHaveValue('');
    await expect(widgetPage.heightInput).toHaveValue('');
    
    // Проверяем, что код еще не сгенерирован
    const isCodeVisible = await widgetPage.isCodeGenerated();
    expect(isCodeVisible).toBeFalsy();
  });

  test('Изменение темы и проверка кода', async ({ page }) => {
    // Выбираем темную тему
    await widgetPage.selectTheme('dark');
    
    // Вводим размеры
    await widgetPage.setSize('500', '400');
    
    // Выбираем страну
    await widgetPage.selectCountry('Франция');
    
    // Проверяем, что код появился
    const isGenerated = await widgetPage.isCodeGenerated();
    expect(isGenerated).toBeTruthy();
    
    // Проверяем содержимое кода (если есть)
    const code = await widgetPage.getGeneratedCode();
    if (code) {
      expect(code).toContain('500');
      expect(code).toContain('400');
    }
  });

  test('Очистка выбранной страны', async () => {
    // Выбираем страну
    await widgetPage.selectCountry('Германия');
    
    // Очищаем выбор
    await widgetPage.clearCountry();
    
    // Проверяем, что выбор сбросился
    await expect(widgetPage.countrySelect).toHaveValue('');
  });

  test('Генерация кода с разными параметрами', async () => {
    // Тест с минимальными параметрами
    await widgetPage.selectTheme('light');
    await widgetPage.setSize('300', '200');
    await widgetPage.selectCountry('Италия');
    
    const code1 = await widgetPage.getGeneratedCode();
    expect(code1.length).toBeGreaterThan(0);
    
    // Меняем параметры
    await widgetPage.selectTheme('dark');
    await widgetPage.setSize('600', '500');
    await widgetPage.selectCountry('Испания');
    
    const code2 = await widgetPage.getGeneratedCode();
    expect(code2.length).toBeGreaterThan(0);
    
    // Код должен измениться
    if (code1 && code2) {
      expect(code1).not.toEqual(code2);
    }
  });

  test('Проверка кнопок "Очистить"', async () => {
    // Находим все кнопки "Очистить"
    const clearButtons = widgetPage.page.getByRole('button', { name: /Очистить/i });
    await expect(clearButtons).toHaveCount(2); // Для тематики и для стран
  });
});