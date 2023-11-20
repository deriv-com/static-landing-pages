const submit_btn_n1 = document.getElementById("myBtn_n1");
const ckbx_n1 = document.getElementById("ckbx_n1");
const email_field_n1 = document.getElementById("email_input_n1");
const display_email = document.getElementById("email_sent_to");
const form_element = document.getElementById("get_ebook_form");
const email_sent_card = document.getElementById("email_sent_card");

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
  f_check_submit_btn_n1();
}

function fckbx_n1() {
  f_check_submit_btn_n1();
}

function f_check_submit_btn_n1() {
  const email = email_field_n1.value;
  if (ckbx_n1.checked == true && is_emailValid(email)) {
    submit_btn_n1.disabled = false;
  } else {
    submit_btn_n1.disabled = true;
  }
}

async function f_submit_btn_n1() {
  const email = email_field_n1.value;
  form_element.style.display = "none";
  email_sent_card.style.display = "flex";
  if (is_emailValid(email) && ckbx_n1.checked == true) {
    display_email.innerText = email;
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
    // Enable easier debugging during development
    enableDevMode: true,
    // Update the instance in realtime as features change in GrowthBook
    subscribeToChanges: true,
    // Targeting attributes
    attributes: {
      id: "123",
      country: "US",
    },
    // Only required for A/B testing
    // Called every time a user is put into an experiment
    trackingCallback: (experiment, result) => {
      console.log("Experiment Viewed", {
        experimentId: experiment.key,
        variationId: result.key,
      });
    },
  });

  // Wait for features to be available
  await gb.loadFeatures();

  const homepage = gb.getFeatureValue("homepage", "default");
};
