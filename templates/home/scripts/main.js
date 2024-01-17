function isMobile() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

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

const swipeSliderContainer = document.querySelector("#swipe_slider_container");
const swipeSliderWrapper = swipeSliderContainer.querySelector(
  "#swipe_slider_wrapper"
);
const swipeSliderItems = swipeSliderContainer.querySelectorAll(
  "#swipe_slider_wrapper > div"
);
const sliderContentWrapper = swipeSliderContainer.querySelector(
  "#slider_content_wrapper"
);
const sliderContentItems = swipeSliderContainer.querySelectorAll(
  "#slider_content_wrapper > div"
);
const slidePaginationItems = swipeSliderContainer.querySelectorAll(
  "#slide_pagination > div"
);

let activeSlideIndex = 0;

const handleSlideStart = () => {
  swipeSliderItems.forEach((item, index) => {
    if (index === activeSlideIndex) {
      item.classList.add("active");
      sliderContentItems[index].classList.add("active");
      slidePaginationItems[index].classList.add("active");

      const sliderHeight = swipeSliderContainer.clientHeight;
      const sliderWidth = swipeSliderContainer.clientWidth;
      const itemGap = Number(
        window
          .getComputedStyle(swipeSliderWrapper)
          .getPropertyValue("gap")
          .replace("px", "")
      );

      let nextItemDimension =
        swipeSliderItems[
          (activeSlideIndex + 1) % swipeSliderItems.length
        ].getBoundingClientRect();
      let selectedItemDimension =
        swipeSliderItems[activeSlideIndex].getBoundingClientRect();

      if (window.innerWidth < 1024) {
        // For Mobile
        swipeSliderWrapper.parentElement.style.height =
          selectedItemDimension.height + "px";
        swipeSliderWrapper.style.top =
          -(itemGap + nextItemDimension.height) * activeSlideIndex + "px";
      } else {
        // For Desktop
        swipeSliderWrapper.parentElement.style.height = "";
        swipeSliderWrapper.style.top =
          -(itemGap + nextItemDimension.height) * activeSlideIndex +
          (sliderHeight / 2 - selectedItemDimension.height / 2) +
          "px";
      }
    } else {
      item.classList.remove("active");
      sliderContentItems[index].classList.remove("active");
      slidePaginationItems[index].classList.remove("active");
    }
  });
  activeSlideIndex = (activeSlideIndex + 1) % swipeSliderItems.length;

  setTimeout(handleSlideStart, 5000);
};

handleSlideStart();

const submit_btn_n1 = document.getElementById("myBtn_n1");
const ckbx_n1 = document.getElementById("ckbx_n1");
const email_field_n1 = document.getElementById("email_input_n1");
const RUDDERSTACK_URL = "https://deriv-dataplane.rudderstack.com";
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
  if (is_emailValid(email)) {
    {
      /*  document.getElementById("pEmail_n1").style.display = "none";  */
    }
  } else {
    {
      /*  document.getElementById("pEmail_n1").style.display = "block";  */
    }
  }
}

function fckbx_n1() {
  if (ckbx_n1.checked == true) {
    {
      {
        /*  document.getElementById("pAgree_n1").style.display = "none";  */
      }
    }
  } else {
    {
      {
        /*  document.getElementById("pAgree_n1").style.display = "block";  */
      }
    }
  }
}

async function f_submit_btn_n1() {
  const email = email_field_n1.value;
  if (is_emailValid(email) && ckbx_n1.checked == true) {
    await rudderanalytics.track("signup_redirect_lp_home_page");

    const verify_email_req = getVerifyEmailRequest(email);

    window.ws.send(JSON.stringify(verify_email_req));
  } else {
    if (ckbx_n1.checked == false) {
      {
        {
          /*  document.getElementById("pAgree_n1").style.display = "block";  */
        }
      }
      {
        {
          /*  document.getElementById("pEmail_n1").style.display = "block";  */
        }
      }
      if (is_emailValid(email)) {
        {
          {
            /*  document.getElementById("pEmail_n1").style.visibility = "hidden";  */
          }
        }
      }
    } else if (email == "") {
      {
        {
          /*  document.getElementById("pEmail_n1").innerHTML = "Insira o seu correo eletrónico."  */
        }
      }
      {
        {
          /*  document.getElementById("pEmail_n1").style.visibility = "visible";  */
        }
      }
    } else {
      {
        {
          /*  document.getElementById("pEmail_n1").innerHTML = "Insira um correo eletrónico válido."  */
        }
      }
      {
        {
          /*  document.getElementById("pEmail_n1").style.visibility = "visible";  */
        }
      }
    }
  }
}

function is_emailValid(email) {
  if (
    /^\w+([!#$%&'*+-/=?^_`{|}~\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    )
  )
    return true;
  return false;
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
  const affiliate_token_link = affiliate_tracking
    ? `&affiliate_token=${affiliate_tracking}`
    : "";
  const social_signup = platform ? `&social_signup=${platform}` : "";
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

  document.querySelectorAll(".signup-redirect-url").forEach((e) => {
    e.addEventListener("click", () => {
      window.location.href =
        "https://deriv.com/signup" + window.location.search;
    });
  });

  const gb = new growthbook.GrowthBook({
    apiHost: process.env.GROWTHBOOK_API_HOST,
    streamingHost: process.env.GROWTHBOOK_API_HOST,
    clientKey: process.env.GROWTHBOOK_CLIENT_KEY,
    enableDevMode: true,
    subscribeToChanges: true,
    backgroudSync: true,
    attributes: {
      id: rudderanalytics.getAnonymousId(),
      country: window.navigator.language,
      device_type: isMobile() ? "mobile" : "desktop",
      user_language: window.location.pathname.split("/")[2],
      device_language: window.navigator.language,
    },
    trackingCallback: (experiment, result) => {
      if (experiment.key === "aa-test-js-redirect") {
        if (result.key === "0") {
          document.querySelector("body").classList.remove("hidden");
        }

        if (result.key === "1") {
          const queryParams = window.location.search
            ? window.location.search + "&tpr=true"
            : "?tpr=true";

          window.location.href =
            "https://lp.deriv.com/free-forex-ebook/en/" + queryParams;
        }
      }
    },
  });
};
