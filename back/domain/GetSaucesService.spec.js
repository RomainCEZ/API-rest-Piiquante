const GetSaucesService = require('./GetSaucesService');
const Sauce = require('./Sauce');
const InMemorySauceRepository = require('./mock/InMemorySauceRepository');

describe('GetSaucesService', () => {
    it('Should return an empty list of sauces', async () => {
        const sauceRepository = new InMemorySauceRepository([]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        const sauces = await getSaucesService.getAllSauces();
        expect(sauces).toEqual([]);
    })
    it('Should return a list of one sauce', async () => {
        const expectedSauce = new Sauce('sauce1');
        const sauceRepository = new InMemorySauceRepository([expectedSauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        const sauces = await getSaucesService.getAllSauces();
        expect(sauces).toEqual([expectedSauce]);
    })
    it('Should return a specific sauce from a list of sauces', async () => {
        const sauceIWant = new Sauce({id: 'id1', userId: 'userId', name: 'name'});
        const secondSauce = new Sauce({id: 'id2', userId: 'userId2', name: 'name2'});
        const sauceRepository = new InMemorySauceRepository([sauceIWant, secondSauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        const sauce = await getSaucesService.getSauceById('id1');
        expect(sauce).toEqual(sauceIWant);
    })

//  createSauce(newSauce)
    it('Should add a new sauce and return a list of all sauces including new sauce', async () => {
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
        const sauces = await getSaucesService.getAllSauces();
        expect(sauces).toEqual([originalSauce, newSauce]);
    })
    it('Should add a new sauce and return a list containing this sauce', async () => {
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
        const sauce = await getSaucesService.getSauceById('id2');
        expect(sauce).toBe(newSauce);
    })

//  updateSauce(updatedSauce) 
    it('Should update the original sauce with the updatedSauce params', async () => {
        const originalSauce = new Sauce({id: 'id1', userId: 'userId', name: 'name', description: 'description', manufacturer: 'manufacturer', mainPepper: 'mainPepper', heat: 2});
        const updatedSauce = new Sauce({id: 'id1', userId: 'userId', name: 'name2', description: 'description2', manufacturer: 'manufacturer2', mainPepper: 'mainPepper2', heat: 2});
        const sauceRepository = new InMemorySauceRepository([originalSauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.updateSauce(updatedSauce);
        const sauces = await getSaucesService.getAllSauces();
        expect(sauces).toEqual([updatedSauce]);
    })
    it('Should update the original sauce with the updatedSauce params while keeping original likes and dislikes', async () => {
        const originalSauce = new Sauce({id: 'id1', userId: 'userId', name: 'name', description: 'description', manufacturer: 'manufacturer', mainPepper: 'mainPepper', heat: 2, likes: 4, usersLiked: ['userId'], dislikes: 1, usersDisliked: ['userId2']});
        const updatedSauce = new Sauce({id: 'id1', userId: 'userId', name: 'name2', description: 'description2', manufacturer: 'manufacturer2', mainPepper: 'mainPepper2', heat: 4});
        const sauceRepository = new InMemorySauceRepository([originalSauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.updateSauce(updatedSauce);
        const sauces = await getSaucesService.getAllSauces();
        const expextedSauce = new Sauce({id: 'id1', userId: 'userId', name: 'name2', description: 'description2', manufacturer: 'manufacturer2', mainPepper: 'mainPepper2', heat: 4, likes: 4, usersLiked: ['userId'], dislikes: 1, usersDisliked: ['userId2']});
        expect(sauces).toEqual([expextedSauce]);
    })

//  deleteSauce(sauceId)
    it('Should delete sauce1', async () => {
        const sauce1 = new Sauce({id: 'id1'});
        const sauce2 = new Sauce({id: 'id2'});
        const sauce3 = new Sauce({id: 'id3'});
        const sauceRepository = new InMemorySauceRepository([sauce1, sauce2, sauce3]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.deleteSauce('id1');
        const sauces = await getSaucesService.getAllSauces();
        expect(sauces).toEqual([sauce2, sauce3]);
    })
    it('Should delete sauce2', async () => {
        const sauce1 = new Sauce({id: 'id1'});
        const sauce2 = new Sauce({id: 'id2'});
        const sauce3 = new Sauce({id: 'id3'});
        const sauceRepository = new InMemorySauceRepository([sauce1, sauce2, sauce3]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.deleteSauce('id2');
        const sauces = await getSaucesService.getAllSauces();
        expect(sauces).toEqual([sauce1, sauce3]);
    })
    
//  likeSauce(sauceId, userId)
    it('Should add 1 like', async () => {
        const sauce = new Sauce({id: 'id'});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id');
        const s = await getSaucesService.getSauceById('id');
        expect(s.likes).toEqual(1);
    })
    it('Should add userId to usersLiked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id', 'userId');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersLiked).toEqual(['userId']);
    })
    it('Should remove 1 dislike if userId is already in usersDisliked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        sauce.dislikes = 1;
        sauce.usersDisliked = ['userId'];
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id', 'userId');
        const s = await getSaucesService.getSauceById('id');
        expect(s.dislikes).toEqual(0);
    })
    it('Should remove userId from usersDisliked if it is already in usersDisliked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', usersDisliked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id', 'userId');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersDisliked).toEqual([]);
    })
    it('Should remove userId 3 from usersDisliked if it is already in usersDisliked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', usersDisliked: ['userId 1', 'userId 2', 'userId 3']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.likeSauce('id', 'userId 3');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersDisliked).toEqual(['userId 1', 'userId 2']);
    })

//  dislikeSauce(sauceId, userId)
    it('Should add 1 dislike', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id');
        const s = await getSaucesService.getSauceById('id')
        expect(s.dislikes).toEqual(1);
    })
    it('Should add userId to userDisiked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId'});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id', 'userId');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersDisliked).toEqual(['userId']);
    })
    it('Should remove 1 like if userId is already in usersLiked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', likes: 1, usersLiked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id', 'userId');
        const s = await getSaucesService.getSauceById('id');
        expect(s.likes).toEqual(0);
    })
    it('Should remove userId from usersLiked it is already in usersLiked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', usersDisliked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id', 'userId');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersLiked).toEqual([]);
    })
    it('Should remove userId 2 from usersLiked it is already in usersLiked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', usersLiked: ['userId 1', 'userId 2', 'userId 3']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.dislikeSauce('id', 'userId 2');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersLiked).toEqual(['userId 1', 'userId 3']);
    })

//  cancelLike
    it('Should remove 1 like if userId is already in usersLiked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', likes: 1, usersLiked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId');
        const s = await getSaucesService.getSauceById('id');
        expect(s.likes).toEqual(0);
    })
    it('Should remove userId from usersLiked it is already in usersLiked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', likes: 1, usersLiked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersLiked).toEqual([]);
    })
    it('Should remove userId 2 from usersLiked it is already in usersLiked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', usersLiked: ['userId 1', 'userId 2', 'userId 3']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId 2');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersLiked).toEqual(['userId 1', 'userId 3']);
    })
    it('Should remove 1 dislike if userId is already in usersDisliked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', dislikes: 1, usersDisliked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId');
        const s = await getSaucesService.getSauceById('id')
        expect(s.dislikes).toEqual(0);
    })
    it('Should remove userId from usersDisliked it is already in usersDisliked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', likes: 1, usersDisliked: ['userId']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersDisliked).toEqual([]);
    })
    it('Should remove userId 3 from userDisiked it is already in userDisiked', async () => {
        const sauce = new Sauce({id: 'id', userId: 'userId', usersDisliked: ['userId 1', 'userId 2', 'userId 3']});
        const sauceRepository = new InMemorySauceRepository([sauce]);
        const getSaucesService = new GetSaucesService(sauceRepository);
        getSaucesService.cancelLike('id', 'userId 3');
        const s = await getSaucesService.getSauceById('id');
        expect(s.usersDisliked).toEqual(['userId 1', 'userId 2']);
    })
})