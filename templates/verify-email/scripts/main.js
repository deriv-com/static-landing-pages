window.onload = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get("email");

  const emailElement = document.querySelector("#user-email");

  emailElement.innerHTML = email;
};
