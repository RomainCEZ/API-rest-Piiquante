const fs = require('fs');

class GetSaucesService {
    constructor(saucesRepository) {
        this.saucesRepository = saucesRepository;
    }
    getAllSauces() {
        return this.saucesRepository.getAllSauces();
    }
    getOneSauce(sauceId) {
        const sauce =  this.saucesRepository.getOneSauce(sauceId);
        if (!sauce) {
            throw 'Sauce not found !';
        }
        return sauce;
    }
    createSauce(sauce) {
        this.saucesRepository.saveSauce(sauce);
    }
    updateSauce(updatedSauce) {
        if (updatedSauce.imageFileName) {
            const previousFileName = sauceToUpdate.imageUrl.split('/images/')[1];
            fs.unlink(`./images/${previousFileName}`, (err) => {
                if (err) {
                    return;
                }
            })
            sauceToUpdate.imageUrl = `http://localhost:3000/images/${updatedSauce.imageFileName}`;
        }
        this.saucesRepository.updateSauce(updatedSauce);
    }
    deleteSauce(sauceId) { 
        const imageUrl = this.saucesRepository.getOneSauce(sauceId).imageUrl;
        const fileName = imageUrl.split('/images/')[1];
        fs.unlink(`./images/${fileName}`, (err) => {
            if (err) {
                return;
            }
        })
        this.saucesRepository.deleteSauceData(sauceId);
    }
    handleLikes(sauceId, userId, like) {
        if (like === 1) {
            this.likeSauce(sauceId, userId);
        }
        if (like === -1) {
            this.dislikeSauce(sauceId, userId);
        }
        if (like === 0) {
            this.cancelLike(sauceId, userId);
        }
    }
    likeSauce(sauceId, userId) {
        const sauce = this.saucesRepository.getOneSauce(sauceId);
        if (!sauce.userLiked.includes(userId)) {
            sauce.likes += 1;
            sauce.userLiked.push(userId);
        }
        if (sauce.userDisliked.includes(userId)) {
            sauce.dislikes -= 1;
            const userDislikedIndex = sauce.userDisliked.findIndex( userDisliked => userDisliked == userId);
            sauce.userDisliked.splice(userDislikedIndex, 1);
        }
    }
    dislikeSauce(sauceId, userId) {
        const sauce = this.saucesRepository.getOneSauce(sauceId);
        if (!sauce.userDisliked.includes(userId)) {
            sauce.dislikes += 1;
            sauce.userDisliked.push(userId);
        }
        if (sauce.userLiked.includes(userId)) {
            sauce.likes -= 1;
            const userLikedIndex = sauce.userLiked.findIndex( userDisliked => userDisliked == userId);
            sauce.userLiked.splice(userLikedIndex, 1);
        }
    }
    cancelLike(sauceId, userId) {
        const sauce = this.saucesRepository.getOneSauce(sauceId);
        if (sauce.userLiked.includes(userId)) {
            sauce.likes -= 1;
            const userLikedIndex = sauce.userLiked.findIndex( userLiked => userLiked == userId);
            sauce.userLiked.splice(userLikedIndex, 1);
        }
        if (sauce.userDisliked.includes(userId)) {
            sauce.dislikes -= 1;
            const userDislikedIndex = sauce.userDisliked.findIndex( userDisliked => userDisliked == userId);
            sauce.userDisliked.splice(userDislikedIndex, 1);
        }
    }
}
module.exports = GetSaucesService;