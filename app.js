const chalk = require('chalk');
const yargs = require('yargs');
const { getNotes, addNote } = require('./notes');
const log = console.log;

// Customize version
yargs.version('1.0.0');

//Commands
yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder: {
      title: {
          alias: 't',
          describe: 'Note title',
          demandOption: true,
          type: 'string'
      },
      body: {
          alias: 'b',
          describe: 'Content of note',
          demandOption: true,
          type: 'string'
      }  
    },
    handler: ({ title, body }) => {
        addNote(title, body);
        log(chalk.green.bold(`Title: ${title} \nBody: ${body}`));
    }
});

yargs.command('remove', 'Remove an existing note.', (argv) => {
    log(chalk.red.bold('Removing a note!'));
})

yargs.command('list', 'List existing notes.', (argv) => {
    log(chalk.bold('List of all notes.'));
})

yargs.command('read', 'Read an existing note.', (argv) => {
    log(chalk.bold('Reading note.'));
})

// Parsing args
yargs.parse()