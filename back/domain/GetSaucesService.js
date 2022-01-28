const Sauce = require('../domain/Sauce');
const fs = require('fs');

class GetSaucesService {
    constructor(saucesRepository) {
        this.saucesRepository = saucesRepository;
    }
    async getAllSauces() {
        return await this.saucesRepository.getAllSauces();
    }
    async getSauceById(sauceId) {
        const sauce =  await this.saucesRepository.getSauceById(sauceId);
        if (!sauce) {
            throw 'Sauce not found !';
        }
        return sauce;
    }
    createSauce(sauce) {
        this.saucesRepository.saveSauce(sauce);
    }
    async updateSauce(updatedSauceParams) {
        const oldSauce = await this.getSauceById(updatedSauceParams.id);
        const oldImageFileName = oldSauce.imageUrl.split('/images/')[1];
        if (updatedSauceParams.imageFileName) {
            const updatedSauce = new Sauce({
                ...updatedSauceParams,
                id: oldSauce.id,
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
                id: oldSauce.id,
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
        const sauce = await this.saucesRepository.getSauceById(sauceId);
        const fileName = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`./images/${fileName}`, (err) => {
            if (err) {
                return;
            }
        })
        this.saucesRepository.deleteSauce(sauceId);
    }
    async likeSauce(sauceId, userId) {
        const sauce = await this.saucesRepository.getSauceById(sauceId);
        sauce.like(userId);
        this.saucesRepository.updateSauce(sauce);
    }
    async dislikeSauce(sauceId, userId) {
        const sauce = await this.saucesRepository.getSauceById(sauceId);
        sauce.dislike(userId);
        this.saucesRepository.updateSauce(sauce);
    }
    async cancelLike(sauceId, userId) {
        const sauce = await this.saucesRepository.getSauceById(sauceId);
        sauce.cancel(userId);
        this.saucesRepository.updateSauce(sauce);
    }
}
module.exports = GetSaucesService;