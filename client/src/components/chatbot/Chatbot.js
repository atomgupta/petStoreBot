import React from 'react'
import '../../css/chatbot.css'
import Message from './Message'
const axios=require('axios');

class Chatbot extends React.Component{
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

  for (let msg of res.data[0].queryResult.fulfillmentMessages ) {
     
      says = {
          speaks: 'bot',
          msg: msg
      }
      this.setState({ messages: [...this.state.messages, says]});
  }
  console.log(res.data[0].queryResult.fulfillmentMessages[0].text.text)
};

//event handle function
async df_event_query(event){
const res=await axios.post('http://localhost:5000/api/df_event_query',{event:event})
for(let msg of res.data[0].queryResult.fulfillmentMessages){
  let says={
    speaks:'bot',
    msg:msg
  }
  this.setState({messages:[...this.state.messages,says]})
}
};

renderOneMessage(message,i){
  if(message.msg && message.msg.text && message.msg.text.text){
    return <Message key={i} text={message.msg.text.text} speaks={message.speaks}/>
  }
}
renderMMessages(stateMessages){
  if(stateMessages){
     return stateMessages.map((message,i)=>{
      return this.renderOneMessage(message,i);
    })
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
    render(){
      
        let showBot = (
            <div className="chat-bot-icon-parent">
              <div onClick={this.showBot}>
                <img alt="chat-bot-icon" src={require("../../images/companyicon.png")} className="chatboticon"/>
              </div>
              {/* <div ref={el => {
                  this.messagesEnd = el;
                }} style={{ float: "left", clear: "both" }}
              /> */}
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
                  
                   {this.renderMMessages(this.state.messages)}


                    <div className="message-body" id="message-body">

                    </div>



                <div className="col s12">
                <div className="brand-reference-div">
                    <div className="end-footer">
                      <div>
                        <a target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff",textDecoration:'none',paddingTop:'6px',paddingBottom:'6px'}} href="https://cogniaim.com/">
                          Powered by CogniAIm
                        </a>
                      </div>
                    </div>
                   </div>
                    <input style={{margin:0,paddingLeft:'1%',paddingRight:'1%',width:'97%',borderRadius:"4px"}} placeholder="type your message here" type="text" onKeyPress={this._handleInputKeyPress}/>
                </div>
            </div>
                 
              <div className="chat-bot-icon-parent">
              <div onClick={this.hideBot}>
                <img alt="chat-bot-icon" src={require("../../images/companyicon.png")} className="chatboticon"/>
              </div>
              {/* <div ref={el => {
                  this.messagesEnd = el;
                }} style={{ float: "left", clear: "both" }}
              /> */}
            </div>
                </div>
                
                
              )
              return showBot
          }
          return showBot
        
        
    }
}

export default Chatbot