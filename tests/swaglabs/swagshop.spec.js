const { test, expect } = require('@playwright/test');
import { swagLogin } from '../../pages/swaglogin';
import { swagLabs } from '../../pages/swaglabs';

test("SCENARIO: User should be able to see the added items in cart.", async ({ page }) => {

    const loginPage = new swagLogin(page);
    const shopPage = new swagLabs(page);

    await test.step("GIVEN: User has logged in and reached Swag Labs shop inventory page.", async () => {

        await loginPage.loggedIn();
        await expect(page).toHaveURL(/.*inventory/);

    });

    await test.step("WHEN: User adds the Sauce Labs Backpack to cart.", async () => {

        await shopPage.addBackpackButton.click();

    });

    await test.step("THEN: The user should see the Backpack appear in cart.", async () => {

        await shopPage.shoppingCartIcon.click();
        await expect(page).toHaveURL(/.*cart/);
        await expect(shopPage.shoppingCartList).toHaveCount(1);
        await expect(shopPage.shoppingCartList).toContainText("Sauce Labs Backpack")

    });

    await test.step("AND WHEN: The user clicks remove Backpack button", async () => {

        await expect(shopPage.removeBackpackButton).toBeVisible();
        await shopPage.removeBackpackButton.click();

    });

    await test.step("THEN: The Backpack should be removed from shopping cart list", async () => {

        await expect(shopPage.removeBackpackButton).not.toBeVisible();
        await expect(shopPage.shoppingCartList).not.toContainText("Sauce Labs Backpack")

    });
});

test("SCENARIO: User should be able to filter the inventory according to the option chosen.", async ({ page }) => {

    const loginPage = new swagLogin(page);
    const shopPage = new swagLabs(page);

    await test.step("GIVEN: User has logged in and reached Swag Labs shop inventory page.", async () => {

        await loginPage.loggedIn();
        await expect(page).toHaveURL(/.*inventory/);

    });

    await test.step("WHEN: User selects to filter the Inventory by Name Z to A ", async () => {

        await shopPage.filterDropdown.selectOption('za');

    });

    await test.step("THEN: The Inventory products should be filtered by Name Z to A", async () => {

        await expect(shopPage.firstInventoryItem).toContainText('Test.allTheThings() T-Shirt (Red)')

    });

    await test.step("AND WHEN: User selects to filter the Inventory by Price Low to High", async () => {

        await shopPage.filterDropdown.selectOption('lohi');

    });

    await test.step("THEN: The Inventory products should be filtered by Price Low to High", async () => {

        await expect(shopPage.firstInventoryItem).toContainText('Sauce Labs Onesie')

    });

    await test.step("AND WHEN: User selects to filter the Inventory by Price High to Low", async () => {

        await shopPage.filterDropdown.selectOption('hilo');

    });

    await test.step("THEN: The Inventory products should be filtered by Price High to Low", async () => {

        await expect(shopPage.firstInventoryItem).toContainText('Sauce Labs Fleece Jacket')

    });

    await test.step("AND WHEN: User selects to filter the Inventory by Name A to Z ", async () => {

        await shopPage.filterDropdown.selectOption('az');

    });

    await test.step("THEN: The Inventory products should be filtered by Name Z to A", async () => {

        await expect(shopPage.firstInventoryItem).toContainText('Sauce Labs Backpack')

    });
});