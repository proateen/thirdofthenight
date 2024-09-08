const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".disclaimer");

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

let lastThirdOfTheNightTimeStart = document.getElementById("third");
let midnightStart = document.getElementById("midnight");

let difference = 0;
let thirdOfTheDifference = 0;
let halfOfTheDifference = 0;

let lastThirdOfTheNight = 0;
let midnight = 0;

let calculateTimes = () => {
  let maghrib = document.getElementById("maghrib").value;
  let fajr = document.getElementById("fajr").value;

  if (maghrib == "" || fajr == "") {
    window.alert(
      "Are you sure you have entered the times for Maghrib and Fajr correctly? Try again."
    );
  } else {
    maghrib = dayjs(`2000-01-01 ${document.getElementById("maghrib").value}`);
    fajr = dayjs(`2000-01-02 ${document.getElementById("fajr").value}`);

    difference = fajr.diff(maghrib);
    thirdOfTheDifference = difference / 3;
    halfOfTheDifference = difference / 2;

    lastThirdOfTheNight = fajr.subtract(thirdOfTheDifference, "milliseconds").format("HH:mm");
    midnight = fajr.subtract(halfOfTheDifference, "milliseconds").format("HH:mm");

    lastThirdOfTheNightTimeStart.innerHTML = lastThirdOfTheNight;
    lastThirdOfTheNightTimeStart.style.visibility = "visible";

    midnightStart.innerHTML = midnight;
    midnightStart.style.visibility = "visible";

    document.getElementById("disclaimer").style.visibility = "visible";
    document.querySelector(".userthird").innerHTML = lastThirdOfTheNight;
    document.querySelector(".usermidnight").innerHTML = midnight;
  }
};

document
  .querySelector(".calculate")
  .addEventListener("click", calculateTimes);

btnOpenModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  };
});