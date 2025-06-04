import { Webhook } from 'svix'
import User from '../Models/User.Model.js'
import { json } from 'express';

const clerkWebhooks =  async (req,res) =>{
    try {
        // Create a svix instance with clerk webhook instance
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECERT);
        // Getting Header
        const headers = {
            'svix-id':req.headers['svix-id'],
            'svix-timestamp':req.headers['svix-timestamp'],
            'svix-signature':req.headers['svix-signature']
        };

        //verifying Header
        await whook.verify(json.stringify(req.body),headers)
        
        // Geeting data from request body

        const {data,type} = req.body
        const userData = {
            _id:data.id,
            email:data.email_addresses[0].email_addresses,
            username:data.first_name + " " + data.last_name,
            image:data.image_url,
        }
     

        // Switch case  for different event
        switch(type){
            case "user.created":{
                await User.create(userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndUpdate(data.id,userData);
                break;
            }

            default:
                break;
        }

        res.json({success:true,message:"Webhook Recieved"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})

        
    }
}

export default clerkWebhooks;