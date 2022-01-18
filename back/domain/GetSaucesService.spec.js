const GetSaucesService = require('./GetSaucesService');
const Sauce = require('./Sauce');
const InMemorySauceRepository = require('./mock/InMemorySauceRepository');

describe('GetSaucesService', () => {
    it('Should return an empty list of sauces', () => {
        const sauceRepository = new InMemorySauceRepository([]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        expect(getSaucesService.getAllSauces()).toEqual([]);
    })
    it('Should return a list of one sauce', () => {
        const expectedSauce = new Sauce('sauce1');
        const sauceRepository = new InMemorySauceRepository([expectedSauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        expect(getSaucesService.getAllSauces()).toEqual([expectedSauce]);
    })
    it('Should return a specific sauce from a list of sauces', () => {
        const sauceIWant = new Sauce({id: 'id1', userId: 'userId', name: 'name'});
        const secondSauce = new Sauce({id: 'id2', userId: 'userId2', name: 'name2'});
        const sauceRepository = new InMemorySauceRepository([sauceIWant, secondSauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        expect(getSaucesService.getOneSauce('id1')).toEqual(sauceIWant);
    })

//  createSauce(newSauce)
    it('Should add a new sauce and return a list of all sauces including new sauce', () => {
        const originalSauce = new Sauce({id: 'id1', userId: 'userId', name: 'name', description: 'description', manufacturer: 'manufacturer', mainPepper: 'mainPepper', heat: 2});
        const newSauce = new Sauce({
            id: 'id2', 
            userId: 'newUserId', 
            name: 'newName', 
            description: 'description', 
            manufacturer: 'manufacturer', 
            mainPepper: 'mainPepper', 
            heat: 5
        });

        const sauceRepository = new InMemorySauceRepository([originalSauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.createSauce(newSauce);
        expect(getSaucesService.getAllSauces()).toEqual([originalSauce, newSauce]);
    })
    it('Should add a new sauce and return a list containing this sauce', () => {
        const originalSauce = new Sauce({id: 'id1', userId: 'userId', name: 'name', description: 'description', manufacturer: 'manufacturer', mainPepper: 'mainPepper', heat: 2});
        const newSauce = new Sauce({
            id: 'id2',
            userId: 'newUserId', 
            name: 'newName', 
            description: 'description', 
            manufacturer: 'manufacturer', 
            mainPepper: 'mainPepper', 
            heat: 5
        })
        const sauceRepository = new InMemorySauceRepository([originalSauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.createSauce(newSauce);
        expect(getSaucesService.getOneSauce('id2')).toBe(newSauce);
    })

//  updateSauce(updatedSauceDTO, sauceId) 
    it('Should update the original sauce with the new SauceDTO params', () => {
        const originalSauce = new Sauce({id: 'id1', userId: 'userId', name: 'name', description: 'description', manufacturer: 'manufacturer', mainPepper: 'mainPepper', heat: 2});
        const updatedSauce = new Sauce({id: 'id1', userId: 'userId', name: 'name2', description: 'description2', manufacturer: 'manufacturer2', mainPepper: 'mainPepper2', heat: 2});
        const sauceRepository = new InMemorySauceRepository([originalSauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.updateSauce(updatedSauce);
        expect(getSaucesService.getAllSauces()).toEqual([updatedSauce]);
    })

//  deleteSauce(sauceId)
    it('Should delete sauce1', () => {
        const sauce1 = new Sauce({id: 'id1'});
        const sauce2 = new Sauce({id: 'id2'});
        const sauce3 = new Sauce({id: 'id3'});
        const sauceRepository = new InMemorySauceRepository([sauce1, sauce2, sauce3]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.deleteSauce('id1');
        expect(getSaucesService.getAllSauces()).toEqual([sauce2, sauce3]);
    })
    it('Should delete sauce2', () => {
        const sauce1 = new Sauce({id: 'id1'});
        const sauce2 = new Sauce({id: 'id2'});
        const sauce3 = new Sauce({id: 'id3'});
        const sauceRepository = new InMemorySauceRepository([sauce1, sauce2, sauce3]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.deleteSauce('id2');
        expect(getSaucesService.getAllSauces()).toEqual([sauce1, sauce3]);
    })
    
//  likeSauce(sauceId, userId)
    it('Should add 1 like', () => {
        const sauce = new Sauce({id: 'id'});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id');
        expect(getSaucesService.getOneSauce('id').likes).toEqual(1);
    })
    it('Should add userId to userLiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id', 'userId');
        expect(getSaucesService.getOneSauce('id').userLiked).toEqual(['userId']);
    })
    it('Should remove 1 dislike if userId is already in userDisliked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        sauce.dislikes = 1;
        sauce.userDisliked = ['userId'];
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id', 'userId');
        expect(getSaucesService.getOneSauce('id').dislikes).toEqual(0);
    })
    it('Should remove userId from userDisliked it is already in userDisiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        sauce.userDisliked = ['userId'];
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id', 'userId');
        expect(getSaucesService.getOneSauce('id').userDisliked).toEqual([]);
    })
    it('Should remove userId 3 from userDisliked it is already in userDisiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        sauce.userDisliked = ['userId 1', 'userId 2', 'userId 3'];
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id', 'userId 3');
        expect(getSaucesService.getOneSauce('id').userDisliked).toEqual(['userId 1', 'userId 2']);
    })

//  dislikeSauce(sauceId, userId)
    it('Should add 1 dislike', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id');
        expect(getSaucesService.getOneSauce('id').dislikes).toEqual(1);
    })
    it('Should add userId to userDisiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id', 'userId');
        expect(getSaucesService.getOneSauce('id').userDisliked).toEqual(['userId']);
    })
    it('Should remove 1 like if userId is already in userLiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', likes: 1, userLiked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id', 'userId');
        expect(getSaucesService.getOneSauce('id').likes).toEqual(0);
    })
    it('Should remove userId from userLiked it is already in userLiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', userDisliked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id', 'userId');
        expect(getSaucesService.getOneSauce('id').userLiked).toEqual([]);
    })
    it('Should remove userId 2 from userLiked it is already in userLiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', userLiked: ['userId 1', 'userId 2', 'userId 3']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id', 'userId 2');
        expect(getSaucesService.getOneSauce('id').userLiked).toEqual(['userId 1', 'userId 3']);
    })

//  cancelLike
    it('Should remove 1 like if userId is already in userLiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', likes: 1, userLiked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId');
        expect(getSaucesService.getOneSauce('id').likes).toEqual(0);
    })
    it('Should remove userId from userLiked it is already in userLiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', likes: 1, userLiked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId');
        expect(getSaucesService.getOneSauce('id').userLiked).toEqual([]);
    })
    it('Should remove userId 2 from userLiked it is already in userLiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', userLiked: ['userId 1', 'userId 2', 'userId 3']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId 2');
        expect(getSaucesService.getOneSauce('id').userLiked).toEqual(['userId 1', 'userId 3']);
    })
    it('Should remove 1 dislike if userId is already in userDisliked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', dislikes: 1, userDisliked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId');
        expect(getSaucesService.getOneSauce('id').dislikes).toEqual(0);
    })
    it('Should remove userId from userDisliked it is already in userDisliked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', likes: 1, userDisliked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId');
        expect(getSaucesService.getOneSauce('id').userDisliked).toEqual([]);
    })
    it('Should remove userId 3 from userDisiked it is already in userDisiked', () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', userDisliked: ['userId 1', 'userId 2', 'userId 3']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId 3');
        expect(getSaucesService.getOneSauce('id').userDisliked).toEqual(['userId 1', 'userId 2']);
    })
})