// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Close menu when link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const offset = 70
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        })
      }
    }
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form values
    const formData = {
      name: this.querySelector('input[placeholder="Your Name"]').value,
      email: this.querySelector('input[placeholder="Your Email"]').value,
      subject: this.querySelector('input[placeholder="Subject"]').value,
      message: this.querySelector("textarea").value,
    }

    // Simple validation
    if (formData.name && formData.email && formData.message) {
      // Show success message
      const btn = this.querySelector('button[type="submit"]')
      const originalText = btn.textContent
      btn.textContent = "Message Sent! ✓"
      btn.style.backgroundColor = "#16a34a"

      // Reset form
      this.reset()

      // Restore button after 2 seconds
      setTimeout(() => {
        btn.textContent = originalText
        btn.style.backgroundColor = ""
      }, 2000)

      console.log("[v0] Form submitted:", formData)
    } else {
      alert("Please fill in all required fields.")
    }
  })
}

// Scroll Animation for Elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all cards and content
document.querySelectorAll(".service-card, .project-card, .testimonial-card, .skill-tag").forEach((el) => {
  el.style.opacity = "0"
  observer.observe(el)
})

// Active Nav Link on Scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`)

    if (navLink) {
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.style.color = ""
        })
        // Add active style to current link
        navLink.style.color = "var(--secondary-color)"
      }
    }
  })
})

// Parallax Effect (subtle)
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero")
  if (hero) {
    const scrollPosition = window.scrollY
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
  }
})

console.log("[v0] Portfolio website loaded successfully!")
