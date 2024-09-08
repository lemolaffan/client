const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())



const uri = "mongodb://localhost:27017"

// const uri = "mongodb+srv://Ummah2019:Ummah2019@cluster0.ptbuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



//eta na korle habe na 
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //

        const database = client.db("usersDB");
        const userCollection = database.collection("users");

        //1 
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new useer', user);
            const result = await userCollection.insertOne(user);
            res.send(result);


        })
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.delete('/users/:id', async (req, res)=> {
            const id = req.params.id;
            console.log('please delete form database',id);
            const query ={_id: new ObjectId (id)}
            const result =await userCollection.deleteOne(query);
            res.send(result);


        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("simple curd is running")
})

app.listen(port, () => {
    console.log(`simple curd is running ${port}`)
})