const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')

//Getting All
router.get('/', async (req, res) => {
    const subscribers = await Subscriber.find().
        catch(error => {
            res.status(500).json({message: error.message});
        })
    res.send(subscribers);
})

//Getting One 
router.get('/:id', getSubscriber, (req, res) => {
   res.send(res.subscriber);
})

//Creating One
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    const newSubscriber = await subscriber.save().
        catch(error => {
            res.status(400).json({message: error.message});
        })

    res.status(201).json(newSubscriber)
})

//Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
    req.body.name != null ? res.subscriber.name = req.body.name : null;
    req.body.subscribedToChannel != null ? res.subscriber.subscribedToChannel = req.body.subscribedToChannel : null;
    
    const updatedSubscriber = await res.subscriber.save().
        catch(error => {
            res.status(400).json({message: error.message});
        })
    res.send(updatedSubscriber);
})

//Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    await res.subscriber.remove().
        catch(error => {
            res.status(500).json({message: error.message});
        })
        res.json({message: 'Subscriber has been deleted'});
})

async function getSubscriber (req, res, next) {
    subscriber = await Subscriber.findById(req.params.id).
        catch(error => {
           return res.status(500).json({message: error.message});
        })
    if (subscriber == null){
        res.status(404).json({message: `Cannot find subscriber`});
    }
    
    res.subscriber = subscriber;
    next();
}

module.exports = router;