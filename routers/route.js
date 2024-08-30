const express = require("express");
const {
  getPeople,
  postPeople,
  getPeopleById,
  putPeople,
  deletePeople,
} = require("../Controller/people");
const {
  postPeopleValidate,
  putPeopleValidate,
} = require("../helpers/validation/PeopleValidation");

const router = express.Router();

router.get("/", getPeople);
router.get("/:id", getPeopleById);
router.post("/", postPeopleValidate, postPeople);
router.put("/:id", putPeopleValidate, putPeople);
router.delete("/:id", deletePeople);

module.exports = router;
