"use strict";

const allTimeElems = document.querySelectorAll(".time");
const allPrevTextElems = document.querySelectorAll(".previous-text");
const profileActivityTimeElem = document.querySelector(
  ".profile-activity-time"
);
const allDropDownMenus = document.querySelectorAll(".dropdown-menu");

const allEllipsis = document.querySelectorAll(".ellipsis");

function removeMenu() {
  allDropDownMenus.forEach((menu) => {
    menu.classList.remove("dropdown-menu--active");
  });
}

allEllipsis.forEach((ellipsis) =>
  ellipsis.addEventListener("click", function () {
    const currentDropDownMenu = ellipsis
      .closest(".dropdown")
      .querySelector(".dropdown-menu");

    allDropDownMenus.forEach((menu) => {
      if (menu === currentDropDownMenu) return;
      menu.classList.remove("dropdown-menu--active");
    });

    currentDropDownMenu.classList.toggle("dropdown-menu--active");
  })
);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") removeMenu();
});

document.addEventListener("click", function (e) {
  if (e.target === document.querySelector("body")) removeMenu();
});

const extractData = function (data, e) {
  data.forEach((category, i) => {
    const timeFrame = e.target.textContent.toLowerCase();
    const timePrevKeyword =
      timeFrame === "daily"
        ? "Yesterday"
        : timeFrame === "weekly"
        ? "Last Week"
        : "Last Month";

    allTimeElems[i].textContent = `${
      category.timeframes[`${timeFrame}`].current
    }hrs`;

    allPrevTextElems[i].textContent = `${timePrevKeyword} - ${
      category.timeframes[`${timeFrame}`].previous
    }hrs`;
  });
};

profileActivityTimeElem.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) return;
  [...document.querySelector(".profile-activity-time").children].forEach(
    (spanEl) => spanEl.classList.remove("js-toggle")
  );

  e.target.classList.toggle("js-toggle");
  extractData(activityData, e);
});

allDropDownMenus.forEach((menu) =>
  menu.addEventListener("click", function (e) {
    if (e.target === e.currentTarget) return;
    extractData(activityData, e);
  })
);

let activityData;
fetch("data.json")
  .then((response) => response.json())
  .then((data) => (activityData = data));
