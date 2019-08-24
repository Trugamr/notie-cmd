const fs = require('fs').promises;
const chalk = require('chalk');

const addNote = async (title, body) => {
    const notes = await loadNotes();
    const duplicateTitle = notes.find((note) => note.title == title);
    if(!duplicateTitle) {
        notes.push({
            title, body
        });
        await writeNotes(notes);
        console.log(chalk.green.bold('Note added successfully.'));       
    } else {
        console.log(chalk.red.bold('Title already taken.'));
    }
}

const loadNotes = () => {   
    return new Promise((res, rej) => {
        fs.readFile('./data.json')
            .then(data => {
                try {
                    const jsonData = JSON.parse(data.toString());
                    res(jsonData);
                } catch(err) {
                    res([]);
                }
            })
            .catch(err => {
                res([]);
            })
    })
}

const removeNote = async (id, title) => {
    const notes = await loadNotes();
    if(id) {
        const note = notes.find((note, i) => i == (id-1));
        if(note) {
            notes.splice(id-1, 1);
            await writeNotes(notes);
            console.log(chalk.green.bold(`Note with id ${id} deleted.`));
        } else {
            console.log(chalk.red.bold('Note with specified id not found.'));
        }
    } else if (title) {
        const newNotes = notes.filter(note => note.title != title);
        if(notes.length > newNotes.length) {
            await writeNotes(newNotes);
            console.log(chalk.green.bold(`Note with title "${title}" deleted.`));
        } else {
            console.log(chalk.red.bold(`Note with title "${title}" not found.`));
        }

    } else {
        console.log(chalk.yellow.bold(`Please specify id or title of note to delete.`));
    }
}

const listNotes = async () => {
    const notes = await loadNotes();
    if(notes.length > 0) {
        console.log(chalk.yellow.bold('Notes ->'));
        notes.forEach((note, i) => console.log(`${chalk.bold(i+1)}. ${chalk.green(note.title)}`));
    } else {
        console.log(chalk.yellow.bold('No notes found.'));
    }    
}

const readNote = async (id, title) => {
    const notes = await loadNotes();
    if(id) {
        const note = notes.find((note, i) => i === (id-1));
        if(note) console.log(`${chalk.bold.yellow(note.title + ' ->')} \n${note.body}`);
        else console.log(chalk.red.bold('Note with specified id not found.'));
    } else if(title) {
        const note = notes.find((note => note.title === title));
        if(note) console.log(`${chalk.bold.yellow(note.title + ' ->')} \n${note.body}`);
        else console.log(chalk.red.bold('Note with specified title not found.'));
    } else {
        console.log(chalk.yellow.bold('Please specify id or title of note to read.'));
    }
}

const writeNotes = async (notes) => {
    await fs.writeFile('./data.json', JSON.stringify(notes));
}

module.exports = { addNote, removeNote, listNotes, readNote };