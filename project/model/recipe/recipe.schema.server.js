'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        spoontacularId: {type: String, unique: true},
        vegetarian: Boolean,
        vegan: Boolean,
        glutenFree: Boolean,
        dairyFree: Boolean,
        veryHealthy: Boolean,
        cheap: Boolean,
        veryPopular: Boolean,
        sustainable: Boolean,
        weightWatcherSmartPoints: Number,
        gaps: String,
        lowFodmap: Boolean,
        ketogenic: Boolean,
        whole30: Boolean,
        servings: Number,
        sourceUrl: String,
        spoonacularSourceUrl: String,
        aggregateLikes: Number,
        creditText: String,
        sourceName: String,
        extendedIngredients: [{
            ingredientId: {type: mongoose.Schema.ObjectId, ref: "ingredient"},
            spoontacularId: {type: Number},
            aisle: String,
            image: String,
            name: String,
            amount: Number,
            unit: String,
            unitShort: String,
            unitLong: String,
            originalString: String,
            metaInformation: [String],
        }],
        title: String,
        readyInMinutes: Number,
        image: String,
        imageType: String,
        instructions: String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "recipe"});
    return schema;
}());