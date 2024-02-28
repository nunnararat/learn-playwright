import { Browser, BrowserContext, Page, chromium } from "playwright";

describe("Window handling", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto("https://letcode.in/windows")
    })

    test("Home Page", async () => {
        console.log(await page.title());                                    // เราใช้ page.title() เพื่อดึงชื่อของหน้าเว็บ (title) และแสดงผลใน console
        expect(await page.title()).toBe("Window handling - LetCode");       // เราใช้ expect() เพื่อตรวจสอบว่าชื่อของหน้าเว็บตรงกับที่เราคาดหวังหรือไม่
    })

    
    
    xtest("Single page handling", async () => {
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),               // รอเหตุการณ์ใหม่เกิดขึ้น (ในที่นี้คือการเปิดหน้าใหม่) และรับ page ใหม่เมื่อมีการคลิกที่ element ที่มี id เป็น "home"
            await page.click("#home")
        ])
        await newWindow.waitForLoadState();             // รอให้หน้าใหม่โหลดเสร็จสมบูรณ์
        expect(newWindow.url()).toContain("test");      // เราใช้ expect() เพื่อตรวจสอบว่า URL ของหน้าใหม่มี "test" อยู่ใน URL หรือไม่
        await newWindow.click("//a[contains(text(),'Log in')]");
        // await newWindow.waitForNavigation();                
        await newWindow.waitForLoadState();   
        expect(newWindow.url()).toContain("signin");
        // await newWindow.close();             // ปิดแท็บ
        await page.bringToFront();              // เปลี่ยนแท็บที่แสดง 
        await page.click("//img[@alt='letcode']");
        await page.click("//a[contains(text(),'LetXPath')]");

    })

    test("Multipage handling", async () => {
        // เราใช้ Promise.all() เพื่อรอการเกิดเหตุการณ์หลายๆ เหตุการณ์พร้อมกัน  โดยมีเหตุการณ์แรกคือการรอให้เกิดการเปิดหน้าใหม่ใน context นั้นๆ 
        const [multipage] = await Promise.all([
            // โดยใช้ context.waitForEvent("page") 
            // และเหตุการณ์ที่สองคือการคลิกที่ element ที่มี id เป็น "multi" ด้วย page.click("#multi") ซึ่งทั้งสองนี้จะทำงานพร้อมกันโดยไม่รอกัน
            context.waitForEvent("page"),                
            await page.click("#multi")
        ])
        await multipage.waitForLoadState();                     // รอให้หน้าใหม่โหลดเสร็จสมบูรณ์
        const allwindows = page.context().pages();              // ดึงรายการของหน้าทั้งหมดใน context ปัจจุบัน
        console.log("no.of windows: " + allwindows.length);     // แสดงจำนวนของหน้าต่างทั้งหมดที่เปิดอยู่ในเบราว์เซอร์

        // วนลูปผ่านทุกๆ หน้าและแสดง URL ของแต่ละหน้าใน console
        allwindows.forEach(page => {                    
            console.log(page.url());
        });
        // allwindows.forEach((page, index) => {
        //     console.log(`Window ${index + 1} URL: ${page.url()}`);
        // });
        await allwindows[1].bringToFront();             // เราใช้ allwindows[1].bringToFront() เพื่อเปลี่ยนการเรียงลำดับให้หน้านั้นมาอยู่ด้านหน้า
       
        // เมื่อหน้านั้นอยู่ด้านหน้าแล้ว เราใช้ on("dialog") เพื่อจับเหตุการณ์เมื่อ dialog ปรากฏขึ้น และใช้ dialog.accept() เพื่อยอมรับ dialog นั้นๆ
        allwindows[1].on("dialog", (dialog) => {        
            console.log('Message: ' + dialog.message());
            dialog.accept();
        })
        await allwindows[1].click("id=accept")          // เราคลิกที่ element ที่มี id เป็น "accept" บนหน้านั้นๆ ซึ่งอาจเป็นการยอมรับการกระทำหรือการยืนยันใดๆ ที่ปรากฏบนหน้านั้นๆ

    })
    afterAll(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})



    // Home Page Test:

    // ทดสอบการแสดงหน้าเว็บหลักโดยการตรวจสอบชื่อของหน้าเว็บว่าตรงกับที่คาดหวังหรือไม่


    // Single Page Handling Test:
    // ทดสอบการจัดการหน้าเว็บหนึ่งเมื่อคลิกที่ปุ่ม "home" และเปิดหน้าเว็บใหม่
    // รอให้หน้าใหม่โหลดเสร็จสมบูรณ์
    // ตรวจสอบ URL ของหน้าใหม่เพื่อดูว่ามีคำว่า "test" อยู่ใน URL หรือไม่
    // คลิกที่ปุ่ม "Log in" บนหน้าใหม่
    // รอให้มีการเปลี่ยนเพจเมื่อคลิกที่ปุ่ม "Log in"
    // ตรวจสอบ URL ใหม่อีกครั้งว่ามีคำว่า "signin" อยู่ใน URL หรือไม่
    // ส่งเสียงเรียกหน้าเดิมมาด้านหน้าอีกครั้ง
    // คลิกที่ปุ่ม "LetXPath" บนหน้าเดิม




    // Multipage Handling Test:
    // ทดสอบการจัดการหน้าเว็บหลายหน้าเมื่อคลิกที่ปุ่ม "multi" เพื่อเปิดหน้าเว็บใหม่
    // รอให้หน้าใหม่โหลดเสร็จสมบูรณ์
    // ดึงรายการหน้าทั้งหมดใน context ปัจจุบันและแสดงจำนวนหน้าทั้งหมดที่เปิดอยู่ในเบราว์เซอร์
    // วนลูปผ่านทุกๆ หน้าและแสดง URL ของแต่ละหน้า
    // ส่งหน้าที่สองมาด้านหน้า
    // รอการปรากฏของ dialog และยอมรับ dialog นั้น
    // คลิกที่ปุ่ม "accept" บนหน้าที่สอง 
