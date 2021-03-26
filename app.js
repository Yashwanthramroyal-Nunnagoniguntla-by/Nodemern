const express = require('express');
const app = express();

const placeRoute = require('./routes/places-routes');


// app.use((req,res,next)=> {
//     const error  = new HttpError('Could not found the page',404);
//     throw error;
// })

app.use(express.json());

app.use('/api/places', placeRoute);


app.use((error,req,res,next) => {
    if(res.headerSent)
    {
        return next(error);
    }
    res.status(error.code||500);
    res.json({message: error.message || 'An unknown error occurred!'})
});

app.listen(1000,(err)=>{
    if(err)
    {
        console.log("Not Connect");
    }
    else{
        console.log("Connected");
    }
});
 