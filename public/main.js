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

  if (
    name.value === "" ||
    role.value === "label" ||
    location.value === "label"
  ) {
    alert("Fields Cannot Be Blank");

    name.value = "";
    role.value = "label";
    location.value = "label";
  } else {
    createMember(memberObj);

    name.value = "";
    role.value = "label";
    location.value = "label";

    alert("Member successfully added!");
  }
};

const createMemberBanner = (member) => {
  const memberCard = document.createElement("div");
  memberCard.classList.add("member-banner");

  memberCard.innerHTML = `
  <div id="member-card">  
  <figure id="banner-image">
  <img src="../images/${member.location}.png" style="width: 200px"/>
  </figure>  
  <article id="banner-info">
  <p class="member-name">N<span>ame:</span> ${member.name}</p>
  <p class="member-role">R<span>ole:</span> ${member.role}</p>
  <p class="member-location">L<span>ocation:</span> ${member.location}</p>
  <img src="../images/delete.png" style="width: 40px" id="deleteBtn" onclick="deleteMember(${member.id})"/>
  </article>
    </div>
    `;

  dashboard.appendChild(memberCard);
};

form.addEventListener("submit", submitHandler);

getAllMembers();

// welcome banner

const welcomeBanner = document.getElementById("welcome-banner");

welcomeBanner.innerHTML = `
  <h1>Welcome <span id="family-name">'${window.localStorage.getItem(
    "familyName"
  )}'</span> family!
  </h1>
  `;
