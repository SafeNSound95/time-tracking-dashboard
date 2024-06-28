"use strict";

const allTimeElems = document.querySelectorAll(".time");
const allPrevTextElems = document.querySelectorAll(".previous-text");
const profileActivityTimeElem = document.querySelector(
  ".profile-activity-time"
);

const extractData = function (data, e) {
  if (e.target === e.currentTarget) return;
  [...document.querySelector(".profile-activity-time").children].forEach(
    (spanEl) => spanEl.classList.remove("js-toggle")
  );

  e.target.classList.toggle("js-toggle");

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

profileActivityTimeElem.addEventListener("click", (e) =>
  extractData(activityData, e)
);

//Reading the local JSON file to get the data for the users' activities.

let activityData;
fetch("data.json")
  .then((response) => response.json())
  .then((data) => (activityData = data));

/* 
  1] Drop down menu (select) for epllipsis
  2] Refactor
*/
