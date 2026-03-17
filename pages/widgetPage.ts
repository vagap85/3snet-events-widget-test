import { Page, Locator } from '@playwright/test';

export class WidgetPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly themeButtons: Locator;
  readonly countrySelect: Locator;
  readonly clearCountryButton: Locator;
  readonly widthInput: Locator;
  readonly heightInput: Locator;
  readonly generateCodeButton: Locator;
  readonly generatedCode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /Начните создавать свой календарь/i });
    this.themeButtons = page.locator('button:has-text("Светлая тема"), button:has-text("Темная тема")');
    this.countrySelect = page.locator('select').first();
    this.clearCountryButton = page.getByRole('button', { name: /Очистить/i }).nth(1);
    this.widthInput = page.locator('input[placeholder*="Ширина"]');
    this.heightInput = page.locator('input[placeholder*="Высота"]');
    this.generateCodeButton = page.getByRole('button', { name: /Сгенерировать/i });
    this.generatedCode = page.locator('textarea[readonly]');
  }

  async goto() {
    await this.page.goto('/eventswidget/');
  }

  async selectTheme(theme: 'light' | 'dark') {
    const themeButton = this.page.getByRole('button', { 
      name: theme === 'light' ? 'Светлая тема' : 'Темная тема' 
    });
    await themeButton.click();
  }

  async selectCountry(countryName: string) {
    await this.countrySelect.selectOption({ label: countryName });
  }

  async clearCountry() {
    await this.clearCountryButton.click();
  }

  async setSize(width: string, height: string) {
    await this.widthInput.fill(width);
    await this.heightInput.fill(height);
  }

  async getGeneratedCode(): Promise<string> {
    await this.page.waitForTimeout(500);
    return await this.generatedCode.inputValue();
  }

  async isCodeGenerated(): Promise<boolean> {
    try {
      await this.generatedCode.waitFor({ state: 'visible', timeout: 5000 });
      const code = await this.getGeneratedCode();
      return code.length > 0;
    } catch {
      return false;
    }
  }
}