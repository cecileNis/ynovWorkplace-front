import { test, expect } from "@playwright/test";

test(" login", async ({ page }) => {

    await page.goto("http://localhost:3000/logIn");

    await page.fill('input[name="email"]', 'test244@exampleTest.com');

    await page.fill('input[name="password"]', 'password123');

    await Promise.all([
        page.click('[data-testid="submit-login"]'),
        page.waitForLoadState('networkidle')
    ]);

    // await page.pause();

    const url = await page.url();

    expect(url).toMatch(/.*profile/);

    await page.waitForSelector('[data-testid="settings-menu"]');

    await page.click('[data-testid="settings-menu"]');

    await page.click('[data-testid="se déconnecter"]');

    const url2 = await page.url();

    expect(url2).toMatch(/.*logIn/);

});