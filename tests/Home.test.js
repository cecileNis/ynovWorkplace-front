import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/React App/);
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("presentation", { id: "menu-appbar" }).click();

  await page.getByRole("link", { name: "s'enregistrer" }).click();

  await expect(page).toHaveURL(/.*signIn/);
});
