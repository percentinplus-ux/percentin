// Smooth scrolling for navigation links
window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#main-nav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#main-nav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Animated counter for the rating score
    const ratingScore = document.getElementById('rating-score');

    const animateCounter = (element) => {
        const target = parseFloat(element.dataset.target);
        const duration = 1500; // 1.5 seconds
        const frameRate = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;
        
        const countUp = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const currentValue = progress * target;
            
            // Format to 2 decimal places
            element.textContent = currentValue.toFixed(2);

            if (currentFrame < totalFrames) {
                requestAnimationFrame(countUp);
            } else {
                element.textContent = target.toFixed(2);
            }
        };
        
        requestAnimationFrame(countUp);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    if (ratingScore) {
        observer.observe(ratingScore);
    }

    // Magic Line for navigation
    const navList = document.querySelector('.navbar-nav');

    function updateMagicLine() {
        const activeItem = navList.querySelector('.nav-link.active');
        if (activeItem) {
            const navListRect = navList.getBoundingClientRect();
            const activeItemRect = activeItem.getBoundingClientRect();
            
            const offsetLeft = activeItemRect.left - navListRect.left;
            const width = activeItemRect.width;
            
            navList.style.setProperty('--magic-line-left', `${offsetLeft}px`);
            navList.style.setProperty('--magic-line-width', `${width}px`);
        }
    }

    // Update the line on scrollspy activation and window resize
    window.addEventListener('activate.bs.scrollspy', function() {
        // A short delay to ensure the .active class is fully applied
        setTimeout(updateMagicLine, 10);
    });
    window.addEventListener('resize', updateMagicLine);

    // Initial call after a short delay to ensure fonts and layout are settled
    setTimeout(updateMagicLine, 200);

});
