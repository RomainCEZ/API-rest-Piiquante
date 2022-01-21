const { v4: uuidv4 } = require('uuid');

class Sauce {
    constructor({id = uuidv4(), userId, name, description, manufacturer, mainPepper, heat, imageFileName, likes = 0, dislikes = 0, usersLiked = [], usersDisliked = []}) {
        this._id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.manufacturer = manufacturer;
        this.mainPepper = mainPepper;
        this.heat = heat;
        this.imageUrl = `http://localhost:3000/images/${imageFileName}`;
        this.likes = likes;
        this.dislikes = dislikes;
        this.usersLiked = usersLiked;
        this.usersDisliked = usersDisliked;
    }
}

module.exports = Sauce;