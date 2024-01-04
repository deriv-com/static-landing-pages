function toggleAccordian(element_id) {
  const accordian = document.querySelectorAll(".acc_content");

  accordian.forEach((x) => {
    if (x.id === element_id) {
      x.classList.toggle("max-h-0");
      x.classList.toggle("max-h-[500vh]");
    } else {
      x.classList.remove("max-h-[500vh]");
      x.classList.add("max-h-0");
    }
  });
}

function toggleMobileNavbar() {
  const toggleButton = document.querySelectorAll(".nav_toggle");
  const mobileNavbar = document.querySelector("#mobile_navbar");

  toggleButton.forEach((x) => {
    x.classList.toggle("hidden");
  });

  mobileNavbar.classList.toggle("-translate-x-full");
}

window.setInterval(() => {
  const bannerImages = [...(document.querySelectorAll(".banner-image") || [])];

  const i = bannerImages.findIndex((x) => !x.classList.contains("opacity-0"));

  bannerImages[i].classList.add("opacity-0");

  if (i + 1 === bannerImages.length) {
    bannerImages[0].classList.remove("opacity-0");
  } else {
    bannerImages[i + 1].classList.remove("opacity-0");
  }
}, 1500);

function openMenu(id) {
  const overlay = document.querySelector("#menu_overlay");
  const menu = document.querySelector("#nav_menu");
  const menu_list = menu.children;
  const selected_menu = document.querySelector(`#${id}`);

  overlay.classList.remove("hidden");
  menu.classList.replace("max-h-0", "max-h-screen");

  for (item of menu_list) {
    if (item.id === id) selected_menu.classList.replace("hidden", "grid");
    else item.classList.replace("grid", "hidden");
  }
}

function closeMenu() {
  const menu = document.querySelector("#nav_menu");
  const menu_list = menu.children;
  const overlay = document.querySelector("#menu_overlay");

  overlay.classList.add("hidden");
  menu.classList.replace("max-h-screen", "max-h-0");

  for (item of menu_list) {
    item.classList.replace("grid", "hidden");
  }
}
