const { test, expect } = require('@playwright/test');

exports.swagLabs = class swagLabs {

    constructor(page) {

        this.page = page
        this.productsTitle = page.locator('[data-test="title"]');


    }

    async openSwagShop() {

        await this.page.goto("https://www.saucedemo.com/inventory.html");
        await this.page.waitForLoadState("networkidle");
    }
};

