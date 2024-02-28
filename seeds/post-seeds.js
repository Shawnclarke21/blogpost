const {Post}=require('../models');

const postData=[
    {
        title:'Sequelize Data Types',
        post_text:'sequalize data types are used to define a model such as with interger or string types',
        user_id:1,
    },
    {
        title:'handlebars template engine',
        post_text:'an npm package used to create templates to keep things more modular and maintainable',
        user_id:2,
    },
    {
        title:'handlebars partials',
        post_text:'partials are a part of handlebars used to create parital bits of code',
        user_id:2,
    },
    {
        title:'sessions',
        post_text:'sessions are used for when a user logs in and saves user data',
        user_id:3,
    },
]

const seedPosts=()=>Post.bulkCreate(postData);

module.exports=seedPosts;