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

//Event Listeners
// Clear the views from the views section
clearViews.addEventListener("click", () => {
    reset();
    showImageContainer();
});

// Handling clicks on the tabs in the description section
tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".description-tab");

    if (!clicked) return;

    // Remove active tab class
    tabs.forEach((t) => t.classList.remove("description-tab-active"));
    tabsContent.forEach((e) =>
        e.classList.remove("description-content-active")
    );

    // Active tab
    clicked.classList.add("description-tab-active");

    document
        .querySelector(`.description-content-${clicked.dataset.tab}`)
        .classList.add("description-content-active");
});

// Creates a new view object , hides the form and shows the page numbers
form.addEventListener("submit", (e) => {
    e.preventDefault();
    newView();
    showImageContainer();
});

viewImg.addEventListener("change", function (e) {
    // Converts the file into a data URL
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        uploadedImage = reader.result;

        localStorage.setItem("recent-image", reader.result);
    });

    reader.readAsDataURL(this.files[0]);
});

// Creates a new view object , hides the form and shows the page numbers
form.addEventListener("submit", (e) => {
    e.preventDefault();
    newView();
    showImageContainer();
});

// Move map marker to selected view and display  popup
cardContainer.addEventListener("click", moveToMarker);

// Use some listener function to listen for a click on a element with a matching class name
document.addEventListener("click", someListener);

// Helper function that closes the popup modall
function someListener(e) {
    let el = e.target;
    if (el.classList.contains("close-btn")) {
        popUp.classList.add("hidden");
        let allSections = Array.from(document.querySelectorAll("section"));

        allSections.forEach((e) => e.classList.remove("blur"));
        popUp.innerHTML = "";
    }
}

// Call the functions
getLocalStorage();

document.body.onload = loadMap();

function loadMap() {
    // showImageContainer();

    map = L.map("map").setView([51.505, -0.09], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.addEventListener("click", function (mapE) {
        mapEvent = mapE;
        const { lat, lng } = mapEvent.latlng;
        pinWarning.classList.add("hidden");

        var inputs = document.getElementsByTagName("input");
        var textarea = document.getElementsByTagName("textarea");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
        textarea[0].disabled = false;
        submit.disabled = false;

        // If a marker is already placed remove it and add the new one on click
        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: "view-popup",
                })
            );
    });

    // Renders a marker for every view saved in local storage
    views.forEach((view) => {
        renderViewMarker(view);
    });

    displayList(views, cardContainer, rows, current_page);
}

function renderViewMarker(view) {
    L.marker(view.coords)
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: "view-popup",
            })
        )
        .setPopupContent();
}

// Creates a new view object and saves it to an array and then local storage.
function newView() {
    //Get data from the form
    const { lat, lng } = mapEvent.latlng;
    const image = uploadedImage;
    const name = viewName.value;
    const date = viewDate.value;
    const description = viewDescription.value;

    //Create the view object
    const view = new View([lat, lng], image, name, date, description);

    //Add new object the views array
    views.push(view);

    // Render view location on map as marker
    renderViewMarker(view);

    // Render view vocation on list
    displayList(views, cardContainer, rows, current_page);

    // Set local storage to all workouts
    setLocalStorage();

    // revealViews();
    setUpPagination(views, pagination_element, rows);
    // Clear inputs
    viewName.value = viewImg.value = viewDate.value = viewDescription.value =
        "";

    var inputs = document.getElementsByTagName("input");
    var textarea = document.getElementsByTagName("textarea");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }
    textarea[0].disabled = true;
    submit.disabled = true;

    pinWarning.classList.remove("hidden");
}

// Displays  the view cards in a list. Rows variable determines how many view cards are displayed on the page.
function displayList(views, wrapper, rows_per_page, page) {
    if (wrapper !== undefined) {
        wrapper.innerHTML = "";
    }
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = views.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];

        const html = `
          <div class="card" style="margin: 10px;" data-id=${item.id}>
          <div class="card-img-top" style="background-image: url(${item.image}); background-position: center; background-size: cover;"></div>
          <div class="card-body">
              <h1 class="card-title" style="text-align: center;">${item.location}</h1>
              <p class="card-text" style="text-align: center;">${item.date}</p>
            </div>
       </div>
    `;
        cardContainer.insertAdjacentHTML("afterbegin", html);
    }
    if (views !== undefined) {
        setUpPagination(views, pagination_element, rows);
    }
}

// Setting up pagination. Page buttons display based on the number of view objects in the array and the Rows variable.
function setUpPagination(views, wrapper, rows_per_page) {
    pagination_element.innerHTML = "";
    let page_count = Math.ceil(views.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = paginationButton(i, views);
        wrapper.appendChild(btn);
    }
}

// Creating the page button
function paginationButton(page, views) {
    let button = document.createElement("button");
    button.innerText = page;

    if (current_page == page) button.classList.add("active");

    button.addEventListener("click", function () {
        current_page = page;
        displayList(views, cardContainer, rows, current_page);

        let current_btn = document.querySelector(".pagenumbers button.active");
        current_btn.classList.remove("active");

        button.classList.add("active");
    });
    return button;
}

// Getting locallly stored data from the Local Storage API
function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("views"));

    if (!data) return;

    views = data;

    views.forEach((view) => {
        displayList(views, cardContainer, rows, current_page);
    });
}

// Zooms the map to the selected view and displays a pop-up with the view details.
function moveToMarker(e) {
    const viewEl = e.target.closest(".card");

    if (!viewEl) return;

    const view = views.find((view) => view.id === viewEl.dataset.id);

    let html = `
      <div class="modal-header">
        <div class="title">
        <h2>${view.location}<h2/> 
        <p style="display: inline; font-size: 1rem;">${view.date}</p>
        </div>
        <button id="close-btn" class="close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-img-container" style="background-image: url(${view.image}); background-position: center; background-size: cover;"></div>
        <div class="modal-text-container">
        <h2>Description</h2>
        <p>${view.description}</p>
        </div>
      </div>
      <div class="modal-footer"></div>
  `;

    map.setView(view.coords, 18, {
        animate: true,
        pan: {
            duration: 1,
        },
    });
    popUp.innerHTML = "";
    popUp.insertAdjacentHTML("afterbegin", html);
    popUp.classList.remove("hidden");
    popUp.scrollIntoView();
    let allSections = Array.from(document.querySelectorAll("section"));
    allSections.forEach((e) => e.classList.add("blur"));
    popUp.classList.remove("blur");
}

//Set the local storage with current data
function setLocalStorage() {
    localStorage.setItem("views", JSON.stringify(views));
}

//Clear all data in local storgae
function reset() {
    localStorage.removeItem("views");
    location.reload();
}

// Check if the views array has data in it. If not the view display section will be hidden
function showImageContainer() {
    if (views.length === 0) {
        imageContainer.classList.add("hidden");
    } else {
        imageContainer.classList.remove("hidden");
    }
}
