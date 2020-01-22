'use strict'
const dialogflow=require('dialogflow')
const config=require('../config/keys')
const structjson=require('structjson')
const projectID=config.googleProjectID;

const credentials={
    client_email:config.googleClientEmail,
    private_key:config.googlePrivateKey
};


const sessionClient=new dialogflow.SessionsClient({projectID,credentials})

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
    console.log("EVENT RESPONSES",responses)
    return responses

}




}