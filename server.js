const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

const likesRoute = require('./routes/likes');

//CORS Setting
const CorsOptions = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH'
    ],
  
    allowedHeaders: [
      'Content-Type', 'Authorization'
    ],
};
  
app.use(cors(CorsOptions));
app.use(express.json());

app.get('/',(req,res)=>{
  res.json({success:true});
})

app.use('/api/likes',likesRoute);

app.listen(PORT, ()=>{console.log(`Server is listening on port ${PORT}..`)});