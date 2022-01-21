const Sauce = require('../models/Sauce');
const User = require('../models/User');

class MongoDBAdapter {
    async getAllSauces() {
        return await Sauce.find();
    }
    async getOneSauce(sauceId) {
        return await Sauce.findOne({ _id: sauceId });
    }
    async saveSauce(newSauce) {
        delete newSauce._id;
        const sauce = new Sauce({
            ...newSauce
        })
        sauce.save();
    }
    async updateSauce(sauce) {
        console.log
        await Sauce.updateOne(
            { _id: sauce._id },
            {
                name: sauce.name,
                manufacturer: sauce.manufacturer,
                description: sauce.description,
                mainPepper: sauce.mainPepper,
                imageUrl: sauce.imageUrl,
                heat: sauce.heat,
                _id: sauce._id
            });
    }
    async deleteSauceData(sauceId) {
        await Sauce.deleteOne( { _id: sauceId })
    }
    async updateLikes(sauce) {
        await Sauce.updateOne(
            { _id: sauce._id },
            {
                likes: sauce.likes,
                dislikes: sauce.dislikes, 
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                _id: sauce._id
            });
    }
    
    async getOneUser(email) {
        const user = await User.findOne({ email: email });
        return user
    }
    saveUser(newUser) {
        try {
            const user = new User({
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