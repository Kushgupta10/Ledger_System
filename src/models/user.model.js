const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [ true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
            "Invalid Email address"
        ],
        unique: [true, "Email already exists."]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    password:{
        type: String,
        required:[true, "Password is required"],
        minlength: [6, "Password should contain more than 6 character"],
        select: false  //this field prevent password to select when user model is brought from db to server 
    },
    systemUser: {
        type: Boolean,
        default: false,
        immutable: true,
        select: false
    }
}, {
    timestamps: true
})

// hash password before saving in db
userSchema.pre("save", async function(next){

if(!this.isModified("password")){
    return 
}

const hash = await bcrypt.hash(this.password, 10)
this.password = hash

return 

})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password) //bcrypt.compare return true or false
}


const userModel = mongoose.model("user", userSchema)

module.exports = userModel