let thirdOfTheDifference = 0;
let tahajjud = 0;

let calculateTahajjud = () => {
  let maghrib = document.getElementById("maghrib").value;
  let fajr = document.getElementById("fajr").value;
  if (maghrib == "" || fajr == "") {
    window.alert(
      "Are you sure you have entered the times for Maghrib and Fajr correctly? Try again."
    );
  } else {
    maghrib = dayjs(`2000-01-01 ${document.getElementById("maghrib").value}`);
    fajr = dayjs(`2000-01-02 ${document.getElementById("fajr").value}`);
    thirdOfTheDifference = fajr.diff(maghrib) / 3;
    tahajjud = fajr.subtract(thirdOfTheDifference, "milliseconds");
    document.getElementById("third").innerHTML = tahajjud.format("HH:mm");
    document.getElementById("third").style.visibility = "visible";
    document.getElementById("disclaimer").style.visibility = "visible";
  }
};

document
  .querySelector(".calculate")
  .addEventListener("click", calculateTahajjud);
