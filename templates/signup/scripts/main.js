const submit_btn_n1 = document.getElementById("myBtn_n1");
const ckbx_n1 = document.getElementById("ckbx_n1");
const email_field_n1 = document.getElementById("email_input_n1");
const RUDDERSTACK_URL = process.env.RUDDERSTACK_URL;
const RUDDERSTACK_KEY = process.env.RUDDERSTACK_KEY;

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
    "wss://blue.derivws.com/websockets/v3?app_id=16929&l=en&brand=deriv"
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
  const social_signup = platform ? `&social_signup=${platform}` : "";
  const lang = "hi";
  return `https://oauth.deriv.com/oauth2/authorize?app_id=16929&l=${lang}&brand=deriv&platform=${social_signup}`;
};

window.onload = async () => {
  document.querySelectorAll(".social-media-login").forEach((e) => {
    e.addEventListener("click", () => {
      const platform = e.getAttribute("data-platform");
      window.location.href = loginUrl(platform);
    });
  });

  // Create a GrowthBook instance
  const gb = new growthbook.GrowthBook({
    apiHost: process.env.GROWTHBOOK_API_HOST,
    clientKey: process.env.GROWTHBOOK_CLIENT_KEY,
    enableDevMode: true,
    subscribeToChanges: true,
    attributes: {
      id: "123",
      country: "US",
    },
    trackingCallback: (experiment, result) => {
      console.log("Experiment Viewed", {
        experimentId: experiment.key,
        variationId: result.key,
      });

      if(result.key === "0") {
        document.querySelector('body').classList.remove('hidden');
      }

      if(result.key === "1") {
        window.location.href = 'https://lp.deriv.com/free-forex-ebook/en/' + window.location.search;
      }
    },
  });

  await gb.loadFeatures();
};

initializeWebSocket();
