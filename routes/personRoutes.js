const express = require('express')
const router = express.Router();
const Person = require('../models/Person');  //in mongoDB pluralization takes place, i.e. the collection Person becomes people in the hotel databse


//Using async await with try catch
router.post('/', async (req,res)=>{
    try
    {
        const data = req.body; //Assuming the request body contains the person data
        
        //Create a new Person document using the mongoose model
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
    
})

router.get('/', async (req,res)=>{
    try
    {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/:workType', async (req,res)=>{
    try
    {
        const workType = req.params.workType; //Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter')
        {
            const response = await Person.find({work: workType});
            console.log('Response fetched');
            res.status(200).json(response)
        }
        else
        {
            res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.put('/:id', async(req,res)=>{
    try
    {
        const personId = req.params.id; //Extract the id from the URL parameters
        const updatedPersonData = req.body; //Updated data for the person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true //Run mongoose validators of person schema
        });

        //If the id in the url is incorrect response will return nothing
        if(!response)
        {
            return res.status(404).json({error: 'Person not found'})
        }

        console.log('Data updated');
        res.status(200).json(response);

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.delete('/:id', async(req,res)=>{
    try
    {
        const personId = req.params.id; //Extract the id from the URL parameters
        
        //Assuming you have a person with the id
        const response = await Person.findByIdAndDelete(personId);
        if(!response)
        {
            return res.status(404).json({error: 'Person not found'})
        }
        console.log('Data deleted');
        // res.json(response); //response will have the entire data of the person which has the provided id
        res.status(200).json({message: 'Person deleted successfully'});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }

})

module.exports = router;