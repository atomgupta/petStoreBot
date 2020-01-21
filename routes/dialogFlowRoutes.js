
const chatbot=require('../chatbot/chatbot')
const dialogflow=require('dialogflow')

module.exports=app=>{


    app.get('/',(req,res)=>{
        res.send("herllll")
    })

app.post('/api/df_text_query', async(req,res)=>{
let responses=await chatbot.textQuery(req.body.text);
res.send(responses)


});
app.post('/api/df_event_query',async(req,res)=>{

let responses=await chatbot.eventQuery(req.body.event)
let response=responses[0].queryResult.fulfillmentMessages[1].text.text;
res.send(response)

});


}