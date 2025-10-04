// Script to update all HTML pages with mobile navigation
const fs = require('fs');
const path = require('path');

const mobileNavHTML = `
            <!-- Mobile Menu Button -->
            <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        </div>
        
        <!-- Mobile Navigation Menu -->
        <nav class="mobile-nav">
            <div class="mobile-nav-content">
                <a href="about.html" class="mobile-nav-link">About Us</a>
                <div class="mobile-nav-section">
                    <a href="services.html" class="mobile-nav-link mobile-nav-main">Services</a>
                    <div class="mobile-nav-submenu">
                        <a href="services.html" class="mobile-nav-sublink">Hair Services</a>
                        <a href="hair-extensions.html" class="mobile-nav-sublink">Hair Extensions</a>
                        <a href="skin-services.html" class="mobile-nav-sublink">Skin Services</a>
                        <a href="makeup-services.html" class="mobile-nav-sublink">Makeup Services</a>
                    </div>
                </div>
                <a href="stylists.html" class="mobile-nav-link">Stylist Profiles</a>
                <a href="gallery.html" class="mobile-nav-link">Gallery</a>
                <a href="contact.html" class="mobile-nav-link">Contact</a>
                <a href="https://getgorgeous.fivease.com/online/bookme" class="mobile-nav-btn" target="_blank">Book an Appointment</a>
            </div>
        </nav>`;

const mobileNavJS = `
        // Mobile menu functionality
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const body = document.body;
        
        if (mobileMenuToggle && mobileNav) {
            mobileMenuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileNav.classList.toggle('active');
                body.classList.toggle('menu-open');
            });
            
            // Close mobile menu when clicking on a link
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-sublink, .mobile-nav-btn');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    body.classList.remove('menu-open');
                });
            });
            
            // Close mobile menu when clicking outside
            mobileNav.addEventListener('click', function(e) {
                if (e.target === mobileNav) {
                    mobileMenuToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
            
            // Prevent body scroll when menu is open
            const style = document.createElement('style');
            style.textContent = \`
                body.menu-open {
                    overflow: hidden;
                }
            \`;
            document.head.appendChild(style);
        }`;

const pages = [
    'about.html',
    'contact.html', 
    'gallery.html',
    'hair-services.html',
    'hair-extensions.html',
    'skin-services.html',
    'makeup-services.html',
    'stylists.html',
    'appointment.html'
];

pages.forEach(page => {
    const filePath = path.join(__dirname, page);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add mobile nav HTML before closing header tag
        content = content.replace(
            /(\s*<\/div>\s*<\/header>)/,
            mobileNavHTML + '\n    </header>'
        );
        
        // Add mobile nav JS before closing script tag
        content = content.replace(
            /(\s*<\/script>\s*<\/body>)/,
            mobileNavJS + '\n    </script>\n</body>'
        );
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${page}`);
    } else {
        console.log(`File ${page} not found`);
    }
});

console.log('Mobile navigation update complete!');
