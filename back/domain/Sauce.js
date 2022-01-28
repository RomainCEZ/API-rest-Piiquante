const { v4: uuidv4 } = require('uuid');

class Sauce {
    constructor({id = uuidv4(), userId, name, description, manufacturer, mainPepper, heat, imageFileName, usersLiked = [], usersDisliked = []}) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.manufacturer = manufacturer;
        this.mainPepper = mainPepper;
        this.heat = heat;
        this.imageUrl = `http://localhost:3000/images/${imageFileName}`;
        this.usersLiked = usersLiked;
        this.usersDisliked = usersDisliked;
    }
    get likes() {
        return this.usersLiked.length;
    }
    get dislikes() {
        return this.usersDisliked.length;
    }
    like(userId) {
        if (!this.usersLiked.includes(userId)) {
            this.usersLiked.push(userId);
        }
        this.usersDisliked = this.usersDisliked.filter( usersDisliked => usersDisliked !== userId);
    }
    dislike(userId) {
        if (!this.usersDisliked.includes(userId)) {
            this.usersDisliked.push(userId);
        }
        this.usersLiked = this.usersLiked.filter( usersLiked => usersLiked !== userId);
    }
    cancel(userId) {
        this.usersLiked = this.usersLiked.filter( usersLiked => usersLiked !== userId);
        this.usersDisliked = this.usersDisliked.filter( usersDisliked => usersDisliked !== userId);
    }
}

module.exports = Sauce;