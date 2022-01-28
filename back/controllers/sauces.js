const GetSaucesService = require('../domain/GetSaucesService');
const Sauce = require('../domain/Sauce');
const MongoDBAdapter = require('../adapter/MongoDBAdapter');
const InMemorySauceRepository = require('../domain/mock/InMemorySauceRepository');


const sauceRepository = new InMemorySauceRepository();
const getSaucesService = new GetSaucesService(sauceRepository);

exports.getAllSauces = async (req, res, next) => {
    try {
        const allSauces = await getSaucesService.getAllSauces();
        res.status(200).json(allSauces);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getSauceById = async (req, res, next) => {
    try {
        const oneSauce = await getSaucesService.getSauceById(req.params.id);
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
exports.updateSauce = async (req, res, next) => {
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
        const updatedSauce = {
            id: req.params.id,
            ...updatedSauceRequest
        };
        getSaucesService.updateSauce(updatedSauce);
    }
    res.status(200).json({ message: 'Sauce updated !' });
}

exports.deleteSauce = async (req, res, next) => {
    try {
        const sauce = await getSaucesService.getSauceById(req.params.id);
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
    switch (like) {
        case 1: this.likeSauce(sauceId, userId);
        case 0: this.cancelLike(sauceId, userId);
        case -1: this.dislikeSauce(sauceId, userId);
    }
    res.status(200).json({ message: 'Likes updated !' });
}
