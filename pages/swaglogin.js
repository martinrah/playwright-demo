const { test, expect } = require('@playwright/test');

exports.swagLogin = class swagLogin {

    constructor(page) {

        this.page = page
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.accessError = page.locator('[data-test="error"]');


    }

    async openLoginPage() {

        await this.page.goto("https://www.saucedemo.com/");
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveTitle("Swag Labs");
    }

    async loggedIn() {

        await this.page.goto("https://www.saucedemo.com/");
        await this.page.waitForLoadState("networkidle");
        await this.username.fill('standard_user');
        await this.password.fill('secret_sauce');
        await this.loginButton.click();
    }
};