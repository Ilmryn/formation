const fs = require('fs')
const util = require('util')

const filePath = 'contacts.json';
const backupFilePath = 'contacts.json.backup';

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const renamePromise = util.promisify(fs.rename);


exports.callbacks = function(contacts, callback) {

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        }
        console.log('read OK')
            fs.writeFile(backupFilePath, data, (err) => {
                if (err) {
                    console.error(err);
                } 
                console.log('backup OK')

                fs.writeFile(filePath, JSON.stringify(contacts), (err) => {
                    if (err) {
                        fs.rename(backupFilePath, filePath, (err) => {
                            if (error) {
                                console.error(err)
                            }
                            console.log('restore backup')
                        })
                        console.error(err)
                    }
                    callback();
                })
            })
    })

}


exports.promise = (contacts, callback) => {
    readFilePromise(filePath)
        .then(data => {
            return writeFilePromise(backupFilePath, data)
        })
        .then(console.log('backup OK'))
        .then(() => {
           return writeFilePromise(contacts)
        })
        .catch(() => {
            return renamePromise(backupFilePath, filePath)
        })
        .then(() => { if (callback) return callback(); })
}

