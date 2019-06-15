const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        //required: true
    },
    image: {
        type: String,
        required: false,
        default: '/images/defaultimg.png'
    },
    summary: {
        type: String,
        //required: true
    },
    url: {
        type: String,
        required: false,
        default: 'no link available'
    },
    category: {
        type: String,
        //required: true
    },
    comment: {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;