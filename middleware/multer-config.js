const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// !!! verifier que le nom de fichier ne dépasse pas une certaine longueur

const storage = multer.diskStorage({
  destination: (req, file, callback) => { 
    // save the file into the 'images' folder
    callback(null, 'images')
  },
  filename: (req, file, callback) => { 
    console.log('file.originalname :',file.originalname)
    // .split('.')[0] added to get rid of the extension before update the filename
    const name = file.originalname.split(' ').join('_').split('.')[0]
    const extension = MIME_TYPES[file.mimetype] // valid extensions
    callback(null, name + Date.now() + '.' + extension)
  }
});

// pass the storage config , .single() : saving
module.exports = multer({storage: storage}).single('image')

/*
Sa méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), 
et les enregistre au système de fichiers du serveur à l'aide du storage configuré.

Sa méthode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.
*/