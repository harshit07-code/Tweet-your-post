const express=require("express");
const path = require('path');
const app = express();
const { v4: uuidv4} =require('uuid');
const methodOverride= require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"harshit Raghuvanshi",
        content:"Working to make it more attractive !"
    },
     {
        id: uuidv4(),
        username:"John bro",
        content:"Good work bro !"
    }, {
        id:uuidv4(),
        username:"iamauser",
        content:"hello, it is working !!"
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/:id",(req,res)=>{
    let { id}= req.params;
   let post = posts.find((p)=>id===p.id);
    res.render("show.ejs",{ post});
    
}); 

app.listen(3000,()=>{
    console.log("Server is runninng");
});

app.get("/newpage",(req,res)=>{
    res.render("newpage");
});

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
   
});

app.patch("/posts/:id",(req,res)=>{
     let { id}= req.params;
     let newContent=req.body.content;
     let post=posts.find((p)=> id=== p.id);
     post.content=newContent;
     console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id=== p.id);
    res.render("edit");
    
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=> id!== p.id);
     res.redirect("/posts");
      

})

app.get("/home",(req,res)=>{
    res.render("index");
});