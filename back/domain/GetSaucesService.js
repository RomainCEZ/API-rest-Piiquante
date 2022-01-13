const Sauce = require('./Sauce');
const fs = require('fs');

class GetSauces {
    constructor(saucesRepository) {
        this.saucesRepository = saucesRepository;
    }
    execute() {
        return this.saucesRepository.getSauces();
    }
    getOneSauce(sauceId) {
        const sauceList = this.saucesRepository.getSauces();
        const sauce = sauceList.find( sauce => sauce._id == sauceId);
        return sauce;
    }
    createSauce(newSauce) {
        const sauce = new Sauce(newSauce._id, newSauce.name, newSauce.description, newSauce.manufacturer, newSauce.mainPepper, newSauce.heat, newSauce.imageFileName, newSauce.userId);
        this.saucesRepository.addNewSauce(sauce);
    }
    updateSauce(updatedSauce, sauceId) {
        const sauceList = this.saucesRepository.getSauces();
        const sauceIndex = sauceList.findIndex( sauce => sauce._id == sauceId);
        const sauceToUpdate = sauceList[sauceIndex];
        sauceToUpdate.description = updatedSauce.description
        sauceToUpdate.heat = updatedSauce.heat
        sauceToUpdate.mainPepper = updatedSauce.mainPepper
        sauceToUpdate.manufacturer = updatedSauce.manufacturer
        sauceToUpdate.name = updatedSauce.name
        if (updatedSauce.imageFileName) {
            fs.unlink(`./images/${sauceToUpdate.imageUrl.split('/images/')[1]}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            sauceToUpdate.imageUrl = `http://localhost:3000/images/${updatedSauce.imageFileName}`
        }
    }
    deleteSauce(sauceId) {
        const sauceList = this.saucesRepository.getSauces();
        const sauceIndex = sauceList.findIndex( sauce => sauce._id == sauceId);
        fs.unlink(`./images/${sauceList[sauceIndex].imageFileName}`, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
        sauceList.splice(sauceIndex, 1);
    }
}

module.exports = GetSauces;