const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = mongoose.Schema({
    username : {
        type: String,
        require: [true, 'User is required'],
        maxLength : [100, 'maximum character length 100']
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        maxLength: [100, 'maximum character 100'],
        mixLength: [8, 'minimum character 8']
    },
    fullName : {
        type: String,
        require: [true, 'Name is required'],
        maxLength: [225, 'maximum character 225'],
    },
    address : {
        type: String,
        require: [true, 'address is required'],
        maxLength: [225, 'maximum character 225'],
    },
    role : {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    }
}, { timeStamps: true})

userSchema.pre('save', async function(next){
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

module.exports = mongoose.model('Users', userSchema);