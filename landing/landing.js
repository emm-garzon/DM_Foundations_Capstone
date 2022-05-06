const userInfo = document.getElementById("user-info");
let famNameInput = document.getElementById("famName");

userInfo.addEventListener("submit", (event) => {
  event.preventDefault();

  window.localStorage.setItem("familyName", famNameInput.value);
  window.location.href = "../public/index.html";
});
