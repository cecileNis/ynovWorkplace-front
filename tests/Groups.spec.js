import { test, expect } from "@playwright/test";

// without registered account

test(" redirect to connect page", async ({ page }) => {
    await page.goto("http://localhost:3000/groups");

    await page.waitForSelector('[data-testid="Ynov Master Informatique"]');
    
    await page.click('[data-testid="Ynov Master Informatique"]');
    
    const url = await page.url();
    
    expect(url).toMatch(/.*logIn/);
    }
);