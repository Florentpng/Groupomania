const multer = require('multer'); // Facilite la gestion de fichiers pour les requêtes

const MIME_TYPES = { // Objet regroupant les différentes éxtentions possibles 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'video/mp4': 'mp4'
};

const storage = multer.diskStorage({ // Crée un objet pour configurer Multer
  destination: (req, file, callback) => { // Fonction montrant a Multer où enregistrer les fichiers
    callback(null, 'multimedia'); // Appel du callback avec null et le dossier images
  },
  filename: (req, file, callback) => { // Fonction montrant a Multer quel nom de fichier utiliser
    const name = file.originalname.split(' ').join('_'); // Définit la const name avec le nom original et les espaces remplacés par des _
    const extension = MIME_TYPES[file.mimetype]; // Définit une éxtention avec MIME_TYPES avec le mimetype du fichier envoyé par le frontend
    callback(null, name + Date.now() + '.' + extension); // Callback modifiant le ficher pour qu'il ait le nom (modifié) + un horodatage + .éxtention
  }
});

module.exports = multer({storage: storage}).single('multimedia'); // Exporte le middleware avec l'objet storage et en définissant ce middleware comme un fichier seul