const uuid = require('uuid').v4;
const HttpError = require('../models/http-error')

let DUMMY_PLACES = [{
    id:'1',
    title:"Empire state building",
    description:"One of the most sky scrapers in the world!",
    location : {
        lat:40.7484474,
        lan:-73.9871516
    },
    address:'20 w 34th St,New York, NY 1001',
    creator:'ul'
}]

const getPlaceById = (req,res,next) => {
    const placeID = req.params.pid;
    const place = DUMMY_PLACES.find(p=>{
        return p.id === placeID
    });

    if(!place)
    {
        throw new HttpError('Could not found place for the provided Id',404);
    }
    console.log("Get request");
    res.status(200).json({place});
  
}

const getPlaceUserId =  (req,res,next)=>
{
    const userID =  req.params.uid;
    const place  = DUMMY_PLACES.find(p => {
        return p.creator === userID
    });
  
    if(!place)
    {
  
        return next(new HttpError('Could not found place for the provided Id',404));
    }
      res.status(200).json({place}); 
  
}

const createPlace = (req,res,next) => {
    const {title,description,coordinates,address,creator} = req.body

    const createdNewPlace = {
        id:uuid(),
        title,
        description,
        location:coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createdNewPlace); //use unshift method if you want to add in first
    res.status(201).json({place:createdNewPlace})
}

const updateTheData = (req,res,next) => {
    const placeID = req.params.pid;
    const {title,description} = req.body;

    const updatedvalue = {... DUMMY_PLACES.find(p=> p.id === placeID)};
    const pastId = DUMMY_PLACES.find(p=> p.id === placeID)
    updatedvalue.title = title,
    updatedvalue.description = description,
    DUMMY_PLACES[pastId] = updatedvalue
    res.status(200).json({place:updatedvalue})

}

const deletePlace = (req,res,next) => {
const placeid = req.body.pid;
DUMMY_PLACES = DUMMY_PLACES.filter(p=>p.id !== placeid);
res.status(200).json({message:"Delete place"})

}
exports.createPlace = createPlace
exports.getPlaceById = getPlaceById;
exports.getPlaceUserId = getPlaceUserId;
exports.updateTheData = updateTheData;
exports.deletePlace = deletePlace;
