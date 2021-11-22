const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        activated: { type: Boolean, required: false, default: false },
        avatar: { type: String, required: false },
        name: { type: String, required: false },
    },
    {
        timestamps: true,
        toJSON: { getters: true },
    }
);

module.exports = mongoose.model('User', userSchema, 'users');