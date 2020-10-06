var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    // get a note
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;

        const details = { '_id': new ObjectID(id)};
    
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'Error has occured'});
            } else {
                res.send(item);
            }
        })
    
    })

    // delete a note
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;

        const details = { '_id': new ObjectID(id)};
    
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'Error has occured'});
            } else {
                res.send(`Node ${id} deleted`);
            }
        })
    
    })

    // update a note
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;

        const details = { '_id': new ObjectID(id)};
        const note = {
            text: req.body.body,
            title: req.body.title
        }
    
        db.collection('notes').update(details, note, (err, item) => {
            if (err) {
                res.send({ 'error': 'Error has occured'});
            } else {
                res.send(item);
            }
        })
    
    })

    // create a note
    app.post('/notes', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        }

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'Error has occured'});
            } else {
                res.send(result.ops[0]);
            }
        })
    
    })
}