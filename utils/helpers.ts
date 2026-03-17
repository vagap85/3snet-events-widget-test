import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export function loadTestData() {
  const dataPath = path.join(__dirname, '../data/testData.json');
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

export async function waitForCodeGeneration(page: Page, timeout = 5000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const textarea = page.locator('textarea[readonly]');
    if (await textarea.isVisible()) {
      const value = await textarea.inputValue();
      if (value.length > 0) {
        return value;
      }
    }
    await page.waitForTimeout(100);
  }
  throw new Error('Code generation timeout');
}