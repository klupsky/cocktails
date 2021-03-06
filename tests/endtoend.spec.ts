import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';
test('navigation test', async ({ page }) => {
  await page.goto(baseUrl);
  const titleLocator = await page.locator('h1');
  await expect(titleLocator).toHaveText('fancy a cocktail?');

  // click on full collection and go to collection page
  const goToCollection = page.locator('data-test-id=fullcollection');
  await goToCollection.click();
  await expect(page).toHaveURL(`${baseUrl}collection`);

  // open menu and go to imprint
  const goToMenu = page.locator('data-test-id=menu');
  await goToMenu.click();
  const goToImprint = page.locator('data-test-id=imprint');
  await goToImprint.click();
  await expect(page).toHaveURL(`${baseUrl}imprint`);

  // open menu and go to recommendation
  const goToMenuAgain = page.locator('data-test-id=menu');
  await goToMenuAgain.click();
  const goToRecommendation = page.locator('data-test-id=recommendation');
  await goToRecommendation.click();
  await expect(page).toHaveURL(`${baseUrl}login?returnTo=/recommendation`);

  // open menu and go to collection
  const goToMenuAgainAgain = page.locator('data-test-id=menu');
  await goToMenuAgainAgain.click();
  const goToCollectionViaMenu = page.locator('data-test-id=collection');
  await goToCollectionViaMenu.click();
  await expect(page).toHaveURL(`${baseUrl}collection`);
});

// PWDEBUG=1 yarn playwright test
