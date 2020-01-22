const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json());


require('./routes/dialogFlowRoutes')(app);

app.listen(process.env.PORT||5000,()=>{
    console.log('server is running')
})