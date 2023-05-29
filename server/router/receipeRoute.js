const ReceipeModal = require('../models/ReceipeSchema')
const User = require("../models/userSchema");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authentication");


router.post('/',async(req,res)=>{
    const receipe = new ReceipeModal(req.body)
    try {
        const resp  = await receipe.save()
        res.json(resp)        
    } catch (err) {
        console.log("create receipe err",err);
        
    }
})
router.post('/getreceipe',async(req,res)=>{
    try {
        const resp  = await ReceipeModal.find({userOwner:req.body.gCookie})
        res.json(resp)        
    } catch (err) {
        console.log("get receipe err",err);
        
    }
})
// router.put('/',async(req,res)=>{
//     const { userId, receipeId } = req.body
//     try {
//        const receipe = await ReceipeModal.findById(receipeId)
//        const user = await User.findById(userId)
//        user.saveReceipe.push(receipe)
//        await user.save()
//         res.json({savedReceipe: user.saveReceipe})        
//     } catch (err) {
//         console.log("put receipe err",err);
        
//     }
// })
router.post('/id',async(req,res)=>{
    const {  receipeId } = req.body
    try {
       const receipe = await ReceipeModal.findById(receipeId)
    //    res.send(receipe)
    res.json({ message: "receipe sends", receipe });      
    } catch (err) {
        console.log("put receipe err",err);
        
    }
})
// router.get('/savedreceipe/id',async(req,res)=>{
//     const { userId } = req.body
//     try {
//        const user = await User.findById(userId)
        
//         res.json({savedReceipe: user?.saveReceipe})        
//     } catch (err) {
//         console.log("saved id receipe err",err);
        
//     }
// })
// router.get('/savedreceipe/',async(req,res)=>{
//     const { userId } = req.body
//     try {
//         const user = await User.findById(userId)
//         const savedReceipe = await ReceipeModal.findById({
//             _id: { $in: user.saveReceipe },
//         })
//         res.json({savedReceipe})        
//     } catch (err) {
//         console.log("save receipe err",err);
        
//     }
// })






module.exports = router