import React from 'react';
import '../../css/message.css';
// import Loading from '../Loading/loading'

const Messages = (props) => {
  
let nomsg="PetBot"
   if(props.type=="extra_details"){
//    let {email,location,mob,name,whatsapp}=props.detailSchema.structValue.fields;
let email=props.detailSchema.structValue.fields.request_detail_email.stringValue
console.log(email)
   
   } 
//    console.log(email)
    return (
        props.type=='extra_details'||props.speaks === 'bot'  ? 
            <div style={{ overflow: 'hidden', width: '100%', marginTop: 10 }}>
                <div style={{ display: 'inline-block', width: '14%' }} >
                    <img src={require('../../images/chatbot.png')} alt="botHead" style={{ width: 32, height: 37 }} className="circle responsive-img"></img>
                </div>
           
                <div className="left-message-parent " style={{ display: 'inline-block', width: '70%' }}>
                    <div className="left-message card-panel z-depth-1" style={{ backgroundColor: '#eeeef1', padding: 5, borderRadius: 25, width: 'fit-content', clear: 'both', position: 'relative', borderColor: '#ddd', borderWidth: 2, borderStyle: 'solid', minWidth: 49 }}>
                        <div className="row valign-wrapper" style={{ marginBottom: 0 }}>
                            <div className="col s10" style={{ paddingRight: 15 }}>
                                <div className="black-text" style={{ padding: 5, fontSize: 14 }}>
                                   {props.text===''?nomsg:props.text}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="right-message-parent " style={{ marginTop: 10, overflow: 'hidden' }}>
                <div className="right-message card-panel z-depth-6" style={{ marginBottom: 0, marginTop: 0.1, backgroundColor: '#46BDDF', padding: 5, borderRadius: 40, width: 'fit-content', clear: 'both', float: 'right', position: 'relative' }}>
                    <div className="row valign-wrapper" style={{ marginBottom: 5 }}>
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