import { Browser, BrowserContext, chromium, ElementHandle, Page } from "playwright"

describe("Learn how to handle input fields", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto("https://letcode.in/edit")
    })

    test("Enter your full Name", async () => {

        // // // Do 1 use type function
        // await page.type("#fullName", "Koushik Chatterjee")
        
        // // // Do 2 use function
        const name = await page.$("#fullName")      // ใช้ในการค้นหา HTML element ที่มี id เป็น "fullName" บนหน้าเว็บ
        // if (name != null) {                         //เป็นการตรวจสอบว่า element ที่ค้นหาได้ไม่ใช่ null หรือไม่ ซึ่งหมายความว่า element นั้นมีอยู่จริงในหน้าเว็บ
        //     name.type("")
        // }
        
        // ใช้ฟังก์ชัน .type() เพื่อป้อนข้อมูล "koushik chatterjee" ลงในช่องกรอกชื่อเต็ม 
        // ?. เป็นการตรวจสอบว่าตัวแปร name ไม่ใช่ null ก่อนที่จะเรียกเมท็อด .type() อย่างปกติ เพื่อป้องกันการเกิดข้อผิดพลาดเมื่อ name เป็น null
        await name?.type("koushik chatterjee")  
    })
    
    test("Append a text and press keyboard tab", async () => {
        const join = await page.$("#join")
        // await join?.fill(" Human")           // พิมพ์แทนที่ข้อความเดิม

        await join?.focus();
        await page.keyboard.press("End")        // ฟังก์ชัน .press() ใน page.keyboard ถูกใช้เพื่อกดปุ่ม "End" บนคีย์บอร์ด ซึ่งจะเลื่อนเคอร์เซอร์ไปที่จุดสุดท้ายของข้อความในช่องข้อความ
        await join?.type(" Human")              // พิมพ์ต่อท้ายจากข้อความเดิม
    })

    test("What is inside the text box", async () => {
        const text = await page.getAttribute("id=getMe", "value");          // ดึงค่าของ attribute ที่ชื่อ "value" จาก element ที่มี id เป็น "getMe" 
        console.log(text);
    })

    test("Clear the text", async () => {
        await page.fill("//input[@value='Koushik Chatterjee']", "")         // คำสั่ง page.fill() ถูกใช้เพื่อลบข้อความที่อยู่ในช่องข้อความ โดยระบุ XPath ของ element input ที่มี attribute value เป็น "Koushik Chatterjee" และใส่ข้อความเป็นสตริงว่างเข้าไป ซึ่งจะลบข้อความที่อยู่ในช่องข้อความนั้นทิ้งไป
    })

    afterAll(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})