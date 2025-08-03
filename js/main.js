// تفعيل الريسبونسيف للنافبار
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarToggler.classList.toggle('active');
            navbarCollapse.classList.toggle('show');
            
            // منع التمرير عند فتح القائمة
            if (navbarCollapse.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // إغلاق القائمة عند النقر على الروابط
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggler.classList.remove('active');
                navbarCollapse.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target) && navbarCollapse.classList.contains('show')) {
                navbarToggler.classList.remove('active');
                navbarCollapse.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
});