import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { ClassValidation } from "./class.validation";
import { ClassController } from "./class.controller";



const router = Router();
router.post(
  '/create-classes',auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ClassValidation.createClassValidation),
 ClassController.createNewClassIntoDB
);
router.get(
  '/my-classes',auth(ENUM_USER_ROLE.TRAINER),
 ClassController.getMyClassFromDB
);


export const ClassRoutes = router;