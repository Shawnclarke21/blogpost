const{Comment}= require('../models');

const commentData=[
    {
        comment_text:"thank you for the info",
        post_id:3,
        user_id:1
    }
]

const seedComments=()=>Comment.bulkCreate(commentData);

module.exports=seedComments;