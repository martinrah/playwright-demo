const { test, expect } = require('@playwright/test');
import { swagLogin } from '../../pages/swaglogin';
import { swagLabs } from '../../pages/swaglabs';

test("SCENARIO: User should be able to log in with standard user given the correct credentials.", async ({ page }) => {

    const loginPage = new swagLogin(page);
    const shopPage = new swagLabs(page);

    await test.step("GIVEN: User has opened the Swag Labs login page.", async () => {

        await loginPage.openLoginPage();

    });

    await test.step("WHEN: The correct credentials for standard user are entered and login button is pressed.", async () => {

        await loginPage.username.fill('standard_user');
        await loginPage.password.fill('secret_sauce');
        await loginPage.loginButton.click();

    });

    await test.step("THEN: The user should be successfully logged in to Swag Labs e-shop.", async () => {

        await expect(page).toHaveURL(/.*inventory/);
        await expect(shopPage.productsTitle).toBeVisible();
        await expect(shopPage.productsTitle).toContainText('Products');

    });
});

test("SCENARIO: User should not be able to access the e-shop without logging in.", async ({ page }) => {

    const loginPage = new swagLogin(page);
    const shopPage = new swagLabs(page);

    await test.step("WHEN: User tries to access the e-shop link directly without logging in.", async () => {

        await shopPage.openSwagShop();

    });

    await test.step("THEN: The user should not be able to access the page and get notified.", async () => {

        await expect(page).not.toHaveURL(/.*inventory/);
        await expect(loginPage.accessError).toBeVisible();
        await expect(loginPage.accessError).toContainText("Epic sadface: You can only access '/inventory.html' when you are logged in.");

    });
});