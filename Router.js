exports.routes = (app, io, contactService) => {

    // Renvoie la liste de tout les contacts
    app.get('/rest/contacts', function (req, res) {
        contactService.read( (contacts) => {
            res.send(contacts);
        })
    });

    // Renvoie la le contact avec l'identifiant demandé
    app.get('/rest/contacts/:id', function (req, res) {
        let id = req.params.id;
                
        contactService.get((contacts) => {
            let contact = contacts.find(contact => contact.id == id);
            
            if (contact) {
                res.send(contact);
            } else {
                res.status(404).send('Contact not found');
            }
        })
    });

    // Crée un nouveau contact
    app.post('/rest/contacts', function (req, res) {      
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;

        contactService.add(firstName, lastName, () => {
            res.status(201);
        })

    });

    // Modifie un contact
    app.put('/rest/contacts/:id', function (req, res) {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        
        contactService.delete(id, () => {
            contactService.add(firstName, lastName, () => {
                res.status(201);
            })
        })
    });

    io.on('connection',function(socket) {
        console.log('Client connection: ' + socket.id)
    })

    contactService.watch((err, contacts) => {
        if (err) {
            console.log(err)
        }
        io.emit('contacts', contacts)
    })

}