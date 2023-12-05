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
    const bro = await rudderanalytics.track("signup_redirect_from_lead_pages");
    console.log("track signup_redirect_from_lead_pages", bro);
    const verify_email_req = getVerifyEmailRequest(email);
    console.log(verify_email_req);
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
      id: "123",
      country: "US",
    },
    onFeatureUsage: (exp, result) => {
      console.log("heeeelo", exp, result);
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

      console.log({
        experiment,
        result,
      });

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
