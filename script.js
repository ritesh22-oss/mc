// Minecraft Loading Screen Functionality
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const loadingProgress = document.querySelector('.loading-progress');
const loadingText = document.getElementById('loading-text');
const backgroundMusic = document.getElementById('background-music');

// Minecraft loading tips
const loadingTips = [
  "Loading Minecraft Memories...",
  "Generating terrain...",
  "Breeding axolotls...",
  "Creeper? Aww man...",
  "Mining diamonds...",
  "Building memories...",
  "Crafting adventures...",
  "Exploring caves...",
  "Fighting zombies...",
  "Planting trees...",
  "Taming wolves...",
  "Flying with elytra...",
  "Brewing potions...",
  "Enchanting gear...",
  "Finding villages...",
  "Riding horses...",
  "Fishing for treasures...",
  "Building redstone contraptions...",
  "Fighting the Ender Dragon...",
  "Creating pixel art..."
];

let currentProgress = 0;
let loadingInterval;

function updateLoadingText() {
  const randomTip = loadingTips[Math.floor(Math.random() * loadingTips.length)];
  loadingText.textContent = randomTip;
}

function startLoadingAnimation() {
  // Try to autoplay music immediately
  if (backgroundMusic) {
    backgroundMusic.play().catch(() => {
      // Will auto play once allowed
      const playOnInteraction = () => {
        backgroundMusic.play();
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('keydown', playOnInteraction);
      };
      document.addEventListener('click', playOnInteraction);
      document.addEventListener('keydown', playOnInteraction);
    });
  }

  // Update loading text every 1.5 seconds
  updateLoadingText();
  const textInterval = setInterval(updateLoadingText, 1500);

  // Animate loading bar over 4 seconds
  const duration = 4000; // 4 seconds
  const interval = 50; // Update every 50ms
  const increment = (interval / duration) * 100;
  currentProgress = 0;
  loadingProgress.style.width = '0%';

  loadingInterval = setInterval(() => {
    currentProgress += increment;
    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(loadingInterval);
      clearInterval(textInterval);

      // Complete loading and transition to main content
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        mainContent.classList.remove('hidden');

        // Remove loading screen after fade out
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 1000);
      }, 500);
    }
    loadingProgress.style.width = currentProgress + '%';
  }, interval);
}

document.addEventListener('DOMContentLoaded', startLoadingAnimation);

const timelineData = {
  "2024": [
    {
      img: "home.png",
      caption: "🏠 Our First House - Jan 2024"
    },
    {
      img: "assets/images/nether-trip.png",
      caption: "🔥 First Nether Trip - Mar 2024"
    }
  ],
  "2025": [
    {
      img: "assets/images/castle.png",
      caption: "🏰 The Castle Project - Feb 2025"
    }
  ]
};

const container = document.getElementById("timeline-container");
const tabs = document.querySelectorAll(".timeline-tab");
const toggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function createEntry(entry, index) {
  const entryDiv = document.createElement("div");
  entryDiv.className = "timeline-entry glow";
  entryDiv.innerHTML = `
    <img src="${entry.img}" alt="Memory ${index}" />
    <p class="caption">${entry.caption}</p>
    <button class="like-btn"><i class="fa-solid fa-heart"></i></button>
  `;
  const likeBtn = entryDiv.querySelector(".like-btn");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("liked");
    likeBtn.classList.add("like-effect");
    setTimeout(() => likeBtn.classList.remove("like-effect"), 400);
  });
  return entryDiv;
}

let currentYear = "2024";
function renderTimeline(year) {
  currentYear = year;
  container.innerHTML = "";
  timelineData[year].forEach((entry, index) => {
    const entryEl = createEntry(entry, index);
    container.appendChild(entryEl);
  });
}

function setTheme(mode) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(mode);
  if (themeIcon) {
    themeIcon.className = mode === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
  toggle.title = mode === "light" ? "Switch to Night" : "Switch to Day";
  localStorage.setItem("theme", mode);
  document.querySelectorAll('.pixel-cloud.light, .pixel-star.light').forEach(e => e.style.display = mode === 'light' ? '' : 'none');
  document.querySelectorAll('.pixel-cloud.dark, .pixel-star.dark').forEach(e => e.style.display = mode === 'dark' ? '' : 'none');
}

toggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  setTheme(newTheme);
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".timeline-tab.active").classList.remove("active");
    tab.classList.add("active");
    renderTimeline(tab.dataset.timeline);
  });
});

renderTimeline(currentYear);
