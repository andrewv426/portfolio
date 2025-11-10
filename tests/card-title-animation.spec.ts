import { test, expect, type Locator } from '@playwright/test';

const DEV_SERVER_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000/';
const ANIMATION_TOLERANCE = 2; // pixels tolerance for transform values
const ANIMATION_DURATION = 700; // ms - wait for animation to complete

async function getTitleTransformX(locator: Locator): Promise<number> {
  return locator.evaluate((el) => {
    const style = window.getComputedStyle(el as HTMLElement);

    // Try to get the translate property first (modern CSS)
    const translate = style.translate;
    if (translate && translate !== 'none') {
      // Parse translate value like "0px 0px" or "-50% 0px"
      const parts = translate.split(' ');
      const xValue = parts[0] || '0';

      // Handle percentage values by converting to pixels
      if (xValue.endsWith('%')) {
        const percentage = parseFloat(xValue);
        const parentWidth = (el as HTMLElement).parentElement?.offsetWidth || 0;
        return (percentage / 100) * parentWidth;
      }

      return parseFloat(xValue) || 0;
    }

    // Fallback to transform matrix parsing for older browsers
    const transform = style.transform;
    if (!transform || transform === 'none') {
      return 0;
    }

    // Parse matrix or matrix3d transform
    const parseMatrix = (value: string) => {
      if (value.startsWith('matrix3d')) {
        const values = value
          .slice('matrix3d('.length, -1)
          .split(',')
          .map((part) => parseFloat(part.trim()));
        return values[12] ?? 0; // translateX is at index 12 in matrix3d
      }
      if (value.startsWith('matrix')) {
        const values = value
          .slice('matrix('.length, -1)
          .split(',')
          .map((part) => parseFloat(part.trim()));
        return values[4] ?? 0; // translateX is at index 4 in matrix
      }
      return 0;
    };

    return parseMatrix(transform);
  });
}

test.describe('Card title hover animation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEV_SERVER_URL, { waitUntil: 'networkidle' });
    // Move mouse to neutral position to avoid interference from previous tests
    await page.mouse.move(0, 0);
    const workSection = page.locator('#work');
    await workSection.scrollIntoViewIfNeeded();
    // Wait for any initial animations to settle
    await page.waitForTimeout(800);
  });

  test('HackTX title animates from left to center on hover when card is closed', async ({ page }) => {
    const card = page.locator('[data-work-card="true"]').first();
    await expect(card).toBeVisible();

    // Ensure card is not expanded
    const isExpanded = await card.evaluate((el) => el.classList.contains('card-expanded'));
    if (isExpanded) {
      await card.click({ position: { x: 40, y: 40 } });
      await page.waitForTimeout(800);
    }

    // Move mouse away to ensure no hover state
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    const titleWrapper = card.locator('.card-title-wrapper').first();
    await expect(titleWrapper).toBeVisible();

    // Check initial state - should be at translateX(0) or very close
    const initialTransform = await getTitleTransformX(titleWrapper);
    console.log('Initial title transform X:', initialTransform);
    expect(Math.abs(initialTransform)).toBeLessThan(ANIMATION_TOLERANCE);

    // Hover over the card
    await card.hover();
    await page.waitForTimeout(ANIMATION_DURATION);

    // Check hovered state - should have significant translateX (moved toward center)
    // The transform can be negative when using left + translateX(-50%) approach
    const hoveredTransform = await getTitleTransformX(titleWrapper);
    console.log('Hovered title transform X:', hoveredTransform);
    expect(Math.abs(hoveredTransform)).toBeGreaterThan(ANIMATION_TOLERANCE);

    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(ANIMATION_DURATION);

    // Check reset state - should return to near 0
    const resetTransform = await getTitleTransformX(titleWrapper);
    console.log('Reset title transform X:', resetTransform);
    expect(Math.abs(resetTransform)).toBeLessThan(ANIMATION_TOLERANCE);
  });

  test('Title animation does not trigger when card is expanded', async ({ page }) => {
    const card = page.locator('[data-work-card="true"]').first();
    await expect(card).toBeVisible();

    // Move mouse away first
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    // Expand the card
    await card.click({ position: { x: 40, y: 40 } });
    await page.waitForTimeout(800);

    // Verify card is expanded
    const isExpanded = await card.evaluate((el) => el.classList.contains('card-expanded'));
    expect(isExpanded).toBe(true);

    const titleWrapper = card.locator('.card-title-wrapper').first();
    await expect(titleWrapper).toBeVisible();

    // Get initial transform
    const initialTransform = await getTitleTransformX(titleWrapper);
    console.log('Initial title transform X (expanded):', initialTransform);

    // Hover over the expanded card
    await card.hover();
    await page.waitForTimeout(ANIMATION_DURATION);

    // Title should NOT move (animation should not trigger when expanded)
    const hoveredTransform = await getTitleTransformX(titleWrapper);
    console.log('Hovered title transform X (expanded):', hoveredTransform);
    expect(Math.abs(hoveredTransform - initialTransform)).toBeLessThan(ANIMATION_TOLERANCE);
  });

  test('JPMC DataForGood title animates correctly', async ({ page }) => {
    const cards = page.locator('[data-work-card="true"]');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThanOrEqual(2);

    const dfgCard = cards.nth(1); // Second card should be DFG
    await expect(dfgCard).toBeVisible();

    // Ensure card is not expanded
    const isExpanded = await dfgCard.evaluate((el) => el.classList.contains('card-expanded'));
    if (isExpanded) {
      await dfgCard.click({ position: { x: 40, y: 40 } });
      await page.waitForTimeout(800);
    }

    // Move mouse away to ensure no hover state
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    const titleWrapper = dfgCard.locator('.card-title-wrapper').first();
    await expect(titleWrapper).toBeVisible();

    // Check initial state
    const initialTransform = await getTitleTransformX(titleWrapper);
    expect(Math.abs(initialTransform)).toBeLessThan(ANIMATION_TOLERANCE);

    // Hover
    await dfgCard.hover();
    await page.waitForTimeout(ANIMATION_DURATION);

    // Check hovered state
    const hoveredTransform = await getTitleTransformX(titleWrapper);
    expect(Math.abs(hoveredTransform)).toBeGreaterThan(ANIMATION_TOLERANCE);

    // Reset
    await page.mouse.move(0, 0);
    await page.waitForTimeout(ANIMATION_DURATION);

    const resetTransform = await getTitleTransformX(titleWrapper);
    expect(Math.abs(resetTransform)).toBeLessThan(ANIMATION_TOLERANCE);
  });

  test('Education card title animates correctly', async ({ page }) => {
    const aboutSection = page.locator('#about');
    await aboutSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Find education card (first card in about section)
    const educationCard = page.locator('#about .card-container').first();
    await expect(educationCard).toBeVisible();

    // Ensure card is not expanded
    const isExpanded = await educationCard.evaluate((el) => el.classList.contains('card-expanded'));
    if (isExpanded) {
      await educationCard.click({ position: { x: 40, y: 40 } });
      await page.waitForTimeout(800);
    }

    // Move mouse away to ensure no hover state
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    const titleWrapper = educationCard.locator('.card-title-wrapper').first();
    await expect(titleWrapper).toBeVisible();

    // Check initial state
    const initialTransform = await getTitleTransformX(titleWrapper);
    expect(Math.abs(initialTransform)).toBeLessThan(ANIMATION_TOLERANCE);

    // Hover
    await educationCard.hover();
    await page.waitForTimeout(ANIMATION_DURATION);

    // Check hovered state
    const hoveredTransform = await getTitleTransformX(titleWrapper);
    expect(Math.abs(hoveredTransform)).toBeGreaterThan(ANIMATION_TOLERANCE);

    // Reset
    await page.mouse.move(0, 0);
    await page.waitForTimeout(ANIMATION_DURATION);

    const resetTransform = await getTitleTransformX(titleWrapper);
    expect(Math.abs(resetTransform)).toBeLessThan(ANIMATION_TOLERANCE);
  });

  test('Animation is smooth and fluid', async ({ page }) => {
    const card = page.locator('[data-work-card="true"]').first();
    await expect(card).toBeVisible();

    // Ensure card is not expanded
    const isExpanded = await card.evaluate((el) => el.classList.contains('card-expanded'));
    if (isExpanded) {
      await card.click({ position: { x: 40, y: 40 } });
      await page.waitForTimeout(800);
    }

    // Move mouse away to ensure no hover state
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    const titleWrapper = card.locator('.card-title-wrapper').first();

    // Get initial position
    const initialTransform = await getTitleTransformX(titleWrapper);

    // Get the card's bounding box to calculate a stable hover position
    const cardBox = await card.boundingBox();
    if (!cardBox) throw new Error('Card not found');

    // Move mouse to center of card to start hover animation
    const hoverX = cardBox.x + cardBox.width / 2;
    const hoverY = cardBox.y + cardBox.height / 2;
    await page.mouse.move(hoverX, hoverY);

    // Check intermediate positions during animation (should be gradually increasing)
    await page.waitForTimeout(ANIMATION_DURATION / 3);
    const midTransform1 = await getTitleTransformX(titleWrapper);

    await page.waitForTimeout(ANIMATION_DURATION / 3);
    const midTransform2 = await getTitleTransformX(titleWrapper);

    await page.waitForTimeout(ANIMATION_DURATION / 3);
    const finalTransform = await getTitleTransformX(titleWrapper);

    console.log('Animation progression:', {
      initial: initialTransform,
      mid1: midTransform1,
      mid2: midTransform2,
      final: finalTransform
    });

    // Verify animation progresses smoothly
    // The transform values move from 0 towards negative (centering), so check absolute values
    // Allow for some variance due to easing
    expect(Math.abs(finalTransform)).toBeGreaterThan(Math.abs(initialTransform));
    expect(Math.abs(finalTransform - midTransform2)).toBeLessThan(Math.abs(finalTransform - initialTransform));
  });
});

