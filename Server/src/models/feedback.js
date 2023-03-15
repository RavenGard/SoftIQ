const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    score: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    questionRating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);