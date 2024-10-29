const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    darkModeToggle.innerHTML = body.dataset.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', body.dataset.theme);
});


const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.dataset.theme = savedTheme;
}

// Accordion Functionality
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('h3');
    header.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.accordion-item.active');
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        item.classList.toggle('active');
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
});

// Form Validation (Bonus Feature)
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-heading">Start Your Franchise Journey</h2>
            <form id="franchiseForm">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email" required>
                <input type="tel" placeholder="Phone Number" required>
                <input type="text" placeholder="City" required>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
});

// (Bonus Feature)
const logoItems = document.querySelectorAll('.logo-item');
logoItems.forEach(logo => {
logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'scale(1.1) rotate(2deg)';
});

logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'scale(1) rotate(0deg)';
});
});

// Custom Modal Styles 
const styleSheet = document.createElement('style');
styleSheet.textContent = `
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    animation: modalSlideIn 0.3s ease;
}

.modal-content h2 {
    margin-bottom: 15px;
}

.modal-content form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.modal-content input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.modal-content button {
    background: var(--button-color);
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.modal-content button:hover {
    background: #e99503;
}

@keyframes modalSlideIn {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
`;
document.head.appendChild(styleSheet);

// Form Submission Handler
document.addEventListener('submit', (e) => {
if (e.target.id === 'franchiseForm') {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const submitButton = e.target.querySelector('button');
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    setTimeout(() => {
        e.target.innerHTML = `
            <div style="text-align: center; color: green;">
                <i class="fas fa-check-circle" style="font-size: 48px; margin: 12px"></i>
                <h3 style="margin: 10px">Thank you for your interest!</h3>
                <p>We'll contact you shortly.</p>
            </div>
        `;
        
        setTimeout(() => {
            document.querySelector('.modal').remove();
        }, 3000);
    }, 1500);
}
});

// (Bonus Feature)
const statsElements = document.querySelectorAll('.count');
let hasAnimated = false;

function animateStats() {
statsElements.forEach(stat => {
    const targetValue = parseInt(stat.textContent);
    let currentValue = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);

    function updateValue() {
        if (currentValue < targetValue) {
            currentValue += increment;
            if (currentValue > targetValue) currentValue = targetValue;
            stat.textContent = Math.round(currentValue).toLocaleString() + 
                (stat.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateValue);
        }
    }

    updateValue();
});
}

const statsSection = document.querySelector('.network');
const statsSectionObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
        animateStats();
        hasAnimated = true;
    }
});
}, { threshold: 0.5 });

statsSectionObserver.observe(statsSection);

document.querySelectorAll('button, a').forEach(element => {
if (!element.getAttribute('aria-label')) {
    const text = element.textContent.trim();
    if (text) {
        element.setAttribute('aria-label', text);
    }
}
});

window.addEventListener('load', () => {
setTimeout(() => {
    document.body.classList.add('loaded');
}, 100);
});

window.addEventListener('error', (e) => {
console.error('An error occurred:', e.message);
});