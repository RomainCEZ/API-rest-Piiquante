// class Sauce {
//     constructor({_id, userId, name, manufacturer, description, mainPepper, imageUrl, heat, likes, dislikes, usersLiked, usersDisliked}) {
//         this._id = _id;
//         this.userId = userId,
//         this.name = name,
//         this.manufacturer = manufacturer,
//         this.description = description,
//         this.mainPepper = mainPepper,
//         this.imageUrl = imageUrl,
//         this.heat = heat,
//         this.likes = likes,
//         this.dislikes = dislikes,
//         this.usersLiked = usersLiked,
//         this.usersDisliked = usersDisliked
//     }
// }

class Sauce {
    constructor(_id, name, description, manufacturer, mainPepper, heat, imageFileName, userId) {
        this._id = _id,
        this.name = name,
        this.description = description,
        this.manufacturer = manufacturer,
        this.mainPepper = mainPepper,
        this.heat = heat,
        this.userId = userId,
        this.imageUrl = `http://localhost:3000/images/${imageFileName}`,
        this.likes = 0,
        this.dislikes = 0,
        this.userLiked = [],
        this.userDisliked = []
        if (!_id) {
            this._id = `${userId}-${name}`
        }
    }
}

module.exports = Sauce;