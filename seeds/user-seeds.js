const {User}=require('../models');
const userData=[{
    username:"Shawn",
    email:"srclarke777@gmail.com",
    password:"password1234",
    user_id:'1'

}
];

const seedUsers=()=>User.bulkCreate(userData);

module.exports=seedUsers;