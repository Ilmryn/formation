const JSONStream = require('JSONStream');
const through2 = require('through2');
const path = 'contacts.json';
const fs = require('fs');

const Contact = require('./Contact')

exports.original = (callback) => {
    fs.readFile(path, (err, raw) => {
        if (err) {
          console.error('error loading file', err);
        }
        try {
          const data = JSON.parse(raw.toString());
          const contacts = data.map(contact => new Contact(contact));
  
          if (callback) {
            callback(contacts);
          }
        } catch (error) {
          console.error('error parsing', error);
        }
      });
}

exports.stream = (callback) => {
    const contacts = []

    fs.createReadStream(path)
        .pipe(JSONStream.parse('*'))
        .pipe(through2.obj(function(contact, enc, next) {
            contacts.push(new Contact(contact));
            next();
        }))
        .on('finish', () => callback(contacts))
}


