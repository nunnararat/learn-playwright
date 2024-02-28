import { Browser, BrowserContext, Page, chromium } from "playwright";

describe("Search Git Repo", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto("https://letcode.in/elements")
    })

    test("Enter Git username", async () => {

        const header = await page.$("nav[role='navigation']")
        header?.screenshot({ path: "header.png" })
        const ele = await page.$("input[name='username']")
        await ele?.fill("ortonikc");
        await ele?.press("Enter");
    })
    test("Print all the repos", async () => {
        await page.waitForSelector("app-gitrepos ol li", { timeout: 5000 })
        const repos = await page.$$("app-gitrepos ol li");
        console.log(repos.length);
        // for await 
        // for await (const repo of repos) {
        //     console.log(await repo.innerText());
        // }
        // map
        const allUrls = await Promise.all(repos.map(async (repo, i) => {
            return await repo.innerText()
        }))
        console.log(allUrls);
        await page.screenshot({ path: "fs.png", fullPage: true })
    })
    afterEach(async () => {
        await page.screenshot({ path: Date.now() + 'screenshot1.png' })
    })
    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close()
    })
})







// โค้ดด้านบนเป็นการทดสอบการค้นหาชื่อผู้ใช้ GitHub และพิมพ์ชื่อผู้ใช้เข้าไปในช่องค้นหา และค้นหาโครงการ GitHub ของผู้ใช้นั้น ๆ โดยมีขั้นตอนดังนี้:

// เปิด Browser, Context และ Page: เริ่มต้นโดยการเปิดบราวเซอร์ Chromium และเรียกใช้งาน context และ page ใหม่
// ไปที่หน้าเว็บ: เรียกใช้ page.goto() เพื่อไปที่ URL ของหน้าเว็บที่ต้องการทดสอบ
// ค้นหาชื่อผู้ใช้ Git: ใช้ page.$() เพื่อค้นหา header ของเว็บไซต์และจับภาพหน้าจอ จากนั้นใช้ page.$() เพื่อค้นหาช่องข้อมูลที่ใช้ในการป้อนชื่อผู้ใช้ Git และใช้ fill() เพื่อป้อนชื่อผู้ใช้ Git และ press("Enter") เพื่อกดปุ่ม Enter เพื่อทำการค้นหา
// พิมพ์รายชื่อโครงการ: ใช้ page.waitForSelector() เพื่อรอให้รายการโครงการ Git ปรากฏบนหน้า จากนั้นใช้ page.$$() เพื่อเลือกรายการโครงการทั้งหมดและแสดงผลลัพธ์ใน console
// เก็บ URL ทั้งหมด: ใช้ Promise.all() เพื่อรอให้รายการโครงการทั้งหมดถูกโหลดและจากนั้นใช้ map() เพื่อเก็บ URL ของโครงการทั้งหมดในอาร์เรย์ allUrls
// จบและล้างทรัพยากร: ใน afterEach() เรียกใช้ page.screenshot() เพื่อบันทึกรูปภาพหน้าจอหลังจากทุกครั้งที่ทดสอบเสร็จสิ้น ใน afterAll() เรียกใช้ page.close() context.close() และ browser.close() เพื่อปิดและล้างทรัพยากรที่ใช้ในการทดสอบ
// ในการทดสอบ "Search Git Repo" มีขั้นตอนดังนี้:

// เปิด Browser, Context, และ Page: เริ่มต้นโดยการเปิดบราวเซอร์ Chromium และสร้าง context และ page ใหม่ขึ้นมา.
// ไปที่หน้าเว็บ: ใช้ page.goto() เพื่อเข้าสู่หน้าเว็บที่ต้องการทดสอบ.
// ค้นหาชื่อผู้ใช้ Git: ใช้ page.$() เพื่อค้นหา header ของเว็บไซต์และจับภาพหน้าจอ จากนั้นใช้ page.$() เพื่อค้นหาช่องข้อมูลที่ใช้ในการป้อนชื่อผู้ใช้ Git และใช้ fill() เพื่อป้อนชื่อผู้ใช้ Git และ press("Enter") เพื่อกดปุ่ม Enter เพื่อทำการค้นหา
// พิมพ์รายชื่อโครงการ: ใช้ page.waitForSelector() เพื่อรอให้รายการโครงการ Git ปรากฏบนหน้า จากนั้นใช้ page.$$() เพื่อเลือกรายการโครงการทั้งหมดและแสดงผลลัพธ์ใน console
// เก็บ URL ทั้งหมด: ใช้ Promise.all() เพื่อรอให้รายการโครงการทั้งหมดถูกโหลดและจากนั้นใช้ map() เพื่อเก็บ URL ของโครงการทั้งหมดในอาร์เรย์ allUrls
// จบและล้างทรัพยากร: ใน afterEach() เรียกใช้ page.screenshot() เพื่อบันทึกรูปภาพหน้าจอหลังจากทุกครั้งที่ทดสอบเสร็จสิ้น ใน afterAll() เรียกใช้ page.close() context.close() และ browser.close() เพื่อปิดและล้างทรัพยากรที่ใช้ในการทดสอบ