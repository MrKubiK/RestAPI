const express = require('express')
const router = express.Router()
const testData = require('../models/testData')

// Getting all
router.get('/', async (req, res) =>{
    try {
        const data = await testData.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// Getting one
router.get('/:id', getData, (req, res) =>{
    res.json(res.data)
})
// Creating one
router.post('/', async (req, res) => {
    const data = new testData({
        key: req.body.key,
        val: req.body.val
    })

    try {
        const newData = await data.save();
        res.status(201).send(newData)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// Updating one
router.patch('/:id', getData, async (req, res) =>{
    if(req.body.key != null)
        res.data.key = req.body.key

    if(req.body.val != null)
        res.data.val = req.body.val

    try {
        const updatedData = await res.data.save()
        res.json(updatedData)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// Deleting one
router.delete('/:id', getData, async (req, res) =>{
    try{
        await res.data.deleteOne()
        res.json({message: 'Deleted data'})
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

async function getData(req, res, next){
    try {
        data = await testData.findById(req.params.id)
        if (data == null)
            return res.status(404).json({message: "Cannot find the data"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

    res.data = data
    next()
}

module.exports = router