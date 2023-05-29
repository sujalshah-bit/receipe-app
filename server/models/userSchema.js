const mongoose = require('mongoose')
 const  bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],

    saveReceipe:[{type:mongoose.Schema.Types.ObjectId,ref:"receipes",}]
    });

userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({_id:this._id},process.env.SECERET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
      } catch (error) {
        console.log(error);
      }
}

const user = mongoose.model('USER', userSchema)
module.exports = user