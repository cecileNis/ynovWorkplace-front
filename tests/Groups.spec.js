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


test(" redirect to group id page", async ({ page }) => {

    await page.goto("http://localhost:3000/logIn");

    await page.fill('input[name="email"]', 'test244@exampleTest.com');

    await page.fill('input[name="password"]', 'password123');

    await Promise.all([
        page.click('[data-testid="submit-login"]'),
        page.waitForLoadState('networkidle')
    ]);

    const url1 = await page.url();

    expect(url1).toMatch(/.*profile/);

    await page.goto("http://localhost:3000/groups");

    await page.waitForSelector('[data-testid="Ynov Master Informatique"]');
    
    await page.click('[data-testid="Ynov Master Informatique"]');
    
    const url2 = await page.url();
    
    // vérifier que l'url contient l'id du groupe , attention a bien le vérifier avant chaque test
    expect(url2).toMatch(/.*63/);
    }
);

test("create group", async ({ page }) => {

    await page.goto("http://localhost:3000/logIn");

    await page.fill('input[name="email"]', 'test244@exampleTest.com');

    await page.fill('input[name="password"]', 'password123');

    await Promise.all([
        page.click('[data-testid="submit-login"]'),
        page.waitForLoadState('networkidle')
    ]);

    const url = await page.url();

    expect(url).toMatch(/.*profile/);

    await page.waitForSelector('[data-testid="Groupes"]');

    await page.click('[data-testid="Groupes"]');

    const url2 = await page.url();

    expect(url2).toMatch(/.*groups/);

    await page.waitForSelector('[data-testid="create-group"]');

    await page.click('[data-testid="create-group"]');

    const url3 = await page.url();

    expect(url3).toMatch(/.*create/);

    await page.fill('input[name="groupe-name"]', 'testgroup2145');

    await page.fill('textarea[id=":rb:"]', 'testgroup2145');

    await page.waitForSelector('[data-testid="submit-create-group"]');

    await page.click('[data-testid="submit-create-group"]');

    await page.waitForLoadState('networkidle');

    const successMessage = await page.innerText('[role="alert"]');

    expect(successMessage).toMatch(/.*Groupe créé avec succès/);

    await page.waitForSelector('[data-testid="settings-menu"]');

    await page.click('[data-testid="settings-menu"]');

    await page.click('[data-testid="se déconnecter"]');

    const url4 = await page.url();

    expect(url4).toMatch(/.*logIn/);

});