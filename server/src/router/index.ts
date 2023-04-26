import * as express from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  activationLinkResolver,
  loginResolver,
  logoutResolver,
  refreshResolver,
  registrationResolver,
  usersResolver,
} from "../resolver";

export const router = express.Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  registrationResolver
);
router.post("/login", loginResolver);
router.post("/logout", logoutResolver);
router.get("/activate/:link", activationLinkResolver);
router.get("/refresh", refreshResolver);
router.get("/users", authMiddleware, usersResolver);
