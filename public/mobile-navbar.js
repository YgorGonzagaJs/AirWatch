class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();

  document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("animated-text");
    const textContent = textElement.textContent;
    textElement.textContent = ""; // Limpa o conteúdo original
  
    // Cria um span para cada letra e adiciona ao h1
    for (let i = 0; i < textContent.length; i++) {
      const span = document.createElement("span");
      span.textContent = textContent[i];
      textElement.appendChild(span);
    }
  
    // Anima cada letra para mudar de cor
    const letters = textElement.querySelectorAll("span");
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add("letter-green");
      }, 100 * index); // Atraso para cada letra
    });
  });

  window.addEventListener('load', function() {
    window.scrollTo(0, 0); // Rola a página para o topo
  });