const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port =  process.env.PORT || 5000


console.log(process.env.DB_USERUNIVERSE)
console.log(process.env.DB_PASSUNIVERSE)


app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
  res.send('The Universe Server!')
})

///////mongodb//////////////////



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERUNIVERSE}:${process.env.DB_PASSUNIVERSE}@cluster0.ruz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    
    ///crud//////////
     
    ////burgerData///////////

     const burgerCollection = client.db('burgerDB').collection('burgerData')

     app.get('/burgerData',  async(req, res) => {
     
        const cursor = burgerCollection.find() 
        const result = await cursor.toArray()
        res.send(result)

     })

    ////burgerData/////////// 

    
    ////dishData////
     const dishCollection = client.db('dishDB').collection('dishData')

     app.get('/dishData', async(req, res) =>{

        const cursor = dishCollection.find()
        const result = await cursor.toArray()
        res.send(result)

     })
    ////dishData//// 


    ////sweetDB////
 
    const sweetCollection = client.db('sweetDB').collection('sweetData') 

    app.get('/sweetData', async(req, res) =>{

       const cursor = sweetCollection.find() 
       const result = await cursor.toArray()
       res.send(result)

   }) 

    ////sweetDB////

    


 
    ///crud//////////

 


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
} 
run().catch(console.dir);


///////mongodb//////////////////

app.listen(port, () => {
  console.log(`The Universe Server port ${port}`)
})