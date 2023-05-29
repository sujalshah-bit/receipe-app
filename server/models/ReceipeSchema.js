const mongoose = require('mongoose')
 const  bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ReceipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    ingredients:[{ type:String, required:true }],
    instruction:{
        type:String,
        required:true,
    },
    cookingTime:{
        type:Number,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

const ReceipeModal = mongoose.model("receipes", ReceipeSchema)
module.exports = ReceipeModal