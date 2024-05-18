import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Guillermo Rauch's blog/);
});

test("can navigate to about", async ({ page }) => {
  // Skipping in dev because Image.propTypes is not available on the server
  // https://github.com/rauchg/blog/pull/161
  test.skip(!process.env.CI);
  await page.goto("/");
  await page.getByRole("link", { name: "About" }).click();
  await page.getByRole("heading", { name: "About" }).click();
});

test("can navigate to post", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Making the Web. Faster." }).click();
  await page.getByRole("heading", { name: "Making the Web. Faster." }).click();
});
