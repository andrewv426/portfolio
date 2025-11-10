import { test, expect, type Locator } from '@playwright/test';

const DEV_SERVER_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000/';
const DRIFT_TOLERANCE = 1.5;
const MIN_WIND_OFFSET = 2;

async function getTranslation(locator: Locator) {
  return locator.evaluate((el) => {
    const style = window.getComputedStyle(el as HTMLElement);
    const transform = style.transform;
    const parseMatrix = (value: string | null) => {
      if (!value || value === 'none')
        return { x: 0, y: 0 };
      if (value.startsWith('matrix3d')) {
        const values = value
          .slice('matrix3d('.length, -1)
          .split(',')
          .map((part) => parseFloat(part.trim()));
        return {
          x: values[12] ?? 0,
          y: values[13] ?? 0
        };
      }
      if (value.startsWith('matrix')) {
        const values = value
          .slice('matrix('.length, -1)
          .split(',')
          .map((part) => parseFloat(part.trim()));
        return {
          x: values[4] ?? 0,
          y: values[5] ?? 0
        };
      }
      return { x: 0, y: 0 };
    };
    return parseMatrix(transform);
  });
}

test.describe('Wind-pushed card animation', () => {
  test('drifts inward on hover and settles when expanded', async ({ page }) => {
    await page.goto(DEV_SERVER_URL, { waitUntil: 'networkidle' });
    const workSection = page.locator('#work');
    await workSection.scrollIntoViewIfNeeded();

    const card = page.locator('[data-work-card=\"true\"]').first();
    await expect(card).toBeVisible();

    const initial = await getTranslation(card);
    console.log('Initial transform', initial);
    expect(Math.abs(initial.x) + Math.abs(initial.y)).toBeGreaterThan(MIN_WIND_OFFSET);

    await card.hover();
    await page.waitForTimeout(800);
    const hovered = await getTranslation(card);
    console.log('Hovered transform', hovered);
    expect(Math.abs(hovered.x)).toBeLessThan(DRIFT_TOLERANCE);
    expect(Math.abs(hovered.y)).toBeLessThan(DRIFT_TOLERANCE);

    await page.mouse.move(0, 0);
    await page.waitForTimeout(800);
    const reset = await getTranslation(card);
    console.log('Reset transform', reset);
    expect(Math.abs(reset.x - initial.x)).toBeLessThan(DRIFT_TOLERANCE);
    expect(Math.abs(reset.y - initial.y)).toBeLessThan(DRIFT_TOLERANCE);

    await card.click({ position: { x: 40, y: 40 } });
    await page.waitForTimeout(800);
    const expanded = await getTranslation(card);
    console.log('Expanded transform', expanded);
    expect(expanded.y).toBeLessThan(-3);

    await page.mouse.move(0, 0);
    await page.waitForTimeout(500);
    const expandedStable = await getTranslation(card);
    console.log('Expanded stable transform', expandedStable);
    expect(expandedStable.y).toBeLessThan(-3);

    await card.click({ position: { x: 40, y: 40 } });
    await page.mouse.move(0, 0);
    await page.waitForTimeout(800);
    const collapsed = await getTranslation(card);
    console.log('Collapsed transform', collapsed);
    expect(Math.abs(collapsed.x - initial.x)).toBeLessThan(DRIFT_TOLERANCE);
    expect(Math.abs(collapsed.y - initial.y)).toBeLessThan(DRIFT_TOLERANCE);
  });
});
