const {Router }= require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require("../../recetario-bootcamp-firebase-adminsdk-ipdlt-307c51a78a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://recetario-bootcamp-default-rtdb.firebaseio.com/'
});

const db = admin.database();

router.get('/', (req, res) => {
    db.ref('contactos').once('value', (snapshot) => {
       const data = snapshot.val();
       res.render('index', {contactos: data});
    });
     
});

router.post('/new-contact', (req, res) => {
    console.log(req.body);
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    };

    db.ref('contactos').push(newContact)
    //res.send('received');
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contactos/' + req.params.id).remove();
    //console.log(req.params.id)
    res.redirect('/');
})


module.exports = router;

