const mongoose = require('mongoose');

let picSchema = mongoose.Schema({
    fullName : {
        type: String,
        require: [true, 'Name is required'],
        maxLength: [255, 'maximum character length 225']
    },
    phoneNumber : {
        type: Number,
        require: [true, 'Phone number is required'],
        maxLength: [13, 'maximun phone number lenght 13'],
        minLength: [9, 'minimun phone number lenght 9']
    },
    jobTitle : {
        type: String,
        require: [true, 'Job Title is required'],
        maxLength: [50, 'maximum character length 225']
    }
}, { timestamps: true });

module.exports = mongoose.model('Pic', picSchema);