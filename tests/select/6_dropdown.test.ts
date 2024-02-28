import { Browser, BrowserContext, Page, chromium } from "playwright";

describe("How to handle Select", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto("https://letcode.in/dropdowns")
    })
    test("Select a dropdown based on value", async () => {
        const fruits = await page.$("#fruits");
        // await fruits?.selectOption({ label: "" });
        await fruits?.selectOption("0");                                // เมื่อเราได้รับ element ของ dropdown เราใช้ .selectOption() เพื่อเลือกตัวเลือกที่มีค่าเป็น "0" ใน dropdown นั้น
        const msg = await page.$("div.notification.is-success");        // ค้นหา element ที่มีคลาส CSS เป็น "notification" และ "is-success" ซึ่งจะเป็น element ที่แสดงข้อความเมื่อการดำเนินการเสร็จสมบูรณ์
        if (msg) {
            expect(await msg.textContent()).toContain("Apple");         // ในส่วนนี้เราใช้ expect() เพื่อตรวจสอบว่าข้อความที่ปรากฏบน element msg มีคำว่า "Apple" หรือไม่ โดยใช้ toContain() เป็นเงื่อนไขของการตรวจสอบ ถ้าข้อความใน msg มี "Apple" ก็จะถือว่าการทดสอบผ่าน และถ้าไม่มีก็จะถือว่าการทดสอบล้มเหลว
        }
    })

    // Test การเลือกตัวเลือกมากกว่าหนึ่งตัว (Select multiple):
    test("Select multiple", async () => {
        const heros = await page.$("#superheros");
        heros?.selectOption([                                           // เราใช้ .selectOption() เพื่อเลือกตัวเลือกใน dropdown โดยระบุตัวเลือกที่เราต้องการเลือก ในที่นี้เราเลือกตัวเลือกด้วย label, value และ index
            { label: "Aquaman" }, { value: "bt" }, { index: 8 }
        ])
    })

    // Test นับจำนวนตัวเลือกใน dropdown (Count of the select):
    test("Count of the select", async () => {
        const lang = await page.$$("#lang option")
        console.log(lang.length);
    })

    // Test ดึงข้อความของตัวเลือกที่ถูกเลือก (get selected text):
    test("get selected text", async () => {
        // await page.selectOption("#country", { index: 6 });
        await page.selectOption("#country", "India");                                               // เลือกตัวเลือกที่มีค่าเป็น "India" ใน dropdown ที่มี id เป็น "country"
        const text = await page.$eval<string, HTMLSelectElement>("#country", ele => ele.value)      // ใช้ page.$eval() เพื่อดึงข้อความของตัวเลือกที่ถูกเลือกออกมา โดยใช้ ele.value เพื่อดึงค่า value ของ element dropdown
        
        // // เราใช้ console.log() เพื่อแสดงค่าที่ได้ใน console เพื่อทำการตรวจสอบและ debug 
        // // หลังจากนั้นเราใช้ expect() เพื่อตรวจสอบว่าข้อความที่ได้นั้นเป็น "India" ตามที่เรากำหนดไว้ในการทดสอบ
        console.log(text);             
        expect(text).toBe("India");
    })

    afterAll(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})