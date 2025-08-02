/**
 * Navigation functionality for all pages
 * Handles mobile menu, language switching, and active link highlighting
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backToTopButton = document.getElementById('back-to-top');
    const langToggle = document.getElementById('lang-toggle');
    const currentLangSpan = document.getElementById('current-lang');
    
    // Initialize language from localStorage or default to 'en'
    let currentLang = localStorage.getItem('language') || 'en';
    
    // Initialize page
    initNavigation();
    setupBackToTop();
    setupLanguageToggle();
    updateActiveLink();
    
    // Initialize language
    if (typeof applyLanguage === 'function') {
        applyLanguage(currentLang);
    }
    updateLanguageButton(currentLang);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Handle scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    // Navigation initialization
    function initNavigation() {
        if (hamburger && navLinks) {
            // Toggle mobile menu
            hamburger.addEventListener('click', toggleMobileMenu);
            
            // Close menu when clicking on a link
            const navItems = document.querySelectorAll('.nav-links a');
            navItems.forEach(item => {
                item.addEventListener('click', closeMobileMenu);
            });
        }
    }
    
    // Toggle mobile menu
    function toggleMobileMenu(e) {
        if (e) e.stopPropagation();
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        // Toggle hamburger icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Handle click outside menu to close it
    function handleOutsideClick(e) {
        if (navLinks && hamburger && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target) && 
            navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    }
    
    // Handle window resize
    function handleResize() {
        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    }
    
    // Handle scroll events
    function handleScroll() {
        // Show/hide back to top button
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
        
        // Update active link based on scroll position
        updateActiveLink();
    }
    
    // Back to top functionality
    function setupBackToTop() {
        if (backToTopButton) {
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Language toggle functionality
    function setupLanguageToggle() {
        if (langToggle && currentLangSpan) {
            langToggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleLanguage();
            });
        }
    }
    
    // Toggle between languages
    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('language', currentLang);
        
        if (typeof applyLanguage === 'function') {
            applyLanguage(currentLang);
        }
        
        updateLanguageButton(currentLang);
        
        // Update RTL/LTR
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    }
    
    // Update language button text
    function updateLanguageButton(lang) {
        if (currentLangSpan) {
            currentLangSpan.textContent = lang === 'en' ? 'عربي' : 'EN';
        }
    }
    
    // Update active navigation link based on current page
    function updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage.includes('consultations') && href.includes('consultations'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});
