const submit = document.querySelector(".submit-upload");
const viewImg = document.querySelector(".img-upload");
const viewName = document.querySelector(".viewName");
const viewDate = document.querySelector(".viewDate");
const viewDescription = document.querySelector(".viewDescription");
const cardContainer = document.querySelector(".cards");
const pagination_element = document.getElementById("pagination");
const tabs = document.querySelectorAll(".description-tab");
const tabsContainer = document.querySelector(".description-tab-container");
const tabsContent = document.querySelectorAll(".description-content");
const pinWarning = document.querySelector(".drop-pin");
const closeBtn = document.getElementById("close-btn");
const clearViews = document.querySelector(".clear-views");
const imageContainer = document.querySelector(".ss2");
let map;
let marker;
let mapEvent;
let views = [];
let pos;
let uploadedImage;
let current_page = 1;
let rows = 4;

class View {
    date = new Date();
    id = (Date.now() + "").slice(-10);

    constructor(coords, image, location, date, description) {
        this.coords = coords;
        this.image = image;
        this.location = location;
        this.date = date;
        this.description = description;
    }
}
