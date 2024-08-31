import { Router } from "express";
import {
  getPeople,
  postPeople,
  getPeopleById,
  putPeople,
  deletePeople,
} from "../Controller/people.js";
import {
  postPeopleValidate,
  putPeopleValidate,
} from "../helpers/validation/PeopleValidation.js";

const router = Router();

router.get("/", getPeople);
router.get("/:id", getPeopleById);
router.post("/", postPeopleValidate, postPeople);
router.put("/:id", putPeopleValidate, putPeople);
router.delete("/:id", deletePeople);

export default router;
