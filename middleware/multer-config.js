const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // save the file into the 'images' folder
    callback(null, 'images');
  },
  filename: (req, file, callback) => { 
    const name = file.originalname.split(' ').join('_'); // replace filenames spaces with underscores
    const extension = MIME_TYPES[file.mimetype]; // valid extensions
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image'); // pass the storage config constant

/*
Sa méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), 
et les enregistre au système de fichiers du serveur à l'aide du storage configuré.

Sa méthode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.

*/