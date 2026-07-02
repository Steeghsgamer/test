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
    const maxViews = 10;   // Laag houden voor gratis tier

    while (count < maxViews) {
        try {
            console.log(`📹 View ${count + 1}/${maxViews}`);
            await page.goto(VIDEO_URL, { 
                waitUntil: 'networkidle2', 
                timeout: 45000 
            });
            
            const watchTime = 12000 + Math.random() * 12000;
            await page.waitForTimeout(watchTime);
            
            count++;
        } catch (err) {
            console.log("Fout, volgende poging...");
        }
    }

    console.log(`✅ Klaar! ${count} views geprobeerd.`);
    await browser.close();

    // Houd de service levend
    console.log("Bot blijft online...");
    setInterval(() => {}, 3600000);
}

main().catch(err => {
    console.error("Critical Error:", err);
});
