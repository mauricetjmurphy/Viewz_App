// Selector variables
const personalDetails = document.querySelector(".s2-ss2");
const existingMember = document.querySelector(".s2-ss4");
const sectionTwo = document.querySelector("section.s2");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const dob = document.querySelector("#dob");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const thankYou = document.querySelector(".thank-you");

//Validation variables
const newMembersForm = document.getElementById("new-members-form");
const fields = [
    "#firstName",
    "#lastName",
    "#email",
    "#dob",
    "#password",
    "#confirmPassword",
];

let isFormValid = false;
isValidationOn = false;

const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const resetElm = (elm) => {
    elm.classList.remove("input-error");
    const errorIcon = elm.parentElement.querySelector(".icon-error");
    errorIcon.classList.add("hidden");
    const error = elm.parentElement.querySelector(".error-message");
    error.classList.add("hidden");
};
