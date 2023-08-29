const typedText = document.querySelector("span.typed");
const words = ["Student", "Developer", "Video Editor", "Designer", "Gamer", "Entrepreneur"];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  typedText.textContent = currentWord.substring(0, charIndex);
  typedText.classList.add("stop-blinking");

  if (!deleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 120);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 55);
  } else {
    deleting = !deleting;
    typedText.classList.remove("stop-blinking");
    wordIndex = !deleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".navbar-burger").addEventListener("click", function () {
    document.querySelector(".navbar-burger").classList.toggle("is-active");
    document.querySelector(".navbar-menu").classList.toggle("is-active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 450);
});
