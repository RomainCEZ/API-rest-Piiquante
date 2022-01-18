class InMemorySauceRepository {
    constructor(sauces) {
        this.sauces = sauces;
    }
    getAllSauces() {
        return this.sauces;
    }
    getOneSauce(sauceId) {
        return this.sauces.find( sauce => sauce._id === sauceId);
    }
    saveSauce(newSauce) {
        this.sauces.push(newSauce);
    }
    updateSauce(sauce) {
        this.deleteSauceData(sauce._id);
        this.sauces.push(sauce);
    }
    deleteSauceData(sauceId) {
        const sauceIndex = this.sauces.findIndex( sauce => sauce._id == sauceId);
        this.sauces.splice(sauceIndex, 1);
    }
}

module.exports = InMemorySauceRepository;