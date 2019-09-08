var express = require('express')
var router = express.Router()
var User = require('../resources/users')

// router.post('/api/users', function (req, res) {
//     User.create(req.body)
//     .then(function(resp) {
//         res.send('created')
//     })
//     .catch(function (err) {
//         throw err
//     })
// })

// router.get('/api/users', function (req, res) {
//     res.send('get all')
// })

// router.get('/api/users/:id', function (req, res) {
//     res.send('get one')
// })

// router.put('/api/users/:id', function (req, res) {
//     res.send('update')
// })

// router.delete('/api/users/:id', function (req, res) {
//     res.send('delete')
// })

router.get('/:owner/:pet', function(req, res) {
    var ownerName = req.params.owner;
    var petName = req.params.pet;
})
module.exports = router