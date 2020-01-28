import React from 'react';
import '../../css/card.css'
const Card = (props) => {
    console.log("ONE CARD PROPS",props)
    return (
        // <div  style={{ height: 270, paddingRight:30, float: 'left'}}>
        //     <div className="card">
        //         <div className="card-image" style={{ width: 240}}>
        //             <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.img.stringValue} />
        //             <span className="card-title">{props.payload.fields.header.stringValue}</span>
        //         </div>
        //         <div className="card-content">
        //             {props.payload.fields.price_range.stringValue}
        //             <p> <a  href="/">{props.payload.fields.available.stringValue}</a></p>
        //         </div>
        //         <div className="card-action">
        //             <a target="_blank" rel="noopener noreferrer" href={props.payload.fields.price_range.stringValue}>GET NOW</a>
        //         </div>
        //     </div>
        // </div>
        <div>
       <div className="card">
           <div className="card-image">
               <img alt={props.payload.fields.name.stringValue} src={props.payload.fields.image.stringValue} />
           </div>
           <div className="card-header">
               <p>{props.payload.fields.name.stringValue}</p>
           </div>
           <div className="card-description">
               <p>{props.payload.fields.for.stringValue}</p>
           </div>
           <div className="card-button">
               <p>{props.payload.fields.price.stringValue}</p>
           </div>
       </div>

        </div>
    );
};

export default Card; 