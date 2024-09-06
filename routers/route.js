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

router.route("/").get(getPeople).post(postPeopleValidate, postPeople);
router
  .route("/:id")
  .get(getPeopleById)
  .put(putPeopleValidate, putPeople)
  .delete(deletePeople);

export default router;
