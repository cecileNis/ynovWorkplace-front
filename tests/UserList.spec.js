import { test, expect } from "@playwright/test";

test(" redirect to user list page", async ({ page }) => {

    await page.goto("http://localhost:3000/logIn");

    await page.fill('input[name="email"]', 'test244@exampleTest.com');

    await page.fill('input[name="password"]', 'password123');

    await Promise.all([
        page.click('[data-testid="submit-login"]'),
        page.waitForLoadState('networkidle')
    ]);

    const url1 = await page.url();

    expect(url1).toMatch(/.*profile/);

    await page.waitForSelector('[data-testid="User List"]');

    await page.click('[data-testid="User List"]');

    const url2 = await page.url();

    expect(url2).toMatch(/.*userList/);

    });

    test(" redirect to user id page", async ({ page }) => {

        await page.goto("http://localhost:3000/logIn");
    
        await page.fill('input[name="email"]', 'test244@exampleTest.com');
    
        await page.fill('input[name="password"]', 'password123');
    
        await Promise.all([
            page.click('[data-testid="submit-login"]'),
            page.waitForLoadState('networkidle')
        ]);
    
        const url1 = await page.url();
    
        expect(url1).toMatch(/.*profile/);
    
        await page.waitForSelector('[data-testid="User List"]');
    
        await page.click('[data-testid="User List"]');
    
        const url2 = await page.url();
    
        expect(url2).toMatch(/.*userList/);

        await page.waitForSelector('[data-testid="John Doe"]');

        await page.click('[data-testid="John Doe"]');

        const url3 = await page.url();

        expect(url3).toMatch(/.*99/);

        await page.waitForSelector('[data-testid="settings-menu"]');

        await page.click('[data-testid="settings-menu"]');

        await page.click('[data-testid="se déconnecter"]');

        const url4 = await page.url();

        expect(url4).toMatch(/.*logIn/);
    
        });