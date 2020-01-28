'use strict'
const dialogflow=require('dialogflow')
const config=require('../config/keys')
const structjson=require('structjson')
const mongoose = require('mongoose');
const projectID=config.googleProjectID;

const credentials={
    client_email:config.googleClientEmail,
    private_key:config.googlePrivateKey
};


const sessionClient=new dialogflow.SessionsClient({projectID,credentials})
const User=mongoose.model('user')
module.exports={

textQuery:async function(text){
    const sessionPath=sessionClient.sessionPath(config.googleProjectID,config.dialogFlowSessionID)
   let self=module.exports;
   const request={
       session:sessionPath,
       queryInput:{
           text:{
           text:text,
           languageCode:config.dialogFlowSessionLanguageCode
       
       }
    }
   }
//    console.log("CHATBOT request",request)
  let responses=await sessionClient.detectIntent(request);
  
  responses=await self.handleAction(responses)
//   console.log("CHATBOT RESPONsES",responses)
  return responses;

},
eventQuery:async function(event,parameters={}){
    const sessionPath=sessionClient.sessionPath(config.googleProjectID,config.dialogFlowSessionID)

    let self=module.exports
    const request={
        session:sessionPath,
        queryInput:{
            event:{
                name:event,
                // parameters:structjson.jsonToStructProto(parameters),
                languageCode:config.dialogFlowSessionLanguageCode
            }
        }
    }
    let responses=await sessionClient.detectIntent(request)
    responses=await self.handleAction(responses)
    // console.log("EVENT RESPONSES",responses)
    return responses

},

handleAction:function(responses){
   
    let self=module.exports
    let queryResult=responses[0].queryResult;
  
    // console.log("QUERYRESULT",queryResult)
    switch(queryResult.action){
        case 'homeDeliveryYes':
            // console.log("YAAAAY")
            if(queryResult.allRequiredParamsPresent){
               self.saveRegistration(queryResult.parameters.fields)
            }
            break;
    }
return responses
},
saveRegistration:async function(fields){
const user=new User({
    name:fields.name.stringValue,
    mobile:fields.phone.stringValue,
    address:fields.address.stringValue,
    registerDate:Date.now()
})
try{
const useR=await user.save();
console.log("USER",useR)
}
catch(e){
    console.log("ERROR",e)
}
}


}