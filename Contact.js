const chalk = require('chalk');
const yargs = require('yargs');

/** Classe Contact */
class Contact {
    constructor(contact) {
      Object.assign(this, contact);
    }
  
    toString() {
      let lastName = this.lastName.toUpperCase();
      let firstName = this.firstName;
  
      if (yargs.argv.c) {
        lastName = chalk.blue(lastName);
        firstName = chalk.red(firstName);
      }
      return `${lastName} ${firstName}`;
    }
  
}
  
module.exports = Contact