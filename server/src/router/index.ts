import * as express from "express";
import {
  activationLinkResolver,
  loginResolver,
  logoutResolver,
  refreshResolver,
  registrationResolver,
  usersResolver,
} from "../resolver";

export const router = express.Router();

router.post("/registration", registrationResolver);
router.post("/login", loginResolver);
router.post("/logout", logoutResolver);
router.get("/activate/:link", activationLinkResolver);
router.get("/refresh", refreshResolver);
router.get("/users", usersResolver);
