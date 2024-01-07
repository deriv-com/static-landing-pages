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


const swipeSliderContainer = document.querySelector("#swipe_slider_container")
const swipeSliderWrapper = swipeSliderContainer.querySelector("#swipe_slider_wrapper")
const swipeSliderItems = swipeSliderContainer.querySelectorAll("#swipe_slider_wrapper > div")
const sliderContentWrapper = swipeSliderContainer.querySelector("#slider_content_wrapper")
const sliderContentItems = swipeSliderContainer.querySelectorAll("#slider_content_wrapper > div")
const slidePaginationItems = swipeSliderContainer.querySelectorAll("#slide_pagination > div")

let activeSlideIndex = 0

const handleSlideStart = () => {
  swipeSliderItems.forEach((item, index) => {
    if (index === activeSlideIndex) {
      item.classList.add("active")
      sliderContentItems[index].classList.add("active")
      slidePaginationItems[index].classList.add("active")

      const sliderHeight = swipeSliderContainer.clientHeight
      const sliderWidth = swipeSliderContainer.clientWidth
      const itemGap = Number(window.getComputedStyle(swipeSliderWrapper).getPropertyValue("gap").replace("px", ""))

      let nextItemDimension = swipeSliderItems[(activeSlideIndex + 1) % swipeSliderItems.length].getBoundingClientRect();
      let selectedItemDimension = swipeSliderItems[activeSlideIndex].getBoundingClientRect();



      if (window.innerWidth < 1024) {
        // For Mobile
        swipeSliderWrapper.parentElement.style.height = selectedItemDimension.height + "px"
        swipeSliderWrapper.style.top = (-(itemGap + nextItemDimension.height) * activeSlideIndex) + "px"
      } else {
        // For Desktop
        swipeSliderWrapper.parentElement.style.height = ""
        swipeSliderWrapper.style.top = ((-(itemGap + nextItemDimension.height) * activeSlideIndex) + ((sliderHeight / 2) - (selectedItemDimension.height / 2))) + "px"
      }


    } else {
      item.classList.remove("active")
      sliderContentItems[index].classList.remove("active")
      slidePaginationItems[index].classList.remove("active")

    }
  })
  activeSlideIndex = (activeSlideIndex + 1) % swipeSliderItems.length

  setTimeout(handleSlideStart, 5000)

}

handleSlideStart();



const submit_btn_n1 = document.getElementById("myBtn_n1");
const ckbx_n1 = document.getElementById("ckbx_n1");
const email_field_n1 = document.getElementById("email_input_n1");
const RUDDERSTACK_URL = "https:\/\/deriv-dataplane.rudderstack.com";
const RUDDERSTACK_KEY = "1lN3tsFD2nruGFgM5F074DC2hMB";

rudderanalytics = window.rudderanalytics = [];
const methods = [
  "load",
  "page",
  "track",
  "identify",
  "alias",
  "group",
  "ready",
  "reset",

  "setAnonymousId",
  "getAnonymousId",
];
for (var i = 0; i < methods.length; i++) {
  var method = methods[i];
  rudderanalytics[method] = (function (methodName) {
    return function () {
      rudderanalytics.push(
        [methodName].concat(Array.prototype.slice.call(arguments))
      );
    };
  })(method);
}
rudderanalytics.load(RUDDERSTACK_KEY, RUDDERSTACK_URL);


ckbx_n1.addEventListener("click", fckbx_n1);
submit_btn_n1.addEventListener("click", f_submit_btn_n1);
email_field_n1.addEventListener("keyup", f_email_input_errmsg_n1);

function f_email_input_errmsg_n1() {
  const email = email_field_n1.value;
  if (is_emailValid(email)) { {/*  document.getElementById("pEmail_n1").style.display = "none";  */ } }
  else { {/*  document.getElementById("pEmail_n1").style.display = "block";  */ } }
}

function fckbx_n1() {
  if (ckbx_n1.checked == true) {
    { {/*  document.getElementById("pAgree_n1").style.display = "none";  */ } }
  }
  else {
    { {/*  document.getElementById("pAgree_n1").style.display = "block";  */ } }
  }
}

async function f_submit_btn_n1() {
  const email = email_field_n1.value;
  if (is_emailValid(email) && (ckbx_n1.checked == true)) {
    const bro = await rudderanalytics.track("signup_redirect_from_lead_pages");
    console.log("track signup_redirect_from_lead_pages", bro)
    const verify_email_req = getVerifyEmailRequest(email);
    console.log(verify_email_req);
    window.ws.send(JSON.stringify(verify_email_req));
  }
  else {
    if (ckbx_n1.checked == false) {
      { {/*  document.getElementById("pAgree_n1").style.display = "block";  */ } }
      { {/*  document.getElementById("pEmail_n1").style.display = "block";  */ } }
      if (is_emailValid(email)) {
        { {/*  document.getElementById("pEmail_n1").style.visibility = "hidden";  */ } }
      }
    }
    else if (email == '') {
      { {/*  document.getElementById("pEmail_n1").innerHTML = "Insira o seu correo eletrónico."  */ } }
      { {/*  document.getElementById("pEmail_n1").style.visibility = "visible";  */ } }
    }
    else {
      { {/*  document.getElementById("pEmail_n1").innerHTML = "Insira um correo eletrónico válido."  */ } }
      { {/*  document.getElementById("pEmail_n1").style.visibility = "visible";  */ } }
    }
  }
}

function is_emailValid(email) {
  if (/^\w+([!#$%&'*+-/=?^_`{|}~\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return (true)
  return (false)
}

/// social login
const getDataLink = (data) => {
  let data_link = "";
  Object.keys(data).forEach((elem) => {
    data_link += `&${elem}=${data[elem]}`;
  });
  return data_link;
};

const loginUrl = (platform) => {
  const cookies = getCookiesFields();
  const cookies_objects = getCookiesObject(cookies);
  const cookies_value = getDataObjFromCookies(cookies_objects, cookies);
  const cookies_link = getDataLink(cookies_value);
  const affiliate_tracking = Cookies.getJSON("affiliate_tracking");
  const affiliate_token_link = affiliate_tracking ? `&affiliate_token=${affiliate_tracking}` : "";
  const social_signup = platform ? `&social_signup=${platform}` : ''
  const lang = "hi";
  return `https://oauth.deriv.com/oauth2/authorize?app_id=16929&l=${lang}&brand=deriv&${affiliate_token_link}${cookies_link}&platform=${social_signup}`;
};

window.onload = () => {
  document.querySelectorAll(".social-media-login").forEach((e) => {
    e.addEventListener("click", () => {
      const platform = e.getAttribute("data-platform");
      window.location.href = loginUrl(platform);
    });
  });
};