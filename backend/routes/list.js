const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");


//C create
router.post("/addTask", async(req, res) => {
    try {
        const {title, body, id} = req.body;
        const existingUser = await User.findById(id);
    
        if(existingUser){
            const list = new List({title,body,user:existingUser});
            await list.save().then(()=>res.status(200).json({list}));
            existingUser.list.push(list);
            existingUser.save();
            } 
        }
            catch (error) {
            console.log(error);
        }
});   

//U update,put
router.put("/updateTask/:id", async(req, res) => {
    try {
            const{title,body}=req.body;
            const list = await List.findByIdAndUpdate(req.params.id,{title, body});

            list.save().then(()=>res.status(200).json({message: "task updated"}));
            
        }
            catch (error) {
            console.log(error);
        }
});   

//D delete
router.delete("/deleteTask/:id", async(req, res) => {
    try {
        const {id} = req.body;
        const existingUser = await User.findByIdAndUpdate(id);
    
        if(existingUser){
            const list = await List.findByIdAndDelete(req.params.id)
            .then(()=>res.status(200).json({message: "task deleted"}));
            } 
        }
            catch (error) {
            console.log(error);
        }
});   

//Read, get task
router.get("/getTask/:id", async(req,res)=>{
    const list = await List.find({user:req.params.id});
    if(list.length!==0){
        res.status(200).json({list});
    }
    else{
        res.status(200).json({message:"No task added, empty"});
    }
});


module.exports = router;