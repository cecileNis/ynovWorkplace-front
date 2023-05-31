import { test, expect } from "@playwright/test";

test(" create an account", async ({ page }) => {
    await page.goto("http://localhost:3000/signIn");

    // pour chaque test, il faut un nouvel email et un nouveau nom d'utilisateur 

    await page.fill('input[name="firstName"]', 'testuser2144'); 
    await page.fill('input[name="email"]', 'test2144@exampleTest.com');
    await page.fill('input[name="password"]', 'password123'); 

    await Promise.all([
        page.click('[data-testid="submit-register"]'),
        page.waitForLoadState('networkidle')
    ]);

    const url = await page.url();

    expect(url).toMatch(/.*profile/);

    await page.waitForSelector('[data-testid="settings-menu"]');

    await page.click('[data-testid="settings-menu"]');

    await page.click('[data-testid="se déconnecter"]');

    const url2 = await page.url();

    expect(url2).toMatch(/.*logIn/);

});



    

    