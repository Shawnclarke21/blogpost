const seedUsers =require('./user-seeds');
const seedPosts=require('./post-seeds');
const commentseed=require('./comment-seeds');

const sequalize=require('../config/connection');

const seedAll= async()=>{
    await sequalize.sync({force:true});
   
    await seedUsers();
   
    await seedPosts();
  
    await commentseed('comments seeded');

    process.exit(0);
};

seedAll();