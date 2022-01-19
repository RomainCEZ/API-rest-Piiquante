const GetSaucesService = require('../domain/GetSaucesService');
const Sauce = require('../domain/Sauce');
const InMemorySauceRepository = require('../domain/mock/InMemorySauceRepository');

const placeholderSauce = new Sauce({
    id: 'id',
    userId: 'cannot be edited',
    name: 'Softest sauce',
    description: 'The softest of all sauces',
    manufacturer: 'Ginger',
    mainPepper: 'Lots of fur',
    heat: 1,
    imageFileName: 'Ginger_Sauce.jpeg',
    likes: 1,
    userLiked: ['cannot be edited']
});
const sauceRepository = new InMemorySauceRepository([placeholderSauce]);
const getSaucesService = new GetSaucesService(sauceRepository);

exports.getAllSauces = (req, res, next) => {
    try {
        const allSauces = getSaucesService.getAllSauces();
        res.status(200).json(allSauces);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getOneSauce = (req, res, next) => {
    try {
        const oneSauce = getSaucesService.getOneSauce(req.params.id);
        res.status(200).json(oneSauce);
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.postSauce = (req, res, next) => {
    try {
        const sauceRequest = JSON.parse(req.body.sauce);
        const newSauce = new Sauce({
            ...sauceRequest,
            imageFileName: req.file.filename
        });
        getSaucesService.createSauce(newSauce);
        res.status(201).json({ message: 'New sauce saved !' });
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.updateSauce = (req, res, next) => {
    if (req.file) {
        const updatedSauceRequest = JSON.parse(req.body.sauce);
        const updatedSauce = new Sauce({
            id: req.params.id,
            ...updatedSauceRequest,
            imageFileName: req.file.filename
        });
        getSaucesService.updateSauce(updatedSauce);
    } else {
        const updatedSauceRequest = req.body;
        const updatedSauce = new Sauce({
            id: req.params.id,
            ...updatedSauceRequest
        });
        getSaucesService.updateSauce(updatedSauce);
    }
    res.status(200).json({ message: 'Sauce updated !' });
}

exports.deleteSauce = (req, res, next) => {
    try {
        const sauce = getSaucesService.getOneSauce(req.params.id);
        if (req.auth.decodedUserId !== sauce.userId) {
            throw 'Unauthorized request !'
        }
        getSaucesService.deleteSauce(req.params.id);
        res.status(200).json({ message: `Sauce ${req.params.id} deleted !` });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.updateLikes = (req, res, next) => {
    const sauceId = req.params.id;
    const userId = req.body.userId;
    const like = req.body.like;
    getSaucesService.handleLikes(sauceId, userId, like);
    res.status(200).json({ message: 'Likes updated !' });
}
