const FileContactService = require("./FileContactService")
const Cli = require('./Cli')


const myContacts = new FileContactService();
Cli.init(myContacts);