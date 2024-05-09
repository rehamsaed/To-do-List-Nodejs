//to handel methods
const express=require("express")
//to get data from body of ejs
const bodyParser=require("body-parser")
//to controll mongo with nodejs
const mongoos=require("mongoose")
//model 
const Todo=require("./models/todo")
//ejs
const ejs=require("ejs")
//express function 
const app=express()
//port 
const port=4000
//templete engine
app.set("view engine","ejs")
//to use css in folder public
app.use(express.static('public'))
//middel ware 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//connect to database
mongoos.connect("mongodb://0.0.0.0:27017/todolist",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
console.log("connected")
}).catch((err)=>{
    console.log(err)
})

//retrive data and show it in root/
app.get ("/",(req,res)=>{
    Todo.find()
    .then(result =>{
        res.render("index",{data:result})
        // console.log(result)
        
    })

})

//add 
app.post("/",(req,res)=>{
    //object from schema
    const todo = new Todo({
        todo:req.body.todoValue
    })
    todo.save()
    .then(()=> {
    res.redirect("/")
    })
})


//delete
app.delete("/:id",(req,res)=>{
    Todo.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.send("succes")
    })
})


//port TCP to enter to link
app.listen(port,()=>{
    console.log("server running")
})


