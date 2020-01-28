const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    name:String,
    mobile:String,
    address:String,
    registerDate:Date
})
mongoose.model('user',userSchema)