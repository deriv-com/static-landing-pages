let is_under_experiment = false;

const formElementContainer = document.getElementById(
  "signup_provider_button_container",
);
const submit_btn_n1 = document.getElementById("myBtn_n1");
const ckbx_n1 = document.getElementById("ckbx_n1");
const email_field_n1 = document.getElementById("email_input_n1");
const RUDDERSTACK_URL = process.env.RUDDERSTACK_URL;
const RUDDERSTACK_KEY = process.env.RUDDERSTACK_KEY;

const templates = {
  signup_provider_visible__apple: `
        <button
          data-platform="apple"
          style="font-weight: 700"
          class="flex items-center justify-center w-full h-12 gap-[0.4rem] text-xs font-bold bg-black text-white rounded-2xl hover:opacity-70 social-media-login"
        >
          <img
            class="h-6 w-6"
            height="24px"
            width="24px"
            alt="apple"
            src="https://static.deriv.com/email/images/icons/social-apple-white.png"
          />
          <span class="el__t_string__el">Apple</span>
        </button>
    `,
  signup_provider_visible__facebook: `
        <button
          data-platform="facebook"
          style="font-weight: 700"
          class="flex items-center justify-center w-full h-12 gap-[0.4rem] text-xs font-bold bg-[#1877f2] text-white rounded-2xl hover:opacity-70 social-media-login"
        >
          <img
            class="h-6 w-6"
            height="24px"
            width="24px"
            alt="facebook"
            src="https://static.deriv.com/email/images/icons/social-facebook-blue.png"
          />
          <span class="el__t_string__el">Facebook</span>
        </button>
    `,
  signup_provider_visible__google: `
        <button
          data-platform="google"
          style="font-weight: 700"
          class="flex items-center justify-center w-full h-12 gap-[0.4rem] text-xs font-bold bg-white border border-[#d6dadb] rounded-2xl hover:opacity-70 social-media-login"
        >
          <img
            class="h-6 w-6"
            height="24px"
            width="24px"
            alt="google"
            src="https://static.deriv.com/email/images/icons/social-google.png"
          />
          <span class="el__t_string__el">Google</span>
        </button>
    `,
};

function renderGoogleButton() {
  formElementContainer.insertAdjacentHTML(
    "beforeend",
    templates.signup_provider_visible__google,
  );
}

function renderFacebookButton() {
  formElementContainer.insertAdjacentHTML(
    "beforeend",
    templates.signup_provider_visible__facebook,
  );
}

function renderAppleButton() {
  formElementContainer.insertAdjacentHTML(
    "beforeend",
    templates.signup_provider_visible__apple,
  );
}

function renderButton(provider) {
  if (provider === "google") {
    renderGoogleButton();
  }

  if (provider === "facebook") {
    renderFacebookButton();
  }

  if (provider === "apple") {
    renderAppleButton();
  }
}

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
        [methodName].concat(Array.prototype.slice.call(arguments)),
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
  }
}

function fckbx_n1() {
  if (ckbx_n1.checked == true) {
  }
}

const getVerifyEmailRequest = (formatted_email) => {
  const fields = [
    "date_first_contact",
    "signup_device",
    "gclid",
    "utm_source",
    "utm_ad_id",
    "utm_adgroup_id",
    "utm_adrollclk_id",
    "utm_campaign",
    "utm_campaign_id",
    "utm_content",
    "utm_fbcl_id",
    "utm_gl_client_id",
    "utm_medium",
    "utm_msclk_id",
    "utm_term",
  ];

  let url_parameters = {};

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  fields.map((fld) => {
    const fld_value = urlParams.get(fld);

    if (fld_value) {
      url_parameters[fld] = fld_value;
    }
  });

  return {
    verify_email: formatted_email,
    type: "account_opening",
    url_parameters,
  };
};

const initializeWebSocket = () => {
  window.ws = new WebSocket(
    "wss://blue.derivws.com/websockets/v3?app_id=16929&l=en&brand=deriv",
  );

  window.ws.onmessage = (message) => {
    const response = JSON.parse(message.data);

    if (response.msg_type === "error") {
      window.ws.close();
    }

    if (response.msg_type === "verify_email") {
      const lang = document.querySelector("html").getAttribute("lang");
      const email = response.echo_req.verify_email;

      const newUrl = `${window.location.origin}/verify-email/${lang}`;
      const searchParams = new URLSearchParams({ email });
      window.location.assign(`${newUrl}?${searchParams}`);
    }
  };

  window.ws.onclose = () => setTimeout(() => initializeWebSocket(), 1000);
};

async function f_submit_btn_n1() {
  const email = email_field_n1.value;
  if (is_emailValid(email) && ckbx_n1.checked == true) {
    await rudderanalytics.track("signup_redirect_from_lead_pages");
    const verify_email_req = getVerifyEmailRequest(email);

    window.ws.send(JSON.stringify(verify_email_req));
  }
}

function is_emailValid(email) {
  if (
    /^\w+([!#$%&'*+-/=?^_`{|}~\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email,
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
  const social_signup = platform ? `&social_signup=${platform}` : "";
  const lang = "hi";
  return `https://oauth.deriv.com/oauth2/authorize?app_id=16929&l=${lang}&brand=deriv&platform=${social_signup}`;
};

function isMobile() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

window.onload = async () => {
  // Create a GrowthBook instance
  const gb = new growthbook.GrowthBook({
    apiHost: process.env.GROWTHBOOK_API_HOST,
    streamingHost: process.env.GROWTHBOOK_API_HOST,
    clientKey: process.env.GROWTHBOOK_CLIENT_KEY,
    enableDevMode: true,
    subscribeToChanges: true,
    backgroudSync: true,
    attributes: {
      id: rudderAnalytics.getAnonymousId(),
      country: window.navigator.language,
      device_type: isMobile() ? "mobile" : "desktop",
      user_language: window.location.pathname.split("/")[2],
      device_language: window.navigator.language,
    },
    onFeatureUsage: (exp, result) => {
      if (exp === "signup_provider_sequence") {
        const defaultFeatureValue = {
          sequence: ["google", "facebook", "apple"],
          stack: "vertical",
        };

        renderFeatures(result.value ? result.value : defaultFeatureValue);
      }
    },
    trackingCallback: (experiment, result) => {
      is_under_experiment = true;

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

  await gb.loadFeatures({
    autoRefresh: true,
  });

  const renderFeatures = (signup_provider_sequence) => {
    formElementContainer.innerHTML = "";

    signup_provider_sequence.sequence.forEach((provider) => {
      renderButton(provider);
    });

    if (signup_provider_sequence.stack === "horizontal") {
      formElementContainer.classList.add("flex-row");
      formElementContainer.classList.remove("flex-col");
    } else if (signup_provider_sequence.stack === "vertical") {
      formElementContainer.classList.add("flex-col");
      formElementContainer.classList.remove("flex-row");
    }

    document.querySelectorAll(".social-media-login").forEach((e) => {
      e.addEventListener("click", () => {
        const platform = e.getAttribute("data-platform");
        window.location.href = loginUrl(platform);
      });
    });
  };

  // setting the feature change listerner
  gb.setRenderer(() => {
    // this will get the feature value in order to trigger the latest feature usage callback
    gb.getFeatureValue("signup_provider_sequence");
  });

  gb.refreshFeatures();

  if (!is_under_experiment) {
    document.querySelector("body").classList.remove("hidden");
  }
};

initializeWebSocket();
