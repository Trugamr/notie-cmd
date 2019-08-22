const fs = require('fs').promises;

const getNotes = () => {
    return 'Your notes...'
}

const addNote = async (title, body) => {
    const notes = await loadNotes();
    notes.push({
        title, body
    })
    writeNotes(notes);
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

const writeNotes = async (notes) => {
    await fs.writeFile('./data.json', JSON.stringify(notes));
}

module.exports = { getNotes, addNote }