/* 
   Candle Making Studio - Main Functionality
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- THEME MANAGEMENT ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    let currentTheme = savedTheme;
    
    // Auto-detect system preference if no manual setting exists
    if (!savedTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if(!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if(icon) {
            icon.className = theme === 'light' ? 'bi bi-moon' : 'bi bi-sun';
        }
    }

    // --- RTL MANAGEMENT ---
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';
    
    // Apply initial direction
    document.documentElement.setAttribute('dir', currentDir);
    updateRTLIcon(currentDir);

    if(rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            let dir = document.documentElement.getAttribute('dir');
            let newDir = dir === 'ltr' ? 'rtl' : 'ltr';
            
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRTLIcon(newDir);
        });
    }

    function updateRTLIcon(dir) {
        if(!rtlToggleBtn) return;
        const icon = rtlToggleBtn.querySelector('i');
        if(icon) {
            // No need to change icon content, but we could if needed
            icon.className = 'bi bi-keyboard'; /* Representing switching script/text */
        }
    }

    // --- SCROLL REVEAL (Intersection Observer) ---
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // --- MOBILE MENU BEHAVIOR ---
    const navbarToggler = document.querySelector('.navbar-toggler');
    const offcanvas = document.getElementById('offcanvasNavbar');
    if(navbarToggler && offcanvas) {
        const originalOffcanvasParent = offcanvas.parentElement;
        const offcanvasNextSibling = offcanvas.nextSibling;
        const syncOffcanvasPlacement = () => {
            const isMobileOrTablet = window.matchMedia('(max-width: 1199.98px)').matches;

            if(isMobileOrTablet) {
                if(offcanvas.parentElement !== document.body) {
                    document.body.appendChild(offcanvas);
                }
                return;
            }

            if(offcanvas.parentElement !== originalOffcanvasParent) {
                if(offcanvasNextSibling && offcanvasNextSibling.parentNode === originalOffcanvasParent) {
                    originalOffcanvasParent.insertBefore(offcanvas, offcanvasNextSibling);
                } else {
                    originalOffcanvasParent.appendChild(offcanvas);
                }
            }
        };

        syncOffcanvasPlacement();
        window.addEventListener('resize', syncOffcanvasPlacement);
        window.addEventListener('orientationchange', syncOffcanvasPlacement);

        // Toggle from correct side per direction
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        // (Bootstrap handles this but we ensure logic is clean here if needed)
    }

    // --- WORKSHOP FILTERING (Simple Demo) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workshopCards = document.querySelectorAll('.workshop-grid .col');

    if(filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active state
                filterButtons.forEach(b => b.classList.remove('active', 'btn-studio-primary'));
                filterButtons.forEach(b => b.classList.add('btn-studio-secondary'));
                
                btn.classList.add('active', 'btn-studio-primary');
                btn.classList.remove('btn-studio-secondary');

                const filter = btn.getAttribute('data-filter');
                
                workshopCards.forEach(card => {
                    if(filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // --- PRICING TOGGLE ---
    const pricingToggle = document.getElementById('pricingToggle');
    const prices = document.querySelectorAll('.price-amount');
    
    if(pricingToggle) {
        pricingToggle.addEventListener('change', (e) => {
            const isAnnual = e.target.checked;
            prices.forEach(price => {
                const amount = parseFloat(isAnnual ? price.getAttribute('data-annual') : price.getAttribute('data-monthly'));
                // Speed-up animation
                price.innerText = amount;
            });
        });
    }

    // --- SCROLL HEADER EFFECT ---
    const header = document.querySelector('header:not(.top-bar)');
    if(header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check once on load
    }

    // --- BACK TO TOP ---
    const backToTopBtn = document.getElementById('backToTop');
    if(backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
