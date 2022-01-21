const fs = require('fs');

class GetSaucesService {
    constructor(saucesRepository) {
        this.saucesRepository = saucesRepository;
    }
    async getAllSauces() {
        return await this.saucesRepository.getAllSauces();
    }
    async getOneSauce(sauceId) {
        const sauce =  await this.saucesRepository.getOneSauce(sauceId);
        if (!sauce) {
            throw 'Sauce not found !';
        }
        return sauce;
    }
    createSauce(sauce) {
        this.saucesRepository.saveSauce(sauce);
    }
    async updateSauce(updatedSauce) {
        if (updatedSauce.imageFileName) {
            const previousFileName = sauceToUpdate.imageUrl.split('/images/')[1];
            fs.unlink(`./images/${previousFileName}`, (err) => {
                if (err) {
                    return;
                }
            })
            sauceToUpdate.imageUrl = `http://localhost:3000/images/${updatedSauce.imageFileName}`;
        } else {

        }
        this.saucesRepository.updateSauce(updatedSauce);
    }
    async deleteSauce(sauceId) { 
        const sauce = await this.saucesRepository.getOneSauce(sauceId);
        const fileName = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`./images/${fileName}`, (err) => {
            if (err) {
                return;
            }
        })
        this.saucesRepository.deleteSauceData(sauceId);
    }
    async handleLikes(sauceId, userId, like) {
        if (like === 1) {
            await this.likeSauce(sauceId, userId);
        }
        if (like === -1) {
            await this.dislikeSauce(sauceId, userId);
        }
        if (like === 0) {
            await this.cancelLike(sauceId, userId);
        }
    }
    async likeSauce(sauceId, userId) {
        const sauce = await this.saucesRepository.getOneSauce(sauceId);
        if (!sauce.usersLiked.includes(userId)) {
            sauce.likes += 1;
            sauce.usersLiked.push(userId);
        }
        if (sauce.usersDisliked.includes(userId)) {
            sauce.dislikes -= 1;
            const usersDislikedIndex = sauce.usersDisliked.findIndex( userDisliked => userDisliked == userId);
            sauce.usersDisliked.splice(usersDislikedIndex, 1);
        }
        this.saucesRepository.updateLikes(sauce);
    }
    async dislikeSauce(sauceId, userId) {
        const sauce = await this.saucesRepository.getOneSauce(sauceId);
        if (!sauce.usersDisliked.includes(userId)) {
            sauce.dislikes += 1;
            sauce.usersDisliked.push(userId);
        }
        if (sauce.usersLiked.includes(userId)) {
            sauce.likes -= 1;
            const usersLikedIndex = sauce.usersLiked.findIndex( usersLiked => usersLiked == userId);
            sauce.usersLiked.splice(usersLikedIndex, 1);
        }
        this.saucesRepository.updateLikes(sauce);
    }
    async cancelLike(sauceId, userId) {
        const sauce = await this.saucesRepository.getOneSauce(sauceId);
        if (sauce.usersLiked.includes(userId)) {
            sauce.likes -= 1;
            const usersLikedIndex = sauce.usersLiked.findIndex( usersLiked => usersLiked == userId);
            sauce.usersLiked.splice(usersLikedIndex, 1);
        }
        if (sauce.usersDisliked.includes(userId)) {
            sauce.dislikes -= 1;
            const usersDislikedIndex = sauce.usersDisliked.findIndex( usersDisliked => usersDisliked == userId);
            sauce.usersDisliked.splice(usersDislikedIndex, 1);
        }
        this.saucesRepository.updateLikes(sauce);
    }
}
module.exports = GetSaucesService;