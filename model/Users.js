import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    is_success: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        default: 'mehul_agarwal_10102001'
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Simple regex for email validation
    },
    roll_number: {
        type: String,
        required: true
    },
    numbers: {
        type: [String]
    },
    alphabets: {
        type: [String]
    },
    highest_lowercase_alphabet: {
        type: [String]
    }
});

const User = mongoose.model('User', userSchema);
export default User;
// module.exports = User;
