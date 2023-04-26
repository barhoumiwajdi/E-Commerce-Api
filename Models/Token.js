const mongoose = require("mongoose");
const { Schema } = mongoose;
const tokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    token: String
}, { timestamps: true, versionKey: false })
module.exports = mongoose.model('token', tokenSchema)