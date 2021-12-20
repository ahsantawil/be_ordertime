const mongoose = require('mongoose');

let provinceSchema = mongoose.Schema({
    nameProvince : {
        type: String,
        require: [true, 'Province is required'],
        maxLength: [255, 'maximum character length 225']
    }
}, { timestamps: true });

module.exports = mongoose.model('Province', provinceSchema);