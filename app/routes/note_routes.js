var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {


    app.get('/', (req, res) => {
        res.send("GORL");
    })


    app.get('/notes', async (req, res) => {
        const notes = await db.collection('notes').find().sort( { created : -1}).toArray()
        res.send(JSON.stringify(notes))
    })
    

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
    
        db.collection('notes').removeOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'Error has occured'});
            } else {
                res.send(`Note ${id} deleted`);
            }
        })
    
    })

    // update a note
    app.patch('/notes/:id', (req, res) => {
        const id = req.params.id;

        const details = { '_id': new ObjectID(id)};
        const note = {
            $set: {
                noteBody: req.body.body,
                title: req.body.title,
                updated: Date.now()
            }
        }
    
        db.collection('notes').updateOne(details, note, (err, item) => {
            if (err) {
                res.send({ 'error': 'Error has occured'});
            } else if (item.result.n === 0) {
                res.send(`Note ${id} does not exist`);
            } else {
                res.send(`Note ${id} updated`);
            }
        })
    
    })

    // create a note
    app.post('/notes', (req, res) => {
        const note = {
            noteBody: req.body.body,
            title: req.body.title,
            created: Date.now(),
            updated: Date.now()
        }

        db.collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'Error has occured'});
            } else {
                res.send(result.ops[0]);
            }
        })
    
    })
}