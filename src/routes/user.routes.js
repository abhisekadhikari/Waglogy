import { Router } from "express"
import { contact } from "../controllers/contact.controller.js"
import { homeContact } from "../controllers/homeContact.controller.js"
const router = Router()

router.route("/home-contact").post(homeContact)

router.route("/contact").post(contact)

export default router
