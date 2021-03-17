import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

})

const Schema = mongoose.model('User', userSchema);

export default Schema;