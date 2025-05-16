 // Mobile Menu Toggle
 const mobileMenu = document.getElementById('mobile-menu');
 const navLinks = document.getElementById('nav-links');

 mobileMenu.addEventListener('click', () => {
     navLinks.classList.toggle('active');
     mobileMenu.querySelector('i').classList.toggle('fa-bars');
     mobileMenu.querySelector('i').classList.toggle('fa-times');
 });

 // Close mobile menu when clicking on a nav link
 document.querySelectorAll('.nav-links a').forEach(link => {
     link.addEventListener('click', () => {
         navLinks.classList.remove('active');
         mobileMenu.querySelector('i').classList.add('fa-bars');
         mobileMenu.querySelector('i').classList.remove('fa-times');
     });
 });

 // Testimonial Slider
 const testimonials = document.querySelectorAll('.testimonial');
 const dots = document.querySelectorAll('.testimonial-dot');
 
 // Initialize testimonial slider
 function setActiveTestimonial(index) {
     testimonials.forEach(testimonial => testimonial.classList.remove('active'));
     dots.forEach(dot => dot.classList.remove('active'));
     
     testimonials[index].classList.add('active');
     dots[index].classList.add('active');
 }

 dots.forEach(dot => {
     dot.addEventListener('click', () => {
         const index = parseInt(dot.getAttribute('data-index'));
         setActiveTestimonial(index);
     });
 });

 // Auto rotate testimonials
 let currentTestimonial = 0;
 const testimonialAutoplay = setInterval(() => {
     currentTestimonial = (currentTestimonial + 1) % testimonials.length;
     setActiveTestimonial(currentTestimonial);
 }, 5000);

 // Back to Top Button
 const backToTopButton = document.getElementById('backToTop');
 
 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 300) {
         backToTopButton.classList.add('show');
     } else {
         backToTopButton.classList.remove('show');
     }
 });

 backToTopButton.addEventListener('click', () => {
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });

 // Form Submission
 const contactForm = document.getElementById('contactForm');
 
 contactForm.addEventListener('submit', (e) => {
     e.preventDefault();
     
     // Get form values
     const formData = new FormData(contactForm);
     const formValues = Object.fromEntries(formData);
     
     // In a real implementation, you would send this data to a server
     console.log('Form submitted with values:', formValues);
     
     // Show success message
     contactForm.innerHTML = `
         <div style="text-align: center; padding: 30px 0;">
             <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary); margin-bottom: 20px;"></i>
             <h3>Thank You!</h3>
             <p>Your message has been sent successfully. Our team will contact you shortly.</p>
         </div>
     `;
 });

 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         
         const targetId = this.getAttribute('href');
         if (targetId === '#') return;
         
         const targetElement = document.querySelector(targetId);
         if (targetElement) {
             const headerOffset = 80;
             const elementPosition = targetElement.getBoundingClientRect().top;
             const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
             
             window.scrollTo({
                 top: offsetPosition,
                 behavior: 'smooth'
             });
         }
     });
 });

 // Animation on scroll (simple implementation)
 function animateOnScroll() {
     const elements = document.querySelectorAll('.service-card, .stat-item, .project-card');
     
     elements.forEach(element => {
         const elementTop = element.getBoundingClientRect().top;
         const windowHeight = window.innerHeight;
         
         if (elementTop < windowHeight - 100) {
             element.style.opacity = '1';
             element.style.transform = 'translateY(0)';
         }
     });
 }

 // Initialize animation styles
 document.querySelectorAll('.service-card, .stat-item, .project-card').forEach(element => {
     element.style.opacity = '0';
     element.style.transform = 'translateY(20px)';
     element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
 });

 // Run animation check on scroll
 window.addEventListener('scroll', animateOnScroll);
 // Run once on page load
 window.addEventListener('load', animateOnScroll);

 // Counter animation for stats
 function animateCounters() {
     const statNumbers = document.querySelectorAll('.stat-number');
     const speed = 200;
     
     statNumbers.forEach(counter => {
         const targetValue = parseInt(counter.textContent);
         let currentValue = 0;
         const increment = targetValue / speed;
         
         const updateCounter = () => {
             if (currentValue < targetValue) {
                 // Use a different format based on the content
                 if (counter.textContent.includes('%')) {
                     currentValue += increment;
                     counter.textContent = Math.ceil(currentValue) + '%';
                     setTimeout(updateCounter, 1);
                 } else {
                     currentValue += increment;
                     counter.textContent = Math.ceil(currentValue) + '+';
                     setTimeout(updateCounter, 1);
                 }
             } else {
                 if (counter.textContent.includes('%')) {
                     counter.textContent = targetValue + '%';
                 } else {
                     counter.textContent = targetValue + '+';
                 }
             }
         };
         
         updateCounter();
     });
 }

 // Check if element is in viewport
 function isInViewport(element) {
     const rect = element.getBoundingClientRect();
     return (
         rect.top >= 0 &&
         rect.left >= 0 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
     );
 }

 // Start counter animation when stats section comes into view
 let countersAnimated = false;
 window.addEventListener('scroll', () => {
     const statsSection = document.querySelector('.stats');
     if (statsSection && isInViewport(statsSection) && !countersAnimated) {
         animateCounters();
         countersAnimated = true;
     }
 });
 
 // Check on page load too
 window.addEventListener('load', () => {
     const statsSection = document.querySelector('.stats');
     if (statsSection && isInViewport(statsSection) && !countersAnimated) {
         animateCounters();
         countersAnimated = true;
     }
 });