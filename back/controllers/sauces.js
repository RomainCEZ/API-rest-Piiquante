const GetSaucesService = require('../domain/GetSaucesService');
const Sauce = require('../domain/Sauce');
const InMemorySauceRepository = require('../domain/mock/InMemorySauceRepository');

class SauceRequestDTO {
    constructor({name, description, manufacturer, mainPepper, heat, imageFileName, userId}) {
        this.name = name,
        this.description = description,
        this.manufacturer = manufacturer,
        this.mainPepper = mainPepper,
        this.heat = heat,
        this.imageFileName = imageFileName,
        this.userId = userId
    }
}

const placeholderSauce = new Sauce(
    'id',
    "Softest sauce",
    "The softest of all sauces",
    "Ginger",
    "Lots of fur",
    1,
    "Ginger1642004206341.jpeg"
);
placeholderSauce.likes = 1;
placeholderSauce.userLiked = ['me'];
placeholderSauce.userId = 'free_login_for_everyone'
const sauceRepository = new InMemorySauceRepository([placeholderSauce]);
const getSaucesService = new GetSaucesService(sauceRepository);

exports.getAllSauces = (req, res, next) => {
    const allSauces = getSaucesService.execute();
    res.status(200).json(allSauces);
}

exports.getOneSauce = (req, res, next) => {
    const oneSauce = getSaucesService.getOneSauce(req.params.id);
    res.status(200).json(oneSauce);
}

exports.postSauce = (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    const sauceRequest = JSON.parse(req.body.sauce);
    console.log(req.body.sauce)
    const newSauceDTO = new SauceRequestDTO({
        ...sauceRequest,
        imageFileName: req.file.filename
    });
    getSaucesService.createSauce(newSauceDTO);
    res.status(201).json({ message: 'New sauce saved !' });
}
exports.updateSauce = (req, res, next) => {
    // console.log(req.body);
    // console.log(req.file);
    if (req.file) {
        const updatedSauceRequest = JSON.parse(req.body.sauce);
        const updatedSauceDTO = new SauceRequestDTO ({
            ...updatedSauceRequest,
            imageFileName: req.file.filename
        });
        getSaucesService.updateSauce(updatedSauceDTO, req.params.id);
    } else {
        const updatedSauceRequest = req.body;
        const updatedSauceDTO = new SauceRequestDTO ({
            ...updatedSauceRequest
        });
        getSaucesService.updateSauce(updatedSauceDTO, req.params.id);
    }
    res.status(200).json({ message: 'Sauce updated !' });
}

exports.deleteSauce = (req, res, next) => {
    getSaucesService.deleteSauce(req.params.id);
    res.status(200).json({ message: `Sauce ${req.params.id} deleted !` });
}

exports.updateLikes = (req, res, next) => {

}
