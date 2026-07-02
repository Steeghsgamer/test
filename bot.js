const puppeteer = require('puppeteer');

const VIDEO_URL = "https://www.tiktok.com/@orbanixyt/video/7658018871298788641";

async function main() {
    console.log("🚀 TikTok Bot gestart...");

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    let count = 0;
    const maxViews = 5;

    while (count < maxViews) {
        try {
            console.log(`View ${count + 1}/${maxViews}`);
            await page.goto(VIDEO_URL, { waitUntil: 'networkidle2', timeout: 30000 });
            await page.waitForTimeout(15000);
            count++;
        } catch (e) {
            console.log("Fout...");
        }
    }

    console.log("Klaar!");
    await browser.close();
}

main().catch(e => console.error(e));
