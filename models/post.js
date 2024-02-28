import { DataTypes } from "sequelize";
import sequelize from "../config/connection";

const{Model,Datatypes}=require(sequelize);

class Post extends Model{}

Post.init({
    id:{
        type:Datatypes.INTEGER,
        allownull:false,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type: Datatypes.STRING,
        allowNull:false
    },
    post_text:{
        type: DataTypes.TEXT,
        allowNull:false,
        validate:{
            len:[1]
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id'
        }
    }
},
{
    sequelize,
    freezeTableName:true,
    underscored:true,
    modelName:'post'
}
)

module.exports=Post;