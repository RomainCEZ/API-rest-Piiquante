const GetSauces = require('./GetSaucesService');
const Sauce = require('./Sauce');
const InMemorySauceRepository = require('./mock/InMemorySauceRepository');

describe('GetSaucesService', () => {
    it('Should return an empty list of sauces', () => {
        const sauceRepository = new InMemorySauceRepository([]);
        const getSauces = new GetSauces(sauceRepository);
        expect(getSauces.execute()).toEqual([]);
    })
    it('Should return a list of one sauce', () => {
        const expectedSauce = new Sauce('sauce1');
        const sauceRepository = new InMemorySauceRepository([expectedSauce]);
        const getSauces = new GetSauces(sauceRepository);
        expect(getSauces.execute()).toEqual([expectedSauce]);
    })
    it('Should return a specific sauce from a list of sauces', () => {
        const sauceIWant = new Sauce('sauceIWant');
        const secondSauce = new Sauce('secondSauce');
        const sauceRepository = new InMemorySauceRepository([sauceIWant, secondSauce]);
        const getSauces = new GetSauces(sauceRepository);
        expect(getSauces.getOneSauce('sauceIWant')).toEqual(sauceIWant);
    })
    it('Should add a new sauce and return a list of all sauces including new sauce', () => {
        const originalSauce = new Sauce('originalSauce', 'name', 'description', 'manufacturer', 'mainPepper', 2, 'imageFileName');
        const newSauce = new Sauce('newSauce', 'name', 'description', 'manufacturer', 'mainPepper', 5, 'imageFileName');
        const newSauceDTO = {
            _id: 'newSauce', 
            name: 'name', 
            description: 'description', 
            manufacturer: 'manufacturer', 
            mainPepper: 'mainPepper', 
            heat: 5,
            imageFileName: 'imageFileName'
        };
        const sauceRepository = new InMemorySauceRepository([originalSauce]);
        const getSauces = new GetSauces(sauceRepository);
        getSauces.createSauce(newSauceDTO);
        expect(getSauces.execute()).toEqual([originalSauce, newSauce]);
    })
    it('Should add a new sauce and return a list containing this sauce', () => {
        const originalSauce = new Sauce('originalSauce', 'name', 'description', 'manufacturer', 'mainPepper', 2, 'imageFileName');
        const newSauce = new Sauce('newSauce', 'name', 'description', 'manufacturer', 'mainPepper', 5, 'imageFileName');
        const newSauceDTO = {
            _id: 'newSauce', 
            name: 'name', 
            description: 'description', 
            manufacturer: 'manufacturer', 
            mainPepper: 'mainPepper', 
            heat: 5,
            imageFileName: 'imageFileName'
        };
        const sauceRepository = new InMemorySauceRepository([originalSauce]);
        const getSauces = new GetSauces(sauceRepository);
        getSauces.createSauce(newSauceDTO);
        expect(getSauces.getOneSauce('newSauce')).toEqual(newSauce);
    })
    it('Should update the original sauce with the new SauceDTO params', () => {
        const originalSauce = new Sauce('originalSauce', 'name', 'description', 'manufacturer', 'mainPepper', 2, 'imageFileName');
        const updatedSauce = new Sauce('originalSauce', 'name2', 'description2', 'manufacturer2', 'mainPepper2', 5, 'imageFileName2');
        const newSauceDTO = {
            name: 'name2', 
            description: 'description2', 
            manufacturer: 'manufacturer2', 
            mainPepper: 'mainPepper2', 
            heat: 5,
            imageFileName: 'imageFileName2'
        };
        const sauceRepository = new InMemorySauceRepository([originalSauce]);
        const getSauces = new GetSauces(sauceRepository);
        getSauces.updateSauce(newSauceDTO, 'originalSauce');
        expect(getSauces.execute()).toEqual([updatedSauce]);
    })
    it('Should delete sauce1', () => {
        const sauce1 = new Sauce('sauce 1', 'name1', 'description1', 'manufacturer1', 'mainPepper1', 1, 'imageFileName1');
        const sauce2 = new Sauce('sauce 2', 'name2', 'description2', 'manufacturer2', 'mainPepper2', 2, 'imageFileName2');
        const sauce3 = new Sauce('sauce 3', 'name3', 'description3', 'manufacturer3', 'mainPepper3', 3, 'imageFileName3');
        const sauceRepository = new InMemorySauceRepository([sauce1, sauce2, sauce3]);
        const getSauces = new GetSauces(sauceRepository);
        getSauces.deleteSauce('sauce 1');
        expect(getSauces.execute()).toEqual([sauce2, sauce3]);
    })
    it('Should delete sauce2', () => {
        const sauce1 = new Sauce('sauce 1', 'name1', 'description1', 'manufacturer1', 'mainPepper1', 1, 'imageFileName1');
        const sauce2 = new Sauce('sauce 2', 'name2', 'description2', 'manufacturer2', 'mainPepper2', 2, 'imageFileName2');
        const sauce3 = new Sauce('sauce 3', 'name3', 'description3', 'manufacturer3', 'mainPepper3', 3, 'imageFileName3');
        const sauceRepository = new InMemorySauceRepository([sauce1, sauce2, sauce3]);
        const getSauces = new GetSauces(sauceRepository);
        getSauces.deleteSauce('sauce 2');
        expect(getSauces.execute()).toEqual([sauce1, sauce3]);
    })
})