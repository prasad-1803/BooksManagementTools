import express from "express";
import mysql from "mysql";
import cors from "cors";

const app=express();

app.use(cors());

const PORT=8800;

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pass@123",
    database:"library"
});

app.get("/",(req,res)=>{
res.send("Hello World");
});


app.get("/books",(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
    });



app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});