import React from 'react';
import '../../css/message.css';
// import Loading from '../Loading/loading'

const Messages = (props) => {
  
   
//   console.log("Props",props.text[0])
//   let text=`${props.text[0]} ${props.text[1]} ${props.text[2]} ${props.text[3]} ${props.text[4]}`
let email=props.text[0]?props.text[0]:'';
let location=props.text[1]?props.text[1]:'';
let mob=props.text[2]?props.text[2]:'';
let name=props.text[3]?props.text[3]:'';
let whatsapp=props.text[4]?props.text[4]:'';
let text=`${name} \n ${location} \n ${email} \n ${mob} \n ${whatsapp}`
//    console.log(props.text['email'])
//    console.log(props.text[1])
    return (
        props.type=='extra_details'||props.speaks === 'bot'  ? 
            <div style={{ overflow: 'hidden', width: '100%', marginTop: 10 }}>
                <div style={{ display: 'inline-block', width: '14%' }} >
                    <img src={require('../../images/chatbot.png')} alt="botHead" style={{ width: 32, height: 37 }} className="circle responsive-img"></img>
                </div>
           
                <div className="left-message-parent ">
                    <div className="left-message card-panel z-depth-1">
                        <div className="row valign-wrapper">
                            <div className="col s10">
                                <div className="black-text">
                                   {text}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="right-message-parent ">
                <div className="right-message card-panel z-depth-6">
                    <div className="row valign-wrapper" style={{ marginBottom: 5,padding:5 }}>
                        <div className="col s12" >
                            <span className="white-text" style={{ padding: 'inherit', fontSize: 14, display: 'inline-block' }}>
                           {props.text}
                            </span>
                        </div>
                        
                    </div>
                   
                </div>
                <div style={{overflow: 'hidden', clear: 'both', textAlign: 'right', fontSize: 10, marginRight: 8, color: '#8f9c9c'}}>{props.time}</div>
            </div>
    )
}
export default Messages;