// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:imwendwadennis@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Opening your email client to send the message!');
    
    // Reset form
    this.reset();
});

// Add typing effect to hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add floating animation to skill tags
document.querySelectorAll('.skill-tag, .tech-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'floatAnimation 3s ease-in-out infinite';
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animated-bg');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Image Modal Functionality
let currentImageIndex = 0;
let imageArray = [];

function showImageModal(images) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    // If this is a new set of images, reset the index
    if (JSON.stringify(imageArray) !== JSON.stringify(images)) {
        imageArray = images;
        currentImageIndex = 0;
    } else {
        // If same images, cycle to next
        currentImageIndex = (currentImageIndex + 1) % imageArray.length;
    }
    
    modalImg.src = imageArray[currentImageIndex];
    modal.style.display = "block";
    
    // Close modal when clicking X
    document.querySelector('.close').onclick = function() {
        modal.style.display = "none";
    };
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    
    // Keyboard navigation
    document.onkeydown = function(e) {
        if (modal.style.display === "block") {
            e = e || window.event;
            if (e.keyCode == 37) { // Left arrow
                currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
                modalImg.src = imageArray[currentImageIndex];
            } else if (e.keyCode == 39) { // Right arrow
                currentImageIndex = (currentImageIndex + 1) % imageArray.length;
                modalImg.src = imageArray[currentImageIndex];
            } else if (e.keyCode == 27) { // Escape
                modal.style.display = "none";
            }
        }
    };
}

// Initialize navigation arrows
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.prev').onclick = function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
        document.getElementById('modalImage').src = imageArray[currentImageIndex];
    };
    
    document.querySelector('.next').onclick = function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % imageArray.length;
        document.getElementById('modalImage').src = imageArray[currentImageIndex];
    };
});


// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking anywhere outside
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });

        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    } else {
        console.error('Hamburger or nav-links element not found');
    }
});