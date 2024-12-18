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



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    

    ////dessertData////

    const dessertCollection = client.db('dessertDB').collection('dessertData')

    app.get('/dessertData', async(req, res) =>{
       
       const cursor = dessertCollection.find()
       const result = await cursor.toArray() 
       res.send(result)
      
    })
    ////dessertData////

    ////softData////

    const softCollection = client.db('softDB').collection('softData')

    app.get('/softData', async(req, res) =>{
       
       const cursor = softCollection.find()
       const result = await cursor.toArray() 
       res.send(result)
      
    })


    ////softData////


    ////milkData///

    
    const milkCollection = client.db('milkDB').collection('milkData')

    app.get('/milkData', async(req, res) =>{
       
       const cursor = milkCollection.find()
       const result = await cursor.toArray() 
       res.send(result)
      
    })

    ////milkData///


    ////smoothData///
 
    
    const smoothCollection = client.db('smoothDB').collection('smoothData')

    app.get('/smoothData', async(req, res) =>{
       
       const cursor = smoothCollection.find()
       const result = await cursor.toArray() 
       res.send(result)
      
    })

    ////smoothData///

    ////galleryData///
 
    
    const galleryCollection = client.db('galleryDB').collection('galleryData')

    app.get('/galleryData', async(req, res) =>{
       
       const cursor = galleryCollection.find()
       const result = await cursor.toArray() 
       res.send(result)
      
    })

    ////galleryData///

    ///blogData////

    const UniverseBlogCollection = client.db('universeBlogDB').collection('universeBlogData')

    app.get('/universeBlogData', async(req, res) =>{
       
      const cursor = UniverseBlogCollection.find()
      const result = await cursor.toArray() 
      res.send(result)
     
   })

    ///blogData////


    //universeShopData//

    const shopCollection = client.db('universeShopDB').collection('universeShopData')

    app.get('/universeShopData', async(req, res) =>{
       
      const cursor = shopCollection.find()
      const result = await cursor.toArray()
      res.send(result)
     
    })

   

    ////crud operation/////////////

    const universeCollection = client.db('universeCrudDB').collection('universeCrudData')
    

    /////add system////////

    app.post('/universeCrudData', async(req, res) =>{
       
       const universeCrudData = req.body 
       console.log(universeCrudData)
       const result = await universeCollection.insertOne(universeCrudData)
       res.send(result)
     
    }) 
    /////add system////////


    /////read system///////
        

    app.get('/universeCrudData', async(req, res) =>{
       
       const cursor = universeCollection.find()
       const result = await cursor.toArray();
       res.send(result)
    
     }) 


    /////read system///////


    /////delete system//////
  
      
    app.delete('/universeCrudData/:id', async(req, res) =>{
        const id = req.params.id 
        const query = { _id: new ObjectId(id) }
        const result = await universeCollection.deleteOne(query)
        res.send(result)
    }) 
 


    /////delete system//////
 
    
    /////update system/////////
    
    app.get('/universeCrudData/:id', async(req, res) =>{
        const id = req.params.id 
        const query = { _id: new ObjectId(id) }
        const result = await universeCollection.findOne(query)
        res.send(result)
    }) 

    app.put('/universeCrudData/:id', async(req, res) => {
      const id = req.params.id 
      const upUsr = req.body 
      console.log(id, upUsr)
      const filter = { _id: new ObjectId(id) }
      const option = { upsert: true }
      const updateUser = req.body
      const upz = {
       $set: {
          image: updateUser.image,
          title: updateUser.title,
          price: updateUser.price,
          name: updateUser.name
       }
      }
      const result = await universeCollection.updateOne(filter, upz, option)
      res.send(result)
   }) 


 
    /////update system/////////

    ////crud operation/////////////
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