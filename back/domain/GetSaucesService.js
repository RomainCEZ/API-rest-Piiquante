const Sauce = require('../domain/Sauce');
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
    async updateSauce(updatedSauceParams) {
        const oldSauce = await this.getOneSauce(updatedSauceParams._id);
        const oldImageFileName = oldSauce.imageUrl.split('/images/')[1];
        if (updatedSauceParams.imageFileName) {
            const updatedSauce = new Sauce({
                ...updatedSauceParams,
                id: oldSauce._id,
                likes: oldSauce.likes,
                dislikes: oldSauce.dislikes,
                usersLiked: oldSauce.usersLiked,
                usersDisliked: oldSauce.usersDisliked
            });
            this.saucesRepository.updateSauce(updatedSauce);
            fs.unlink(`./images/${oldImageFileName}`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            });
        } else {
            const updatedSauce = new Sauce({
                ...updatedSauceParams,
                id: oldSauce._id,
                likes: oldSauce.likes,
                dislikes: oldSauce.dislikes,
                usersLiked: oldSauce.usersLiked,
                usersDisliked: oldSauce.usersDisliked,
                imageFileName: oldImageFileName
            });
            this.saucesRepository.updateSauce(updatedSauce);
        }
    }
    async deleteSauce(sauceId) { 
        const sauce = await this.saucesRepository.getOneSauce(sauceId);
        const fileName = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`./images/${fileName}`, (err) => {
            if (err) {
                return;
            }
        })
        this.saucesRepository.deleteSauce(sauceId);
    }
    handleLikes(sauceId, userId, like) {
        switch (like) {
            case 1: this.likeSauce(sauceId, userId);
            case 0: this.cancelLike(sauceId, userId);
            case -1: this.dislikeSauce(sauceId, userId);
        }
    }
    async likeSauce(sauceId, userId) {
        const sauce = await this.saucesRepository.getOneSauce(sauceId);
        if (!sauce.usersLiked.includes(userId)) {
            sauce.likes++;
            sauce.usersLiked.push(userId);
        }
        if (sauce.usersDisliked.includes(userId)) {
            sauce.dislikes--;
            const usersDislikedIndex = sauce.usersDisliked.findIndex( usersDisliked => usersDisliked == userId);
            sauce.usersDisliked.splice(usersDislikedIndex, 1);
        }
        this.saucesRepository.updateSauce(sauce);
    }
    async dislikeSauce(sauceId, userId) {
        const sauce = await this.saucesRepository.getOneSauce(sauceId);
        if (!sauce.usersDisliked.includes(userId)) {
            sauce.dislikes++;
            sauce.usersDisliked.push(userId);
        }
        if (sauce.usersLiked.includes(userId)) {
            sauce.likes--;
            const usersLikedIndex = sauce.usersLiked.findIndex( usersLiked => usersLiked == userId);
            sauce.usersLiked.splice(usersLikedIndex, 1);
        }
        this.saucesRepository.updateSauce(sauce);
    }
    async cancelLike(sauceId, userId) {
        const sauce = await this.saucesRepository.getOneSauce(sauceId);
        if (sauce.usersLiked.includes(userId)) {
            sauce.likes--;
            const usersLikedIndex = sauce.usersLiked.findIndex( usersLiked => usersLiked == userId);
            sauce.usersLiked.splice(usersLikedIndex, 1);
        }
        if (sauce.usersDisliked.includes(userId)) {
            sauce.dislikes--;
            const usersDislikedIndex = sauce.usersDisliked.findIndex( usersDisliked => usersDisliked == userId);
            sauce.usersDisliked.splice(usersDislikedIndex, 1);
        }
        this.saucesRepository.updateSauce(sauce);
    }
}
module.exports = GetSaucesService;