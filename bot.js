const puppeteer = require('puppeteer');

const VIDEO_URL = "https://www.tiktok.com/@orbanixyt/video/7658018871298788641";

async function main() {
    console.log("🚀 TikTok Bot gestart op Render...");

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    });

    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36');

    let count = 0;
    const maxViews = 8;   // Houd laag

    while (count < maxViews) {
        try {
            console.log(`📹 View ${count + 1}/${maxViews}`);
            await page.goto(VIDEO_URL, { waitUntil: 'networkidle2', timeout: 60000 });
            await page.waitForTimeout(12000 + Math.random() * 10000);
            count++;
        } catch (err) {
            console.log("Fout bij view...");
        }
    }

    console.log(`✅ Klaar met ${count} views.`);
    await browser.close();

    setInterval(() => {}, 3600000);
}

main().catch(err => console.error("Error:", err.message));
