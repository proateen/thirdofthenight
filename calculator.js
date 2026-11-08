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
  let maghribTime = document.getElementById("maghrib").value;
  let fajrTime = document.getElementById("fajr").value;

  if (maghribTime == "" || fajrTime == "") {
    window.alert(
      "Are you sure you have entered the times for Maghrib and Fajr correctly? Try again."
    );
  } else {
    let now = new Date();
    let today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    let next = new Date(now);
    next.setDate(next.getDate() + 1);
    let tomorrow = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`;

    let maghrib = dayjs(`${today} ${maghribTime}`);
    let fajr = dayjs(`${tomorrow} ${fajrTime}`);

    if (maghrib.isBefore(dayjs(`${today} ${fajrTime}`))) {
      fajr = dayjs(`${today} ${fajrTime}`);
    }

    difference = fajr.diff(maghrib);
    thirdOfTheDifference = difference / 3;
    halfOfTheDifference = difference / 2;

    lastThirdOfTheNight = fajr.subtract(thirdOfTheDifference, "milliseconds").format("HH:mm");
    midnight = fajr.subtract(halfOfTheDifference, "milliseconds").format("HH:mm");

    lastThirdOfTheNightTimeStart.textContent = lastThirdOfTheNight;
    lastThirdOfTheNightTimeStart.style.visibility = "visible";
    midnightStart.textContent = midnight;
    midnightStart.style.visibility = "visible";
    document.getElementById("disclaimer").style.visibility = "visible";
    document.querySelector(".userthird").textContent = lastThirdOfTheNight;
    document.querySelector(".usermidnight").textContent = midnight;
  }
};

document.querySelector(".calculate").addEventListener("click", calculateTimes);
btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});