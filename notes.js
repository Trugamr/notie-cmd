const fs = require('fs').promises;
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...'
}

const addNote = async (title, body) => {
    const notes = await loadNotes();
    const duplicateTitle = notes.filter((note) => note.title == title);
    if(duplicateTitle.length === 0) {
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

const writeNotes = async (notes) => {
    await fs.writeFile('./data.json', JSON.stringify(notes));
}

module.exports = { getNotes, addNote, removeNote };