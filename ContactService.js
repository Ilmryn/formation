const Contact = require('./Contact')

/** Classe ContactService */
class ContactService {
    constructor() {
      this.contacts = data.map(contact => new Contact(contact));
    }
  
    get() {
      return this.contacts;
    }
  
    print() {
      console.log(this.get().join(', '));
    }
}

module.exports = ContactService