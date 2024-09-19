const { test, expect } = require('@playwright/test');

test.describe.parallel("API testing", () => {
    const baseURL = "https://reqres.in/api"

    test("API Test - Assert Response Status", async ({ request }) => {

        const response = await request.get(baseURL + "/users/3");
        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test("API Test - Assert Invalid Endpoint", async ({ request }) => {

        const response = await request.get(baseURL + "/users/non-existing-endpoint");
        expect(response.status()).toBe(404);
    })

    test("GET Request - Get User Detail", async ({ request }) => {

        const response = await request.get(baseURL + "/users/1");
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.first_name).toBe('George');
        expect(responseBody.data.last_name).toContain('Blu');
        expect(responseBody.data.email).toBeTruthy();

        console.log(responseBody);
    })

    test("POST Request - Create New User", async ({ request }) => {

        const response = await request.post(baseURL + "/users", {
            data: {
                id: 1000,
            }
        });

        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);

        expect(responseBody.id).toBe(1000);
        expect(responseBody.createdAt).toBeTruthy();

    })

    test("POST Request - Login", async ({ request }) => {

        const response = await request.post(baseURL + "/login", {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            }
        });
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.token).toBeTruthy();
    })

    test("POST Request - Login Fail", async ({ request }) => {

        const response = await request.post(baseURL + "/login", {
            data: {
                email: 'eve.holt@reqres.in',

            }
        });
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(400);
        expect(responseBody.error).toBe('Missing password');
    })

    test("PUT Request - Update User", async ({ request }) => {

        const response = await request.put(baseURL + "/users/2", {
            data: {
                name: 'Phil',
                job: 'singer',

            }
        });
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.name).toBe('Phil');
        expect(responseBody.job).toBe('singer');
        expect(responseBody.updatedAt).toBeTruthy();
    })

    test("DELETE Request - Delete User", async ({ request }) => {

        const response = await request.delete(baseURL + "/users/2")

        expect(response.status()).toBe(204);

    })
})