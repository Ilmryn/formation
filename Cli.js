const yargs = require('yargs');
const server = require('./Server')

exports.init = (contactService) => {

    /* Parsing command */
    yargs
        .version('0.0.0')
        .option('c', {
            alias: 'colors',
            desc: 'Use colors in console',
        })
        .help()
        .global('c');

    yargs
    .command({
        command: 'list',
        desc: 'List all contacts',
        handler: () => contactService.print(),
    })
    
    .command({
        command: 'add',
        desc: 'Add contact',
        builder: ygs => {
            ygs
                .option('firstName', {
                    alias: 'f',
                    desc: 'Contact\'s first name',
                    demand: true,
                    type: 'string'
                })
                .option('lastName', {
                    alias: 'l',
                    desc: 'Contact\'s last name',
                    demand: true,
                    type: 'string',
                })
        },
        handler: argv => contactService.add(argv.firstName, argv.lastName, () => contactService.print())
    })
    
    .command({
        command: 'delete',
        desc: 'Delete contact',
        builder: ygs => {
            ygs
                .option('id', {
                    alias: 'i',
                    desc: 'Contact\'s id',
                    demand: true,
                    type: 'number',
                })
        },
        handler: argv => contactService.delete(argv.id, () => contactService.print()),

    })
    
    .command({
        command: 'watch',
        desc: 'Watch contacts',
        handler: () => contactService.watch(),
    })

    .command({
        command: 'serve',
        desc: 'Launch server',
        handler: () => server.init(contactService),
    })
    
    .argv;

};