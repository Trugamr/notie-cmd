const chalk = require('chalk');
const yargs = require('yargs');
const { addNote, removeNote, listNotes, readNote } = require('./notes');
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
          describe: 'note title',
          demandOption: true,
          type: 'string'
      },
      body: {
          alias: 'b',
          describe: 'content of note',
          demandOption: true,
          type: 'string'
      }  
    },
    handler: ({ title, body }) => {
        addNote(title, body);
    }
});

yargs.command(
    'remove',
    'Remove an existing note.',
    {
        id: {
            describe: 'note id',
            type: 'number'
        },
        title: {
            alias: 't',
            describe: 'note title',
            type: 'string'
        }
    },
    ({ id, title }) => {
        removeNote(id, title);
    }
);

yargs.command(
    'list',
    'List existing notes.',
    () => {
        listNotes();
    }
);

yargs.command(
    'read',
    'read an existing note.',
    {
        id: {
            describe: 'id of note',
            type: 'number'
        },
        title: {
            alias: 't',
            describe: 'title of note',
            type: 'string'
        }
    },
    ({ id, title }) => {
        readNote(id, title);
    }
);

// Parsing args
yargs.parse();