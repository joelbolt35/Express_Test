const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');


// Gets All Members
router.get('/', (req, res) => res.json(members));

// Get Single Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id == parseInt(req.params.id));
    if(found)
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    else
        res.status(400).json({msg: `No member with an id of ${req.params.id}`});
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: "Please include a name and an email"});
    }
    members.push(newMember);
    res.json(members);
});

router.put('/:id', (req, res) => {
    const found = members.some(member => member.id == parseInt(req.params.id));
    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = req.body.name;
                member.email = req.body.email;
            }
        })
    } else {
        res.status(400).json({msg: `No member with an id of ${req.params.id}`});
    }
});


module.exports = router;