import { Browser, BrowserContext, Page, chromium, firefox } from "playwright";

describe("Launch local browser", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    beforeAll(async () => {
        browser = await firefox.launch({
            headless: false,
            // channel: "msedge"               // channel: "chrome"
            // executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
        });
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto("https://letcode.in/")
    })
    test("Goto letcode and verify title as LetCode with Koushik", async () => {
        const title = await page.title();
        console.log(title);
        expect(title).toBe("LetCode with Koushik")
    })

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close()
    })
})






// โค้ดด้านบนเป็นการทดสอบการเปิดบราวเซอร์ด้วย Playwright โดยใช้ Firefox โดยมีขั้นตอนดังนี้:

// เปิด Browser, Context, และ Page: เริ่มต้นโดยการเปิดบราวเซอร์ Firefox และสร้าง context และ page ใหม่ขึ้นมา.
// ไปที่หน้าเว็บ: ใช้ page.goto() เพื่อเข้าสู่หน้าเว็บที่ต้องการทดสอบ (ในที่นี้คือ https://letcode.in/)
// ตรวจสอบชื่อเว็บ: ใช้ page.title() เพื่อดึงชื่อของหน้าเว็บที่เปิดอยู่ และใช้ expect() เพื่อตรวจสอบว่าชื่อเว็บถูกต้องตามที่คาดหวังหรือไม่
// โค้ดที่ใช้เปิด Firefox ในโหมด headless: false ซึ่งหมายความว่า Firefox จะถูกเปิดในโหมด UI แทนที่จะเปิดในโหมด headless (ไม่มี UI) ในการทดสอบนี้ เว็บไซต์ https://letcode.in/ ถูกเปิดและชื่อเว็บถูกตรวจสอบว่าเป็น "LetCode with Koushik" ตามที่คาดหวังไว้ในการทดสอบนี้



