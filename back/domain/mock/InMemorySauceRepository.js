class InMemorySauceRepository {
    constructor(sauces) {
        this.sauces = sauces;
    }
    getAllSauces() {
        return this.sauces;
    }
    getSauceById(sauceId) {
        return this.sauces.find( sauce => sauce.id === sauceId);
    }
    saveSauce(newSauce) {
        this.sauces.push(newSauce);
    }
    updateSauce(sauce) {
        this.deleteSauce(sauce.id);
        this.sauces.push(sauce);
    }
    deleteSauce(sauceId) {
        const sauceIndex = this.sauces.findIndex( sauce => sauce.id == sauceId);
        this.sauces.splice(sauceIndex, 1);
    }
}

module.exports = InMemorySauceRepository;