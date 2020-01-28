const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const cors=require('cors');
const config=require('./config/dev')
const app=express();
require('./models/User')
require('./models/Product')
mongoose.connect(config.mongoURI,{useNewUrlParser:true})
app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json());


require('./routes/dialogFlowRoutes')(app);
require('./routes/fulfillmentRoutes')(app)

app.listen(process.env.PORT||5000,()=>{
    console.log('server is running')
})