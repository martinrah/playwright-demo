const { test, expect } = require('@playwright/test');

exports.swagLabs = class swagLabs {

    constructor(page) {

        this.page = page
        this.productsTitle = page.locator('[data-test="title"]');
        this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.shoppingCartList = page.locator('[data-test="cart-list"]');
        this.logOutButton = page.locator('[data-test="logout-sidebar-link"]');
        this.sideMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.firstInventoryItem = page.locator('[data-test="inventory-item"]').nth(0);
        this.filterDropdown = page.locator('[data-test="product-sort-container"]')
    }

    async openSwagShop() {

        await this.page.goto("https://www.saucedemo.com/inventory.html");
        await this.page.waitForLoadState("networkidle");
    }
};

