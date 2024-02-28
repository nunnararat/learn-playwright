import { Browser, BrowserContext, Page, chromium } from "playwright";

describe("Frames handling concept", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto("https://letcode.in/frame")
    })
    test("Interact with frames", async () => {
        const frame = page.frame({ name: "firstFr" });
        // frame?.fill("")
        if (frame != null) {
            await frame.fill("input[name='fname']", "Koushik");
            await frame.fill("input[name='lname']", "Chatterjee");

            // inner frame
            const frames = frame.childFrames();
            console.log('No. of inner frames: ' + frames.length);
            if (frames != null)
                await frames[0].fill("input[name='email']", "koushik@mail.com")
            else {
                console.log("Wrong frame");
            }
            const parent = frames[0].parentFrame()
            // await frame.fill("input[name='lname']", "Letcode");
            await parent?.fill("input[name='lname']", "Youtube");
        } else throw new Error("No such frame")
    })
})





// โค้ดด้านบนเป็นการทดสอบการจัดการกับ frame ในหน้าเว็บของเว็บไซต์ https://letcode.in/frame โดยมีขั้นตอนดังนี้:

// เปิด Browser, Context และ Page: เริ่มต้นโดยการเปิดบราวเซอร์ Chromium และเรียกใช้งาน context และ page ใหม่
// ไปที่หน้าเว็บ: เรียกใช้ page.goto() เพื่อไปที่ URL ของหน้าเว็บที่ต้องการทดสอบ
// จัดการกับ Frame: ในที่นี้เราใช้ page.frame() เพื่อเลือก frame ที่ต้องการจะทำงาน
// กรอกข้อมูลใน Frame: เรากรอกข้อมูลในฟอร์มภายใน frame โดยใช้ frame.fill() เพื่อกรอกข้อมูลลงในช่อง input ต่าง ๆ
// จัดการกับ Inner Frame: เรากำลังจะทดสอบการจัดการกับ inner frame ใน frame นี้ โดยใช้ frame.childFrames() เพื่อดึง inner frames ทั้งหมดและกรอกข้อมูลในฟอร์มภายใน inner frame
// สลับกลับไปยัง Parent Frame: เราใช้ frame.parentFrame() เพื่อเข้าถึง parent frame และกรอกข้อมูลในฟอร์มภายใน parent frame

// ในกรณีที่ไม่พบ frame ที่เราต้องการทำงาน โค้ดจะ throw Error ออกมาแสดงว่าไม่พบ frame นั้นๆ ซึ่งจะช่วยในการตรวจสอบและแก้ไขปัญหาในการทดสอบได้ในขั้นตอนถัดไป