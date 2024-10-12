const { model, Schema } = require('mongoose');
const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    psw: {
        type: String
    },
    tipo: {
        type: String,
        default: 'regular'
    }
    
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('users', userSchema);