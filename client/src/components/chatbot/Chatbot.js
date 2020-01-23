import React from 'react'
import '../../css/chatbot.css'
import Messages from './Message'
import QuickReplies from './QuickReplies'
const axios=require('axios');


class Chatbot extends React.Component{
  messagesEnd;
  talkInput;
  //constructor

    constructor(props){
    
      //super      
        super(props)
      
        //state

        this.state={
            messages:[],
            showBot:false,
        }

        //bindings

      this.showBot=this.showBot.bind(this);
      this.hideBot=this.hideBot.bind(this);
      this._handleInputKeyPress=this._handleInputKeyPress.bind(this)
      this._handleQuickReplyPayload=this._handleQuickReplyPayload.bind(this);

    }

    _handleQuickReplyPayload(event, payload, text) {
      event.preventDefault();
      event.stopPropagation();
      console.log("QUICK REPLY PAYLOAD",payload)
      console.log("QUICK REPLY TEXT",text)
      switch (payload) {
          case 'clinic info':
              this.df_event_query('SHOW_RECOMMENDATIONS');
              break;
          case 'categories':
              this.df_event_query('MASTERCLASS');
              break;
          case 'store info':
            this.df_event_query('STORE_INFO');
            break;
          default:
              this.df_text_query(text);
              break;
      }
  }
  //class functions
    showBot(event)
    {
    event.preventDefault();
    event.stopPropagation();
    this.setState({showBot:true})
}


hideBot(event)
{
    event.preventDefault();
    event.stopPropagation();
    this.setState({showBot:false})
}


async df_text_query (queryText) {        
  let says = {
      speaks: 'user',
      msg: {
          text : {
              text: queryText
          }
      }
  }
this.setState({ messages: [...this.state.messages, says]});
const res = await axios.post('http://localhost:5000/api/df_text_query',  {text: queryText});
// console.log("PAYLOAD FOR QUICK REPLIES",res.data[0].queryResult.fulfillmentMessages[1].payload.fields.quick_replies.listValue.values[0].structValue.fields.payload.stringValue)
// console.log("PAYLOAD FOR QUICK REPLIES",res.data[0].queryResult.fulfillmentMessages)
for (let msg of res.data[0].queryResult.fulfillmentMessages ) {    
      says = {
          speaks: 'bot',
          msg: msg
      }
      this.setState({ messages: [...this.state.messages, says]});
  }
  // console.log(res.data[0].queryResult.fulfillmentMessages[0].text.text)
};

//event handle function
async df_event_query(event){
const res=await axios.post('http://localhost:5000/api/df_event_query',{event:event})
console.log(res)
for(let msg of res.data[0].queryResult.fulfillmentMessages){
  let says={
    speaks:'bot',
    msg:msg
  }
  this.setState({messages:[...this.state.messages,says]})
}
};






renderMessages(stateMessages){
  if(stateMessages){
     return stateMessages.map((message,i)=>{
      return this.renderOneMessage(message,i);
    })
  }
}

renderOneMessage(message,i){
  console.log("individual message",message)
  // console.log("MESSAGE IN RENDER MESSAGE",message)
  if(message.msg && message.msg.text && message.msg.text.text){
    console.log("Normal MESSAGE TRIGGERED")
    return <Messages key={i} text={message.msg.text.text} speaks={message.speaks}/>
  }

  else if(message.msg && message.msg.payload.fields.signal_info=='custom info'){
    console.log("CUSTOM MESSAGE TRIGGERED")
    return <Messages key={i} type={'extra_details'} info={message.msg.payloads.fields.detailSchema} speaks={message.speaks}/>
  }


  else if(message.msg.payload.fields.quick_replies){
return <QuickReplies
text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
            key={i}
            replyClick={this._handleQuickReplyPayload}
            speaks={message.speaks}
            payload={message.msg.payload.fields.quick_replies.listValue.values}
            />


  }
  
}

_handleInputKeyPress(e){
  if(e.key==='Enter'){
      this.df_text_query(e.target.value)
      e.target.value=''
  }
}


componentDidMount(){
  this.df_event_query('Welcome')
}


componentDidUpdate()
{
this.messagesEnd.scrollIntoView({behavior:'smooth'});
if(this.talkInput){
  this.talkInput.focus()
}
}


render(){
      
        let showBot = (
            <div className="chat-bot-icon-parent">
              <div onClick={this.showBot}>
                <img alt="chat-bot-icon" src={require("../../images/companyicon.png")} className="chatboticon"/>
              </div>
              <div ref={el => {
                  this.messagesEnd = el;
                }} style={{ float: "left", clear: "both" }}
              />
            </div>
          );
          if(this.state.showBot===true){
              showBot=(
                <div className="main-container">               
                  <div className="chat-window">
                      <div className="header">
                        <img src={require('../../images/companylogo.png')} alt="companylogo" className="chat-bot-header-logo"/>
                        <p className="chat-bot-header-text">Pet Bot</p>                      
                      </div>                  
                      <div className="message-body" id="message-body">
                                {this.renderMessages(this.state.messages)}
                                <div ref={el => {
                              this.messagesEnd = el;
                            }} style={{ float: "left", clear: "both" }}
                          />{console.log("messages in state",this.state.messages)}
                      </div>
                      <div className="end-div">
                        <div className="brand-reference-div">
                            <div className="end-footer">
                              <div>
                                <a target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff",textDecoration:'none',paddingTop:'6px',paddingBottom:'6px'}} href="https://cogniaim.com/">
                                  Powered by CogniAIm
                                </a>
                              </div>
                            </div>
                        </div>
                        <input id="message-input" placeholder="type your message here" type="text" onKeyPress={this._handleInputKeyPress}/>
                    </div>          
                  </div>
                 
                  <div className="chat-bot-icon-parent">
                    <div onClick={this.hideBot}>
                      <img alt="chat-bot-icon" src={require("../../images/companyicon.png")} className="chatboticon"/>
                    </div>
                  </div>
               </div>
              )
              return showBot
          }
          return showBot        
    }
}

export default Chatbot