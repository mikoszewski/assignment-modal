"use strict";

import "regenerator-runtime/runtime";
import renderList from "./view/view";

const background = document.querySelector(".background");
const modal = document.querySelector(".modal");
const inputList = document.querySelector(".input--list");
const declineBtn = document.getElementById("decline--btn");
const acceptBtn = document.getElementById("accept--btn");

const now = new Date(); //NOW date

//function to create DATE 24h from NOW date
const tomorrowUCT = new Date(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate(),
  now.getUTCHours() + 2,
  now.getUTCMinutes() + 1,
  now.getUTCSeconds()
);

const tomorrowUTSString = new Date(Date.parse(tomorrowUCT)); //date 24h from the moment of Accept button click
let vendorsObject = []; //Array with Vendor Objects
let collectAccepts = ""; // string used to create cookies

//function to close modal
const closeModal = function () {
  modal.classList.add("hidden");
  background.classList.toggle("overlay");
};

//fucntion to be used after click of Reject button
const rejectDecision = function () {
  document.cookie = `username=User, decision=Rejection ; ; expires=${tomorrowUTSString.toUTCString()}`;
  closeModal();
};

//function to create Objects from Vendor List and push them to vendorsObject variable
const createVendorObject = function (data) {
  const x = Object.values(data);
  x.map((elem) => {
    const tempObj = {
      id: elem.id,
      name: elem.name,
      url: elem.policyUrl,
      usesCookies: elem.usesCookies,
      usesNonCookieAccess: elem.usesNonCookieAccess,
      isAccepted: false,
    };
    vendorsObject.push(tempObj);
  });
};
//function to Fetch data from Vendors list -> is uses createVendorObject function
const loadVendors = async function (data) {
  try {
    const vendor = await fetch(
      "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json"
    )
      .then((response) => response.json())
      .then((data) => data.vendors);
    createVendorObject(vendor);
  } catch (err) {
    console.log(err);
  }
};

//function that runs after Click on Accept - collects Accepted policies from modal - assignings them to collectAccepts variable and closes modal

const acceptDecision = function () {
  vendorsObject.forEach((elem) => {
    let x = document.querySelector(`[data-id="${elem.id}"]`);
    elem.isAccepted = x.checked;
    if (elem.isAccepted === true) {
      collectAccepts = collectAccepts + ` id=${elem.id},`;
    }
  });
  document.cookie = `username=User,${collectAccepts} ; ; expires=${tomorrowUTSString.toUTCString()}`;
  closeModal();
};

/////////////////////////INITIALIZATION function

const init = async function () {
  try {
    await loadVendors();
    vendorsObject.forEach((element) => {
      const input = renderList.renderList(element);
      inputList.insertAdjacentHTML("beforeend", input);
    });

    declineBtn.addEventListener("click", rejectDecision);
    acceptBtn.addEventListener("click", acceptDecision);

    console.log(document.cookie);
    console.log(now);
  } catch (err) {
    console.log(err);
  }
};

if (!document.cookie) {
  init();
} else {
  closeModal();
  console.log(document.cookie);
  console.log(now);
}
