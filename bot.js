const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const VIDEO_URL = "https://www.tiktok.com/@orbanixyt/video/7658018871298788641";

async function main() {
    console.log("🚀 Bot gestart op Render...");

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    let count = 0;
    const max = 20; // max views per run (Render gratis is beperkt)

    while (count < max) {
        try {
            console.log(`View ${count + 1}/${max}`);
            await page.goto(VIDEO_URL, { waitUntil: 'networkidle2' });
            await page.waitForTimeout(12000 + Math.random() * 8000); // 12-20 seconden
            count++;
        } catch (e) {
            console.log("Error, skipping...");
        }
    }

    await browser.close();
    console.log("Klaar met views. Process eindigt.");
    
    // Render blijft draaien, dus we houden het proces levend
    setInterval(() => {}, 1000 * 60 * 60); 
}

main().catch(console.error);
