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

document.body.className = mode;

themeBtnImg.addEventListener("click", () => {
  localStorage.setItem("mode", mode == "light" ? "" : "light");
  body.classList.toggle("light");
});

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
  if (input.value === "") {
    error.textContent = "Please enter a Mobile Number";
    const interval = setInterval(() => {
      error.textContent = "";
      clearInterval(interval);
    }, 2000);
    return;
  } else {
    const isNumber = input.value.replace(/\s/g, "");
    const result = validateMobileNumber(isNumber);
    if (result.error) {
      error.textContent = result.error;
      const interval = setInterval(() => {
        error.textContent = "";
        clearInterval(interval);
      }, 2000);
      return;
    }
    let number = result.phoneNumber;
    if (number.length === 10) {
      number = "+91" + number;
    }
    chatInfo.textContent = `Chat on WhatsApp with ${number}`;
    const urlWeb = `https://web.whatsapp.com/send/?phone=${number}&text&type=phone_number&app_absent=0`;
    const urlMob = `https://api.whatsapp.com/send/?phone=${number}&text&type=phone_number&app_absent=0"`;
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
