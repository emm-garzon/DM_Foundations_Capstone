let members = require("./db.json");
let memberID = 2;

module.exports = {
  getMembers: (req, res) => {
    res.status(200).send(members);
  },
  postMember: (req, res) => {
    const { name, role, location } = req.body;
    let newMember = {
      id: memberID,
      name,
      role,
      location,
    };
    members.push(newMember);
    memberID++;
    res.status(200).send(members);
  },
  deleteMember: (req, res) => {
    let index = members.findIndex((elem) => elem.id === +req.params.id);
    members.splice(index, 1);
    res.status(200).send(houses);
  },
};
