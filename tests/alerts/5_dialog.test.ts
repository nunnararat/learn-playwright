import { Browser, BrowserContext, chromium, ElementHandle, Page } from "playwright"

describe("Learn how to handle alert", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto("https://letcode.in/alert")
    })

    // ทำการทดสอบเกี่ยวกับการจัดการกับ dialog บนหน้าเว็บ ในที่นี้เรากำหนดว่าเมื่อ dialog ปรากฏขึ้น โปรแกรมควรทำอะไรต่อ ในที่นี้คือการ accept dialog ด้วย dialog.accept() และพิมพ์ข้อความ "hello koushik" ใน dialog ด้วย
    test("Handle dialogs", async () => {
        const ele = await page.$("#prompt");                            // เรียกใช้ page.$() เพื่อค้นหา element บนหน้าเว็บที่มี id เป็น "prompt" ซึ่งเป็น element ที่ใช้สร้าง dialog
        
        // ตั้งค่า event listener เพื่อรับ dialog ทุกครั้งที่มีการแสดงขึ้นบนหน้าเว็บ ซึ่งในที่นี้เราใช้ dialog.accept() เพื่อยอมรับ dialog ทันทีที่มันปรากฏขึ้น
        page.on("dialog", (dialog) => {                                 // กำหนดการทำงานของ event listener เมื่อมีการแสดง dialog บนหน้าเว็บ              
            console.log('Message: ' + dialog.message());                // แสดงข้อความที่ปรากฏบน dialog
            console.log('Default Value: ' + dialog.defaultValue());     // แสดงค่าเริ่มต้นที่กำหนดใน dialog 
            console.log('Type: ' + dialog.type());                      // แสดงประเภทของ dialog
            dialog.accept("hello koushik");                             // ทำการยอมรับ dialog โดยการกดปุ่มตกลง และส่งข้อความ "hello koushik" ไปยัง dialog
            // dialog.dismiss()
        })
        
        await ele?.click();         // คำสั่งนี้เป็นการคลิกที่ element ที่ถูกเลือก (ele) หากมีอยู่ ซึ่งในที่นี้เป็นการคลิกที่ element ที่มี id เป็น "prompt" ซึ่งจะทำให้ dialog ปรากฏบนหน้าเว็บ ซึ่งในที่นี้ dialog จะถูกยอมรับโดยอัตโนมัติ โดยไม่ต้องรอให้ผู้ใช้ประกาศค่าได้ทำการคลิกเอง ซึ่งจะทำให้การทดสอบเกิดขึ้นโดยอัตโนมัติโดยไม่ต้องรอผู้ใช้กระทำอะไรเพิ่มเติม
    })

    afterAll(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})