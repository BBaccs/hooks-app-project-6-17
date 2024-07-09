const fs = require('fs');
const path = require('path');

const updateDb = () => {
  try {
    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, 'characters.json'), 'utf8'));
    const titans = JSON.parse(fs.readFileSync(path.join(__dirname, 'titans.json'), 'utf8'));

    const db = {
      characters: characters.characters,
      titans: titans.titans
    };

    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2), 'utf8');
    console.log('db.json has been updated');
  } catch (error) {
    console.error('Error updating db.json:', error);
  }
};

updateDb();
