const express=require('express')
const app=express()
const cors=require('cors')



const userRouter=require('./routes/userRoute')






app.use(express.json())


app.use(cors({
  origin: ['https://leul.vercel.app','http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization','Accept'],
  credentials: true,
}));

app.use('/',userRouter)


const hostname='0.0.0.0'
const port = process.env.PORT || 8000;
app.listen(port ,hostname,
            console.log("running on port: "+port )
        )
