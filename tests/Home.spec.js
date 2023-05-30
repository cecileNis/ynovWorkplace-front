import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");
  
  const title = await page.title();

  expect(title).toMatch(/React App/);
});

test("get sign in link", async ({ page }) => {
  await page.goto("http://localhost:3000");
  
  await page.waitForSelector('[data-testid="settings-menu"]');

  await page.click('[data-testid="settings-menu"]');

  await page.click('[data-testid="s\'enregistrer"]');
  
  const url = await page.url();

  expect(url).toMatch(/.*signIn/);
});

test("get login link", async ({ page }) => {

  await page.goto("http://localhost:3000");
  
  await page.waitForSelector('[data-testid="settings-menu"]');

  await page.click('[data-testid="settings-menu"]');

  await page.click('[data-testid="se connecter"]');
  
  const url = await page.url();

  expect(url).toMatch(/.*logIn/);
});


 