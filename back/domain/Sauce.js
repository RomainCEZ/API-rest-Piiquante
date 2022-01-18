const { v4: uuidv4 } = require('uuid');

class Sauce {
    constructor({id = uuidv4(), userId, name, description, manufacturer, mainPepper, heat, imageFileName, likes = 0, dislikes = 0, userLiked = [], userDisliked = []}) {
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
        this.userLiked = userLiked;
        this.userDisliked = userDisliked;
    }
}

module.exports = Sauce;