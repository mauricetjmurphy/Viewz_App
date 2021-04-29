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

// Validating the email input with a regular  expression
const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// Add  error  message and icon when the input is invalid
const invalidateEml = (elm) => {
    elm.classList.add("input-error");
    const errorIcon = elm.parentElement.querySelector(".icon-error");
    errorIcon.classList.remove("hidden");
    const successIcon = elm.parentElement.querySelector(".icon-success");
    successIcon.classList.add("hidden");
    const error = elm.parentElement.querySelector(".error-message");
    error.classList.remove("hidden");
    isFormValid = false;
};

// Reseting the error messages and icons when input is valid
const resetElm = (elm) => {
    elm.classList.remove("input-error");
    const errorIcon = elm.parentElement.querySelector(".icon-error");
    errorIcon.classList.add("hidden");
    const error = elm.parentElement.querySelector(".error-message");
    error.classList.add("hidden");
};

//Add success icon when input is valid
const validateElm = (elm) => {
    const successIcon = elm.parentElement.querySelector(".icon-success");
    successIcon.classList.remove("hidden");
};

fields.forEach((field) => {
    const input = document.querySelector(field);
    input.addEventListener("input", () => {
        validateInputs();
    });
});

// Reset all inputs errors and re-check if they are valid
const validateInputs = () => {
    if (!isValidationOn) return;
    resetElm(firstName);
    resetElm(lastName);
    resetElm(email);
    resetElm(dob);
    resetElm(password);
    resetElm(confirmPassword);

    isFormValid = true;

    firstName.value ? validateElm(firstName) : invalidateEml(firstName);
    lastName.value ? validateElm(lastName) : invalidateEml(lastName);
    isValidEmail(email.value) ? validateElm(email) : invalidateEml(email);
    dob.value ? validateElm(dob) : invalidateEml(dob);
    password.value.length >= 8
        ? validateElm(password)
        : invalidateEml(password);
    confirmPassword.value === password.value && confirmPassword.value !== ""
        ? validateElm(confirmPassword)
        : invalidateEml(confirmPassword);
};

newMembersForm.addEventListener("submit", (e) => {
    e.preventDefault();
    isValidationOn = true;
    validateInputs();
    if (isFormValid) {
        sectionTwo.remove();
        thankYou.classList.remove("hidden");
    }
});
