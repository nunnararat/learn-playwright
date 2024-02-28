import { chromium } from "playwright";

describe('Launch Browser', () => {

    const filePath0 = '../videos/a.webm';
    const filePath1 = '../videos/b.webm';

    xtest('upload file using set input files', async () => {
        const browser = await chromium.launch({
            headless: false
        })
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.sendgb.com/', { timeout: 180000 });
        // await page.setInputFiles("input[name='qqfile']", filePath0);        // upload 1 file
        await page.setInputFiles("input[name='qqfile']", [filePath0, filePath1]);        // upload multiple file
        await context.close()
        await browser.close()
    })
    
    test('upload file using on function', async () => {
        const browser = await chromium.launch({
            headless: false
        })
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/upload');
        page.on("filechooser", async (filechooser) => {
            // await filechooser.isMultiple();
            await filechooser.setFiles([filePath0, filePath1])
        })
        await page.click("#drag-drop-upload", {force: true})

        // // ถ้าเปิด comment .close  =>filechooser จะไม่สามารถทำงานได้ ????? แอบงงนะคะ แปะไว้ก่อน
        // await context.close()
        // await browser.close()
    })
}) 