const  mongoose=require('mongoose');
const {Schema}=mongoose;
const productSchema=new Schema({
    //name of product
    name:String,
     //price of product
    price:String,
    //category of product means grooming,food,toys or other
    Category:String,
    //img image of the product
    image:String,
    //for means for which animal the product is??Dog,cat,fish,hamster
     for:String,
    //

})
mongoose.model('product',productSchema);