const {WebhookClient} = require('dialogflow-fulfillment');
const { Payload } = require("dialogflow-fulfillment");
const mongoose = require('mongoose');
const Product=mongoose.model('product');
const customPayload={
    signal_info:"cards",
    cards:[]
}


//  Product.find({name:'Duck Jerky'},(err,products)=>{
//     if(products!==null){
//     //  console.log("products search from db",product)
//     products.map(product=>{
//         customPayload.cards.push(product)
//     }) 
//     console.log(customPayload)   
// }  
//  })
 


module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });
        
        
        function fallback(agent) {
            agent.add(`Bhai samjh nahi aya`);
            agent.add(`I'm sorry, can you try again?`);
        }

       async function foodProducts(agent){
       console.log("AGENT VALUE",agent.parameters.animal)
       let products =  await Product.find({for:agent.parameters.animal?agent.parameters.animal:'dog'},(err,products)=>{
            if(products.length>0)
                return products;
            else
                return ;             
         });
         customPayload.cards=products
        //  console.log("CUSTOM PAYLOAD",customPayload);
        if(customPayload.cards.length>0)
        { 
        agent.add('Here are some products available')

        agent.add(
         new Payload(agent.UNSPECIFIED, customPayload, {rawPayload: true, sendAsMessage: true})
       );
        }
        else{
            agent.add('nothing found in the database')
        }           
       }




        let intentMap = new Map();
        intentMap.set('FOOD',foodProducts)
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });
    app.get('/',(req,res)=>{
        //         // const agent = new WebhookClient({ request: req, response: res });
        //         // function snoopy(agent) {
        //         //     agent.add(`Welcome to my Snoopy fulfillment!`);
        //         // }
        //         // let intentMap = new Map();
        //         // intentMap.set('snoopy', snoopy);
        //         // agent.handleRequest(intentMap);
                res.send({"test":"center"})
             })

}




// const payload = {
//     signal_info: "cards",
//     cards: [
//       {
//         header: "Duck Jerky",
//         available: "For:Dogs",
//         price_range: "$20-$40",
//         img: "https://www.pettz.com/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/c/0/c01304-6.jpg"
//       },
//       {
//     header: "Dried Chicken",
//     available: "For:Cats",
//     price_range: "$12-24",
//     img: "https://cdn.shopify.com/s/files/1/2133/9385/products/CatKibble-RC-Chicken-1080x1080_0b97bb13-4ad3-4d57-a603-d93f54d84f1c_600x.jpg?v=1571710492"
//       },
//       {
//         header: "Shish Kabob",
//     available: "For:Dogs",
//         price_range: "$20-120",
//         img: "https://www.pettz.com/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/c/0/c01361.jpg"
//       },
//       {
//         header: "Chips",
//         available: "For:Dogs",
//         price_range: "$20-40",
//         img: "https://www.pettz.com/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/c/1/c10090-16.jpg"
//       },
//       {
//         header: "Pressed bones",
//         available: "For:Dogs",
//         price_range: "$20-30",
//         img: "https://www.pettz.com/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/c/0/c00830-12.jpg"
//       },
//       {
//         header: "Minced Tuna",
//         available: "For:Cats",
//         price_range: "$24.99",
//         img: "https://cdn.shopify.com/s/files/1/2133/9385/products/791411_d7563599-687c-4f0b-bee2-d2c98f9e98d6_600x.jpg?v=1571710390"
//       }
//     ]
//   };