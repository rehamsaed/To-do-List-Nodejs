const  mongoose = require("mongoose")
//Schema Validation
const  Schema=mongoose.Schema({
    todo:{
        type:String,
        required:true
    }
})
//schema and const schema
const todo=mongoose.model("todos",Schema)
//to use it in another file
module.exports=todo
