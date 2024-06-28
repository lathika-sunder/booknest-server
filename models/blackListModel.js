const mongoose=require('mongoose')
const Schema=mongoose.Schema

const blackListSchema=new Schema({
    token:{
        type:String,
        required:true,
        ref:'users'
    },

},
{
    timestamps:true
})

const BlackList=mongoose.model('BlackList',blackListSchema)
module.exports=BlackList