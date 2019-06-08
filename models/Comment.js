const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false,
        default: "Anyomous"
    },
    comment: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;