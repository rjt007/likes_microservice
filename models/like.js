const likes = [];

const storeLikes = (data)=>{
    const user_id = data.user_id;
    const content_id = data.content_id;
    likes.push({user_id, content_id});
};

const checkUserLiked = (data)=>{
    const user_id = data.user_id;
    const content_id = data.content_id;
    return likes.some((like)=>like.user_id===user_id && like.content_id===content_id);
}

const totalLikesForAContent = (content_id)=>{
    return likes.filter((like)=>like.content_id===content_id).length;
};

module.exports = {storeLikes, checkUserLiked, totalLikesForAContent};