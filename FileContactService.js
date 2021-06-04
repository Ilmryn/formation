const _ = require('lodash');
const fs = require('fs');

const Contact = require('./Contact')
const writeImpl = require('./WriteImplems')
const readImpl = require('./ReadImplems')

const path = 'contacts.json';

class FileContactService {

  read(callback) {
    readImpl.stream((contacts) =>
      callback(contacts)
    )
  }

  write(contacts, callback) {
    const data = JSON.stringify(contacts);
    fs.writeFile(path, data, (err) => {
      if (err) {
          console.error(err);
      }
      if (callback) {
          callback();
      }
    })
  }

  add(firstName, lastName, callback) {
      this.read((contacts) => {

        let id = _.last(contacts).id + 1;
        let contact = new Contact({firstName, lastName, id});

        contacts.push(contact);

        this.write(contacts, (err) => {
            if (err) {
                console.error(err);
            }
            if (callback) {
                callback(contacts);
            }
        })

      })
      
  }

  delete(id, callback) {
      this.read( (contacts) => {
        const newList = contacts.filter(contact => contact.id !== id);

        this.write(newList, (err) => {
            if (err) {
                console.error(err);
            }
            if (callback) {
                callback();
            }
        })
      }
    )
  }

  get(callback) {
    this.read( (contacts) => callback(contacts))
  }

  print() {
    this.get((data) => console.log(data.join(', ')));
  }

  watch(callback) {
    this.read((referenceContacts) => {
        fs.watch(path, () => {
            this.read((newContacts) => {
                console.log('watched', _.differenceWith(referenceContacts, newContacts, _.isEqual));
                if (callback) {
                    callback(null, newContacts)
                }
            });
        });
    });
  }

}

module.exports = FileContactService