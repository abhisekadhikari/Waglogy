import HomeContact from "../models/homeContact.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const homeContact = asyncHandler(async (req, res) => {
    const { name, category, service } = req.body

    if ([name, category, service].some((elem) => elem?.trim() === "")) {
        throw new ApiError(400, "Please fill all the fields")
    }

    const homeContact = await HomeContact.create({
        name,
        category,
        service,
    })
    const findHomeContact = await HomeContact.findById(homeContact._id)

    if (!findHomeContact) {
        throw new ApiError(
            501,
            "something went wrong while sending the message"
        )
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                findHomeContact,
                "Your message has successfully recorded."
            )
        )
})

export { homeContact }
