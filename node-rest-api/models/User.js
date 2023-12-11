const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            requires: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        profilePicture: {
            type: String,
            default: ""
        },
        coverPicture: {
            type: String,
            default: ""
        },
        followers: {
            type: Array,
            default: []
        },
        followings: {
            type: Array,
            default: []
        },
        isAdmin: {
            tyep: Boolean,
        },
        desc:{
            type:String,
            max:50,
        },
        city:{
            type:String,
            max:50
        },
        from:{
            type:String,
            max:50
        },
        relationship:{
            type:Number,
            enum:[1,2,3]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

/**
 * in this we can also use enum
 * 1 represent single
 * 2 represent married
 * 3 complex or something like that
 */