import { chromium } from "playwright";
// import { test, expect } from '@playwright/test';

describe('Launch Browser', () => {

    xtest('Open letcode', async () => {
        const browser = await chromium.launch({
            headless: false
        })
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://letcode.in/');
        await page.click("text=Log in");
        await page.fill("input[name='email']", 'koushik350@gmail.com');
        await page.fill("input[name='password']", 'Pass123$');
        // await page.click('button:text("LOGIN")');
        await page.click("//button[contains(text(),'LOGIN')]");
        // await page.click('"Sign out"')
        // await page.click("text=Sign out")    // ช้ามาก
        await page.click("//a[contains(text(),'Sign out')]")
        await context.close()
        await browser.close()
    })

    test('Recoed Script | Codeless Automation With PlayWright | Record Video', async () => {
        const browser = await chromium.launch({
            headless: false
        })
        const context = await browser.newContext({
            recordVideo:{
                dir: "./videos/",
                size: {
                    width:800,
                    height: 600
                }
            }
        });
        const page = await context.newPage();
        await page.goto('https://letcode.in/');
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.getByRole('textbox', { name: 'Enter registered email' }).click();
        await page.getByRole('textbox', { name: 'Enter registered email' }).fill('koushik350@gmail.com');
        await page.getByRole('textbox', { name: 'Enter registered email' }).press('Tab');
        await page.getByPlaceholder('Enter password').fill('Pass123$');
        await page.getByRole('button', { name: 'LOGIN' }).click();
        await page.getByRole('link', { name: 'Work-Space' }).click();
        await page.getByRole('link', { name: 'All in One' }).click();
        await page.locator('#firstname').click();
        await page.locator('#firstname').fill('nana');
        await page.locator('#firstname').press('Tab');
        await page.locator('#lasttname').fill('nana');
        await page.getByPlaceholder('Email input').click();
        await page.getByPlaceholder('Email input').fill('hello@gmail.com');
        await page.getByPlaceholder('Email input').press('Tab');
        await page.locator('form div').filter({ hasText: 'EmailCountry codeUSA (+1)UK' }).getByRole('combobox').selectOption('66');
        await page.getByPlaceholder('Phone Number').click();
        await page.getByPlaceholder('Phone Number').fill('9999999999');
        await page.getByPlaceholder('Phone Number').press('Tab');
        await page.getByPlaceholder('Address Line-1').fill('123');
        await page.getByPlaceholder('Address Line-1').press('Tab');
        await page.getByPlaceholder('Address Line-2').fill('aaa');
        await page.getByPlaceholder('Address Line-2').press('Tab');
        await page.getByPlaceholder('State').fill('nakhonpathom');
        await page.getByPlaceholder('State').press('Tab');
        await page.getByPlaceholder('Postal-Code').fill('73000');
        await page.locator('form div').filter({ hasText: 'Postal-CodeCountryAfghanistan' }).getByRole('combobox').selectOption('Thailand');
        await page.locator('#Date').fill('1999-01-13');
        await page.getByLabel('Female').check();
        await page.getByLabel('I agree to the terms and').check();
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('link', { name: 'Sign out' }).click();
        await context.close()
        await browser.close()
    });


})