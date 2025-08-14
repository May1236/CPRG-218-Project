const navMenuElement = document.getElementById("navMenu")
// console.log(navMenuElement)

const navBtnElement = document.getElementById("navBtn")
// console.log(navBtnElement)

// This function will add/remove 'active' class from 'nav' element
function toggleNavMenu() {
    navMenuElement.classList.toggle('active')
}

// adding a click event listener and calling toggleNavMenu 
// function when the event happen.
navBtnElement.addEventListener('click',toggleNavMenu)

// below code will return a list of all the 'li' elements in my html file
const navLinks = document.getElementsByTagName('li');

for(loopVariable = 0; loopVariable < navLinks.length; loopVariable++) { 
    navLinks[loopVariable].addEventListener('click', toggleNavMenu);
    console.log(loopVariable);
}

// --- ACTIVE NAV HIGHLIGHT ---
const navAnchors = document.querySelectorAll('#navMenu a');

function setActive(target) {
  navAnchors.forEach(a => {
    const href = a.getAttribute('href') || '';
    const isHome    = target === 'home'     && (href === 'index.html' || href === './' || href === '/');
    const isCats    = target === 'services' && (href === '#services' || href.endsWith('#services'));
    const isAbout   = target === 'about'    && href.includes('about.html');
    const isContact = target === 'contact'  && (href === '#contact' || href.endsWith('#contact'));
    a.classList.toggle('active', isHome || isCats || isAbout || isContact);
  });
}

function updateActiveByLocation() {
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const hash = (location.hash || '').toLowerCase();

  if (file === 'about.html')           return setActive('about');
  if (hash === '#services')            return setActive('services');
  if (hash === '#contact')             return setActive('contact');
  return setActive('home');
}

updateActiveByLocation();
window.addEventListener('hashchange', updateActiveByLocation);


// Fetch API to get random cat image
document.addEventListener("DOMContentLoaded", () => {
    const catBtn = document.getElementById("catBtn");
    const catResult = document.getElementById("catResult");

    if (catBtn) {
        catBtn.addEventListener("click", async () => {
            try {
                const res = await fetch("https://api.thecatapi.com/v1/images/search");
                const data = await res.json();
                catResult.innerHTML = `<img src="${data[0].url}" alt="Random cat" style="max-width:100%; border-radius:10px;">`;
            } catch (error) {
                catResult.innerHTML = "<p>Oops! Couldn't load cat image.</p>";
            }
        });
    }
});

