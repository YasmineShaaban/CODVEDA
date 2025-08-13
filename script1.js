const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature').forEach(el => observer.observe(el));

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const themeToggle = document.createElement("button");
themeToggle.innerText = "🌓";
themeToggle.setAttribute("aria-label", "Toggle Theme");
Object.assign(themeToggle.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
  zIndex: "1001"
});

themeToggle.onclick = () => {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === "dark") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", "dark");
  }
};

document.body.appendChild(themeToggle);

const form = document.getElementById("contactForm");
const fstatus = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    fstatus.textContent = "Please fill out all fields.";
    fstatus.style.color = "crimson";
    return;
  }

  fstatus.textContent = "Message sent successfully!";
  fstatus.style.color = "green";
  form.reset();
});
