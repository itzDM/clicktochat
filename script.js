const inputForm = document.querySelector(".form");
const link = document.querySelector(".link");
const chatInfo = document.querySelector(".chatInfo");
const createLinkMob = document.createElement("a");
const createLinkWeb = document.createElement("a");
const input = document.querySelector(".input");
const error = document.querySelector(".error");
const mode = localStorage.getItem("mode") || "";
const body = document.querySelector(" body");
const themeBtnImg = document.querySelector(".themeBtnImg");
const inputMessage = document.querySelector(".textArea");

document.body.className = mode;

//  theme mode
themeBtnImg.addEventListener("click", () => {
  localStorage.setItem("mode", mode == "light" ? "" : "light");
  body.style.transition = "all 1s ease-out 0s";
  body.classList.toggle("light");
});

// adding country code selector
const phoneInput = window.intlTelInput(input, {
  preferredCountries: ["in", "us"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

//  validating mobile number
const validateMobileNumber = (number) => {
  const phoneNumberRegex = /^(\+\d{1,3})?\d{10,15}$/;
  if (!Number(number)) {
    return { error: "Not A Valid Mobile Number" };
  } else if (phoneNumberRegex.test(number)) {
    return { phoneNumber: number };
  } else {
    return { error: "Not A Valid Mobile Number" };
  }
};

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createLinkMob.remove();
  createLinkWeb.remove();
  chatInfo.textContent = "";
  if (phoneInput.getNumber() === "") {
    error.textContent = "Please enter a Mobile Number";
    const interval = setInterval(() => {
      error.textContent = "";
      clearInterval(interval);
    }, 2000);
    return;
  } else {
    const isNumber = phoneInput.getNumber().replace(/\s/g, "");
    const result = validateMobileNumber(isNumber);
    if (result.error) {
      error.textContent = result.error;
      const interval = setInterval(() => {
        error.textContent = "";
        clearInterval(interval);
      }, 2000);
      return;
    }
    chatInfo.textContent = `Chat on WhatsApp with ${phoneInput.getNumber()}`;
    const urlWeb = `https://web.whatsapp.com/send/?phone=${phoneInput.getNumber()}&text=${
      inputMessage.value
    }&type=phone_number&app_absent=0`;
    const urlMob = `https://api.whatsapp.com/send/?phone=${phoneInput.getNumber()}&text=${
      inputMessage.value
    }&type=phone_number&app_absent=0"`;
    createLinkMob.href = urlMob;
    createLinkMob.target = "_blank";
    createLinkMob.textContent = "Continue to Chat app";
    createLinkMob.classList.add("btn");
    link.appendChild(createLinkMob);
    createLinkWeb.href = urlWeb;
    createLinkWeb.target = "_blank";
    createLinkWeb.textContent = "Continue to Chat web";
    createLinkWeb.classList.add("btn");
    link.appendChild(createLinkWeb);
  }
});
