import mongoose from 'mongoose'
const homeContactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        service: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
const HomeContact = mongoose.model('HomeContact', homeContactSchema)

export default HomeContact