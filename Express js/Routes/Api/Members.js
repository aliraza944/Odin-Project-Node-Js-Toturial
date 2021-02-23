const express = require("express");
const members = require("../../Members");
const uuid = require("uuid");
const router = express.Router();

//get request for api of members
router.get("/", (req, res) => {
  res.json(members);
});

//get a single member from an api

router.get("/:id", (req, res) => {
  const found = members.some((member) => {
    return member.id === parseInt(req.params.id);
  });

  if (found) {
    res.json(
      members.filter((member) => {
        return member.id === parseInt(req.params.id);
      })
    );
  } else {
    res
      .status(400)
      .json({ msg: `no member of the id of ${req.params.id} found` });
  }
});

router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
  };
  if (!newMember.first_name || !newMember.last_name) {
    return res.status(400).json({ msg: "please include the name " });
  } //end if
  members.push(newMember);
  // res.json(members);
  res.redirect("/");
});

// udate a member'

router.put("/:id", (req, res) => {
  const found = members.some((member) => {
    return member.id === parseInt(req.params.id);
  });

  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        //firstname
        member.first_name = updateMember.first_name
          ? updateMember.first_name
          : member.first_name;

        //    lastname
        member.last_name = updateMember.last_name
          ? updateMember.last_name
          : member.last_name;
        //   email
        member.email = updateMember.email ? updateMember.email : member.email;
        //   gender
        member.gender = updateMember.gender
          ? updateMember.gender
          : member.gender;
        res.json({ msg: "member updated", member });
      }
    }); //end forEach loop
  } else {
    res
      .status(400)
      .json({ msg: `no member of the id of ${req.params.id} found` });
  }
});

// delete a memeber

router.delete("/:id", (req, res) => {
  const found = members.some((member) => {
    return member.id === parseInt(req.params.id);
  });

  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter((member) => {
        return member.id !== parseInt(req.params.id);
      }),
    });
  } else {
    res
      .status(400)
      .json({ msg: `no member of the id of ${req.params.id} found` });
  }
});

module.exports = router;
