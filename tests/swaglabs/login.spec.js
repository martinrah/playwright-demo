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

test("SCENARIO: User whos access is denied should not be able to log in.", async ({ page }) => {

    const loginPage = new swagLogin(page);

    await test.step("GIVEN: User has opened the Swag Labs login page.", async () => {

        await loginPage.openLoginPage();

    });

    await test.step("WHEN: The credentials for locked out user are entered and login button is pressed.", async () => {

        await loginPage.username.fill('locked_out_user');
        await loginPage.password.fill('secret_sauce');
        await loginPage.loginButton.click();

    });

    await test.step("THEN: The user should not be able to log in and receive respective warning", async () => {

        await expect(page).not.toHaveURL(/.*inventory/);
        await expect(loginPage.accessError).toBeVisible();
        await expect(loginPage.accessError).toContainText("Epic sadface: Sorry, this user has been locked out.");

    });
});

test("SCENARIO: User should be logged out once Logout button is pressed", async ({ page }) => {

    const loginPage = new swagLogin(page);
    const shopPage = new swagLabs(page);

    await test.step("GIVEN: User has logged in and reached Swag Labs shop inventory page.", async () => {

        await loginPage.loggedIn();
        await expect(page).toHaveURL(/.*inventory/);

    });

    await test.step("WHEN: User selects Logout option from the Menu", async () => {

        await shopPage.sideMenuButton.click();
        await expect(shopPage.logOutButton).toBeVisible();
        await shopPage.logOutButton.click();

    });

    await test.step("THEN: The user should be logged out and see the login screen again.", async () => {


        await expect(page).not.toHaveURL(/.*inventory/);
        await expect(loginPage.username).toBeVisible();
        await expect(loginPage.password).toBeVisible();

    });
});