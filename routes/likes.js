const express = require('express');
const router = express.Router();
const {storeLikes, checkUserLiked, totalLikesForAContent}  = require('../models/like');
const NodeCache = require('node-cache');
const myCache = new NodeCache();

//Store Likes
router.post('/',(req,res)=>{
    const { user_id, content_id } = req.body;

    if(!user_id || !content_id){
        return res.status(400).json({ error: 'user_id and content_id are required' });
    }

    try{
        storeLikes({user_id, content_id});

        // Sending push notification after 100 likes
        if (totalLikesForAContent(content_id) === 100) {
            console.log(`User ${user_id} has received 100 likes for content ${content_id}. Sending push notification.`);
        }
        return res.status(201).json({ message: 'Like event stored successfully' });
    }
    catch(err){
        return res.status(500).json({error:err});
    }
});

//Check User liked
router.get('/check',(req,res)=>{
    const { user_id, content_id } = req.query;
    let liked;

    if(!user_id || !content_id){
        return res.status(400).json({ error: 'user_id and content_id are required' });
    }

    try{
        const value = myCache.get(`check?user_id=${user_id}&content_id=${content_id}`);
        if(value!==undefined){
            liked = value;
        }
        else{
            liked = checkUserLiked({ user_id, content_id });
            myCache.set(`check?user_id=${user_id}&content_id=${content_id}`,liked,180);
        }
        return res.status(200).json({liked});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
});

//Get total like count
router.get('/count',(req,res)=>{
    const {content_id} = req.query;
    let totalLikes;
    if(!content_id){
        return res.status(400).json({ error: 'content_id is required' });
    }

    try{
        const value = myCache.get(`count?content_id=${content_id}`);
        if(value!==undefined){
            totalLikes = value;
        }
        else{
            totalLikes = totalLikesForAContent(content_id);
            myCache.set(`count?content_id=${content_id}`,totalLikes,180);
        }
        
        return res.status(200).json({totalLikes});
    }
    catch(err){
        return res.status(500).json({error:err});
    }
});

module.exports = router;