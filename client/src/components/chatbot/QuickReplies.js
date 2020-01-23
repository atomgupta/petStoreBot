import React, { Component } from 'react';
import QuickReply from './QuickReply';
import '../../css/quickReplies.css'


class QuickReplies extends Component {

    constructor(props){
        super();
        // console.log("props of quick",props)
    }
    _handleClick=(event, payload, text)=> {
        this.props.replyClick(event, payload, text);
    }

    renderQuickReply(reply, i) {
        return <QuickReply key={i} click={this._handleClick} reply={reply} />;
    }

    renderQuickReplies(quickReplies) {
        if (quickReplies) {
            return quickReplies.map((reply, i) => {
                    return this.renderQuickReply(reply, i);
                }
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="quick-replies-parent">
               
                    
                        {/* <div className="quick-reply-speaks">
                            <a href="/" className="">{this.props.speaks}</a>
                        </div> */}
                        
                        <div id="quick-replies" className="">
                            
                            {this.renderQuickReplies(this.props.payload)}
                            {/* {this.props.text && <p>
                                {this.props.text.stringValue}
                            </p>
                            } */}
                        </div>
                    
               
            </div>
        );
    }
}

export default QuickReplies;


