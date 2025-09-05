const { Schema, default: mongoose } = require("mongoose");
const { hashPassword } = require('../utils/passwordHandler');

const userSchema = new Schema(
    {
        username : {type: String, required: true, unique: [true, "User name is already taken"]},
        email: {
            type: String,
            required :[true, "Please provide email"],
             match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, 'Please provide a valid email address'],
             unique: true,
        },
        phoneNumber: String,
        address: String,
        password: {type: String, required: true, minLength: 8, maxLength: 16}
    }
)

userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Hash the password before saving
  this.password = await hashPassword(this.password)
  next();
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;