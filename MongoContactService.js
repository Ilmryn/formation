const mongoose = require('mongoose')

const { Schema } = mongoose;

const Contact = require('./Contact')

const contactSchema = new Schema({
  id:  Number,
  lastName: String,
  firstName: String
});

const ContactModel = mongoose.model('contacts', contactSchema);

mongoose.connect('mongodb://localhost/test')


class MongoContactService {

    async get(callable) {
        let contacts = await ContactModel.find();
        callable(contacts);
    }
    
    async add(firstName, lastName, callback) {
        let lastContact = await ContactModel.findOne().sort({id: 'desc'});
        let id = lastContact.id + 1;

        let contact = new ContactModel( {id, lastName, firstName});
        await contact.save();
        callback(contact);
    }

    async delete(id) {
        await ContactModel.remove( { id } );
    }
    
}

const service = new MongoContactService();


//service.add("Test", "Mongo", (user) => {
//    console.log('user', user)
//})

//service.delete(9);

service.get( (contacts) => {
    console.log('contacts', contacts)
})



