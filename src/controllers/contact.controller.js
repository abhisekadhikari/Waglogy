import { Contact } from "../models/contact.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

const homeContact = asyncHandler(async (req, res) => {
    console.log(req.body)
})

const contact = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body

    if ([name, email, subject, message].some((elem) => elem?.trim() === "")) {
        throw new ApiError(400, "Fill all the fields")
    }

    const existedUser = await Contact.findOne({ email })

    if (existedUser) {
        throw new ApiError(400, "User already exists")
    }

    const user = await Contact.create({
        name,
        email,
        subject,
        message,
    })

    const createdUser = await Contact.findById(user._id)

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while sending the message to the server"
        )
    }
    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "Message sent successfully"))
})

export { contact }
