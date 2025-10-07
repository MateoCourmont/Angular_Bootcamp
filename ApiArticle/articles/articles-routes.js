const express = require('express');
const router = express.Router();
const { httpApiResponse } = require('../core/http-library');
const { middlewareVerifyToken } = require('../core/middlewares');
const { v4: uuidv4 } = require('uuid');

let DB_Articles = [
    { id: '1', title: 'Iphone 17 Pro', desc: 'L’iPhone le plus puissant jamais conçu. Superbe écran de 6,3 pouces, design unibody en aluminium, puce A19 Pro, caméras arrière 48 MP et autonomie prodigieuse.', price: 1329.00, author: 'Apple', imgPath: '/assets/images/iphone-17-pro.png' },
    { id: '2', title: 'Iphone 17', desc: 'iPhone 17. Encore plus irrésistible. Et résistant. Écran ProMotion de 6,3 pouces, Ceramic Shield 2, caméras arrière 48 MP, caméra avant Center Stage, puce A19, et bien plus.', price: 969.00, author: 'Apple', imgPath: '/assets/images/iphone-17.png' },
    { id: '3', title: 'Iphone Air', desc: 'Le plus fin des iPhone. Écran de 6,5 pouces, Ceramic Shield résistant à l’avant et à l’arrière, puce A19 Pro, système caméra Fusion 48 MP et caméra avant Center Stage', price: 1229.00, author: 'Apple', imgPath: '/assets/images/iphone-air.jpg.png' },
    { id: '4', title: 'Iphone 16 Pro', desc:'Écran OLED 6,3” Super Retina XDR, puce A18 Pro, triple caméra 48 MP + téléobjectif 12 MP + ultra grand-angle 12 MP, enregistrement vidéo 4K 120 fps Dolby Vision, design en titane avec dos en verre mat.', price: 1059.00, author: 'Apple', imgPath: '/assets/images/iphone-16-pro.png' },
    { id: '5', title: 'Iphone 16', desc: 'Écran OLED 6,1” Super Retina XDR, puce A18, double caméra 48 MP + ultra grand-angle 12 MP, Action Button personnalisable, autonomie prolongée, design en aluminium avec dos en verre coloré.', price: 869.00, author: 'Apple', imgPath: '/assets/images/iphone-16.png' },
    { id: '6', title: 'Iphone 16e', desc: 'Conçu pour Apple Intelligence et boosté par la puce A18, l’iPhone 16e est doté d’une caméra Fusion de 48 Mpx qui vous permet de prendre des photos en super haute résolution. Et son autonomie de taille vous donne plus de temps pour échanger des messages, naviguer sur le Web et faire ce qu’il vous plaît.', price: 719.00, author: 'Apple', imgPath: '/assets/images/iphone-16e.jpg.png' },
    { id: '7', title: 'Iphone 15 Pro', desc: 'Écran OLED 6,1” Super Retina XDR, puce A17 Pro, triple caméra 48 MP + téléobjectif 12 MP + ultra grand-angle 12 MP, enregistrement vidéo 4K 120 fps Dolby Vision, design en titane avec dos en verre mat.', price: 769.00, author: 'Apple', imgPath: '/assets/images/iphone-15-pro.png' },
    { id: '8', title: 'Iphone 15', desc: 'Écran OLED 6,1” Super Retina XDR, puce A16 Bionic, double caméra 48 MP + ultra grand-angle 12 MP, Action Button personnalisable, autonomie prolongée, design en aluminium avec dos en verre coloré.', price: 629.00, author: 'Apple', imgPath: '/assets/images/iphone-15.png' },
    { id: '9', title: 'Macbook Pro M4', desc: 'Conçu pour Apple Intelligence, le MacBook Pro 14 pouces avec puce M4 est un portable surpuissant qui vous livre des performances hallucinantes. Avec une autonomie pouvant atteindre 24 heures et un écran Liquid Retina XDR à couper le souffle offrant jusqu’à 1 600 nits de luminosité de pointe, il est pro à tous points de vue.', price: 2149.00, author: 'Apple', imgPath: '/assets/images/macbook-pro-m4.png' },
    { id: '10', title: 'Macbook Air M4 15"', desc: 'Le MacBook Air est l’ordina­teur portable le plus populaire au monde. Et ce n’est pas un hasard. Il offre jusqu’à 18 heures d’autonomie. La puce M4 lui confère un niveau inédit de performances pour jouer et travailler. Avec Apple Intel­ligence intégrée, il vous aide à en faire plus sans effort. Et il est désor­mais disponible dans une lumineuse finition bleu ciel. Parfaite­ment portable, le MacBook Air donnera vie à tous vos projets, où que vous soyez.', price: 1749.00, author: 'Apple', imgPath: '/assets/images/macbook-air-m4-15.webp' },
    { id: '11', title: 'Macbook Air M4 13"', desc: 'Le MacBook Air est l’ordina­teur portable le plus populaire au monde. Et ce n’est pas un hasard. Il offre jusqu’à 18 heures d’autonomie. La puce M4 lui confère un niveau inédit de performances pour jouer et travailler. Avec Apple Intel­ligence intégrée, il vous aide à en faire plus sans effort. Et il est désor­mais disponible dans une lumineuse finition bleu ciel. Parfaite­ment portable, le MacBook Air donnera vie à tous vos projets, où que vous soyez.', price: 1449.00, author: 'Apple', imgPath: '/assets/images/macbook-air-m4.png' },
    { id: '12', title: 'AirPods 4 (ANC)', desc: 'Voici les AirPods 4. Deux modèles repensés pour proposer des performances audio et un confort exceptionnels. Pour la première fois avec Réduction active du bruit. Avec la puissante puce H2, bénéficiez d’appels plus clairs avec Isolement de la voix et d’un nouveau mode d’interactions avec Siri sans les mains.', price: 199.00, author: 'Apple', imgPath: '/assets/images/airpods-4.png' },
    { id: '13', title: 'AirPods 4', desc: 'Voici les AirPods 4. Deux modèles repensés pour proposer des performances audio et un confort exceptionnels. Pour la première fois avec Réduction active du bruit. Avec la puissante puce H2, bénéficiez d’appels plus clairs avec Isolement de la voix et d’un nouveau mode d’interactions avec Siri sans les mains.', price: 149.00, author: 'Apple', imgPath: '/assets/images/airpods-4.png' },
    { id: '15', title: 'AirPods Max', desc: 'Les AirPods Max livrent un son haute-fidélité remarquablement détaillé, pour une expérience d’écoute inégalée. Chaque composant de leur transducteur exclusif œuvre pour produire un son avec une distorsion minimale sur l’ensemble du spectre audible. Vous entendez chaque note avec une sensation de clarté inédite.', price: 579.00, author: 'Apple', imgPath: '/assets/images/airpod-max.png' },
    { id: '14', title: 'AirPods Pro 3', desc: 'La meilleure Réduction active du bruit intra-auriculaire au monde. Jusqu’à 2x supé­rieure à celle des AirPods Pro 2', price: 249.00, author: 'Apple', imgPath: '/assets/images/airpods-pro-3.jpg.png' },
];

// ================================================================== //
// GESTION ARTICLES
// ================================================================== //
/**
 * Route GET : Pour récupèrer tout les articles
 */
router.get("/", async (request, response) => {
    // Récupèrer une liste/tableau d'article
    const articles = DB_Articles;

    // Retourner les articles dans la réponse JSON
    return httpApiResponse(response, "200", `La liste des articles a été récupérée avec succès !`, articles);
});

/**
 * Route GET : Pour récupèrer un article
 */
router.get("/:id", async (request, response) => {
    // Récupérer l'id de l'url
    const idParam = request.params.id;

    // Rechercher un article par son id
    const foundArticle = DB_Articles.find(article => article.id === idParam);

    if (!foundArticle) {
        return httpApiResponse(response, "721", `L'article n'existe pas`, null);
    }

    return httpApiResponse(response, "200", `L'article a été récupéré avec succès`, foundArticle);

});

/**
 * Route POST : Pour ajouter un article
 */
router.post("/save", async (request, response) => {
    // Récupérer l'article qui est envoyé en JSON
    const articleJSON = request.body;

    let foundArticle = null;

    // Est-ce on a un id envoyer dans le json
    if (articleJSON.id != undefined || articleJSON.id) {
        // essayer de trouver un article existant
        foundArticle = DB_Articles.find(article => article.id === articleJSON.id);
    }

    // Si je trouve je modifie les nouvelles valeurs
    if (foundArticle) {
        foundArticle.title = articleJSON.title;
        foundArticle.desc = articleJSON.desc;
        foundArticle.price = articleJSON.price;
        foundArticle.author = articleJSON.author;
        foundArticle.imgPath = articleJSON.imgPath;

        return httpApiResponse(response, "200", `L'article a été modifié avec succès`, articleJSON);
    }

    // Sinon par défaut je créer

    // -- generer l'id
    articleJSON.id = uuidv4();

    DB_Articles.push(articleJSON);

    return httpApiResponse(response, "200", `Article crée avec succès !`, articleJSON);
});


/**
 * Route POST : Pour ajouter supprimer un article
 */
router.delete('/:id', (request, response) => {

    // Il faut l'id en entier
    const id = request.params.id;

    // trouver l'index
    const foundArticleIndex = DB_Articles.findIndex(article => article.id === id);

    // si article trouve erreur
    if (foundArticleIndex < 0) {
        return httpApiResponse(response, "721", `Impossible de supprimer un article inexistant`, null);
    }

    // supprimer grace à l'index
    DB_Articles.splice(foundArticleIndex, 1);

    return httpApiResponse(response, "200", `Article ${id} supprimé avec succès`, null);
});

// Exporter le router
module.exports = router;