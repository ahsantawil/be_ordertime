const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    nameCategory : {
        type: String,
        require: [true, 'Category is required'],
        maxLength: [125, 'maximum character length 125']
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);