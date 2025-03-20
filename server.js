import express from 'express';
import orphans from './routes/Orphans.js';
const app= express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send('Hope Connect API');
})



 app.use('/api/orphans',orphans)






app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})