const follow = require('../Models/followModel');
const user = require('../Models/userModel');

exports.followUser = async (req,res) =>{
    try{
    const sender_id = req.user.id;
    const {id} = req.params;
    console.log(id);

    const reciever  = await user.findById(id);
    
    if(!reciever) return res.status(400).json("User to follow not found!");
    const existingRequest = await follow.findOne(
        {
        senderID:sender_id,
        receiverID:id,
        status:'pending'
    });

        // console.log(existingRequest);
    if(existingRequest){
        return res.status(400).json("request already sent!");
    }

    console.log(reciever.isPrivate);

    if(!reciever.isPrivate){
        let newRelation  = new follow({
            senderID: req.user.id,
            recieverID:id,
            status : 'accepted'
        })
        console.log(newRelation);
        await newRelation.save();
        
        return res.status(200).json(`${senderID} followed successfully!`);
    }
        let newRelation  = new follow({
            senderID: req.user.id,
            recieverID:id,
            status : 'pending'
        })
        await newRelation.save();
        console.log(newRelation);
        return res.status(200).json("follow request sent successfully!");

    }catch(error){
        res.status(400).json(error);
    }
}

exports.requestAccept= async (req,res)=>{
    try{
        const sender_id= req.user.id;
        // console.log(sender_id);
        // console.log(req.params);
        const reciever_id = req.params.id;
        // console.log(reciever_id);
        
        const existingRequest= await follow.findOne(
            {
            senderID:sender_id,
            receiverID:reciever_id,
            status:'pending'
        });

        if(existingRequest){
           existingRequest.status='accepted';
           await existingRequest.save();
           return res.status(200).json("Request accepted");
        }
    }catch(error){
        return res.status(400).json(error);
    }
}

exports.getFollowRequests=async(req,res)=>{
    try{
        const user = req.user;
        console.log(user);
        console.log(user.id);
            const followRequests = await follow.find({
                recieverID:user.id,
                status:'pending'
            }).populate('senderID', 'username');
        
        console.log(followRequests);
        return res.status(200).json(followRequests);
    } catch(err){
        return res.status(400).json(err);
    }
}