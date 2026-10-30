/** SELECTORS */

const tally = document.getElementById("tally");

const homeLink = document.getElementById("home-link");
const contactLink = document.getElementById("contact-link");
const contactSection = document.getElementById("contact-section");

const membershipDetailsLink = document.getElementById(
  "membership-details-link",
);
const membershipDetailsSection = document.getElementById(
  "membership-details-section",
);

const sections = [tally, contactSection, membershipDetailsSection];

/** CONSTANTS */

const FADE_DURATION = 300; // ms, keep in sync with your CSS transition

/** FUNCTIONS */

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fadeOut = async (el) => {
  el.style.opacity = 0;
  await wait(FADE_DURATION);
  el.style.display = "none";
};

const fadeIn = async (el) => {
  el.style.display = "block";
  // Force a reflow so the browser registers display:block before opacity changes
  void el.offsetHeight;
  el.style.opacity = 1;
  await wait(FADE_DURATION);
};

const showSection = async (elToShow) => {
  // Only fade out sections that are currently visible
  const visible = sections.filter(
    (s) => s.style.display !== "none" && s !== elToShow,
  );
  await Promise.all(visible.map(fadeOut));
  await fadeIn(elToShow);
};

/** EVENT LISTENERS */

homeLink.addEventListener("click", () => showSection(tally));
contactLink.addEventListener("click", () => showSection(contactSection));
membershipDetailsLink.addEventListener("click", () =>
  showSection(membershipDetailsSection),
);
