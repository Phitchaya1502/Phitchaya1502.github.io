const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Listen for console errors
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    page.on('pageerror', error => {
        errors.push(error.message);
    });

    try {
        // Navigate to the file
        await page.goto('file:///workspace/index.html', { waitUntil: 'networkidle' });

        // Wait for content to load
        await page.waitForTimeout(2000);

        // Check if key elements exist
        const heroName = await page.$('.hero-name');
        const aboutSection = await page.$('#about');
        const educationSection = await page.$('#education');
        const skillsSection = await page.$('#skills');
        const projectsSection = await page.$('#projects');
        const footer = await page.$('footer');

        console.log('=== Resume Website Test Results ===');
        console.log('Page loaded successfully: YES');
        console.log('Hero section found:', heroName ? 'YES' : 'NO');
        console.log('About section found:', aboutSection ? 'YES' : 'NO');
        console.log('Education section found:', educationSection ? 'YES' : 'NO');
        console.log('Skills section found:', skillsSection ? 'YES' : 'NO');
        console.log('Projects section found:', projectsSection ? 'YES' : 'NO');
        console.log('Footer found:', footer ? 'YES' : 'NO');

        if (errors.length > 0) {
            console.log('\nConsole Errors:');
            errors.forEach(err => console.log('  -', err));
        } else {
            console.log('\nNo console errors detected!');
        }

        console.log('\n=== Test Complete ===');

    } catch (error) {
        console.error('Test failed:', error.message);
    } finally {
        await browser.close();
    }
})();