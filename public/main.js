const dashboard = document.querySelector("#dashboard");
const form = document.querySelector("form");

const baseURL = `http://localhost:3000/api/members`;

const displayMembers = (arr) => {
  console.log(arr);
  dashboard.innerHTML = ``;
  for (i = 0; i < arr.length; i++) {
    createMemberBanner(arr[i]);
  }
};

const memberCallback = ({ data: members }) => displayMembers(members);
const errCallback = (err) => console.log(err);

const getAllMembers = () => {
  axios.get(baseURL).then(memberCallback).catch(errCallback);
};

const createMember = (body) => {
  axios.post(baseURL, body).then(memberCallback).catch(errCallback);
};

const deleteMember = (id) => {
  axios.delete(`${baseURL}/${id}`).then(memberCallback).catch(errCallback);
};

const submitHandler = (event) => {
  event.preventDefault();

  let name = document.querySelector("#name");
  let role = document.querySelector("#role");
  let location = document.querySelector("#location");

  let memberObj = {
    name: name.value,
    role: role.value,
    location: location.value,
  };

  createMember(memberObj);

  name.value = "";
  role.value = "parent";
  location.value = "home";
};

const createMemberBanner = (member) => {
  const memberCard = document.createElement("div");
  memberCard.classList.add("member-banner");

  memberCard.innerHTML = `
    <img src="../images/placeholder-image.jpg"/>
    <p class="member-name">${member.name}</p>
    <p class="member-role">${member.role}</p>
    <p class="member-location">${member.location}</p>
    <button onclick="deleteMember(${member.id})">Delete Entry</button>`;

  dashboard.appendChild(memberCard);
};

form.addEventListener("submit", submitHandler);

getAllMembers();
