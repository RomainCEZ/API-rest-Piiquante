const SauceModel = require('../models/Sauce');
const UserModel = require('../models/User');
const User = require('../domain/User');
const Sauce = require('../domain/Sauce');

class SauceDTO {
    constructor({ _id, userId, name, description, manufacturer, mainPepper, heat, imageUrl, usersLiked = [], usersDisliked = [] }) {
        this.id = _id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.manufacturer = manufacturer;
        this.mainPepper = mainPepper;
        this.heat = heat;
        this.imageUrl = imageUrl;
        this.usersLiked = usersLiked;
        this.usersDisliked = usersDisliked;
    }
    get likes() {
        return this.usersLiked.length;
    }
    get dislikes() {
        return this.usersDisliked.length;
    }
}
class MongoDBAdapter {
    async getAllSauces() {
        const sauceModels = await SauceModel.find();
        const sauces = [];
        sauceModels.forEach( sauceModels => {
            sauces.push(new SauceDTO(...sauceModels));
        })
        return sauces;
    }
    async getOneSauce(sauceId) {
        const sauceModel = await SauceModel.findOne({ sauceId });
        return new SauceDTO({ ...sauceModel });
    }
    async saveSauce(newSauce) {
        const sauce = new SauceModel({
            ...newSauce
        })
        sauce.save();
    }
    async updateSauce(sauce) {
        await SauceModel.updateOne(
            { _id: sauce.id },
            {
                ...sauce,
                _id: sauce.id
            });
    }
    async deleteSauce(sauceId) {
        await SauceModel.deleteOne( { _id: sauceId })
    }
    async getUserByEmail(email) {
        const user = await UserModel.findOne({ email: email });
        return new User({ email: new Email(user.email), password: UserPassword.fromHash(user.password) })
    }
    saveUser(newUser) {
        try {
            const user = new UserModel({
                email: newUser.email,
                password: newUser.password
            })
            user.save();
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MongoDBAdapter;