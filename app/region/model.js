const mongoose = require('mongoose');

let regionSchema = mongoose.Schema({
    city : {
        type: String,
        require: [true, 'city is required'],
        maxLength: [255, 'maximum character length 225']
    },
    province : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Province'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Region', regionSchema);