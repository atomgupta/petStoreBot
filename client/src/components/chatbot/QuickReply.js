import React from 'react';
import '../../css/quickReply.css'


const QuickReply = (props) => {
    if (props.reply.structValue.fields.payload) {
        return (
            <a href='/' className="quick-reply-payload"
               onClick={(event) =>
                   props.click(
                       event,
                       props.reply.structValue.fields.payload.stringValue,
                       props.reply.structValue.fields.text.stringValue
                   )
               }>
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    } else {
        return (
            <a className="quick-reply-link" href={props.reply.structValue.fields.link.stringValue}
               >
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    }

};

export default QuickReply;



// import React, { Component } from 'react';
// import '../../css/quickReply.css'

// class QuickReply extends Component {

//     constructor(props) {
//         super(props);
//     }

//     redirect = async () => {
//         console.log("redirect");
//         await window.open(this.props.reply.structValue.fields.link.stringValue, '_blank');
//     }
//     render() {

//         let quickButton = (
//             <div className="btn-parent-div" style={{ width: '50%', display: 'inline-block' }}>
//             <button id='butn' style={{ padding: 3, width: '90%', margin: 3, borderRadius: 50, border: "2px", borderStyle: 'solid', borderColor: '#46BDDF', fontWeight: '350', fontSize: 15, fontFamily: 'Open Sans, sans-serif' }} type="button" className="btn  btn-rounded"
//                 onClick={(event) =>
//                     this.props.click(
//                         event,
//                         this.props.reply.structValue.fields.payload.stringValue,
//                         this.props.reply.structValue.fields.payload.stringValue
//                     )
//                 }
//             >
//                 {this.props.reply.structValue.fields.text.stringValue}
//             </button>
//         </div>
//         );

//         if (this.props.reply.structValue.fields.payload.stringValue === "Contact Us" || this.props.reply.structValue.fields.payload.stringValue === "More Details" || this.props.reply.structValue.fields.payload.stringValue === "Click Here" ) {
//             quickButton = (
//                 <div className="btn-parent-div" style={{ width: '50%', display: 'inline-block' }}>
//                 <button id='butn' style={{ padding: 3, width: '90%', margin: 3, borderRadius: 50, border: "2px", borderStyle: 'solid', borderColor: '#46BDDF', fontWeight: '350', fontSize: 15, fontFamily: 'Open Sans, sans-serif' }} type="button" className="btn  btn-rounded"
//                     onClick={(event) => {
//                         this.props.click(
//                             event,
//                             this.props.reply.structValue.fields.text.stringValue,
//                             this.props.reply.structValue.fields.text.stringValue
//                         ); this.redirect()
//                     }
//                     }
//                 >
//                   {this.props.reply.structValue.fields.text.stringValue}
//                 </button>

//             </div>
//             )
//         }
//         return (
//             <span>
//             {quickButton}
//         </span>
//         )






//     }
// }

// export default QuickReply;