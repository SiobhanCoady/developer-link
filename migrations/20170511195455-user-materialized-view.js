const QueryInterface = require("pg-search-sequelize").QueryInterface;
const models = require("../models");

// The model we're creating the materialized view for
const referenceModel = models.User;

const materializedViewName = "UserMaterializedViews";

const attributes = { // field: weight. Every field has a weight to calculate how relevant the search results are.
   firstName: "A",
   lastName: "A",
   description: "B",
   city: "C",
   province: "C",
   country: "C",
   email: "D",
   website: "D",
   github: "D",
   linkedin: "D"
}

const options = {
    include: [ // You can also include fields from associated models
        {
            model: models.Tag,
            foreignKey: "id",
            targetKey: "id",
            associationType: "belongsToMany", // association types are: belongsTo, hasOne, or hasMany
            attributes: { // Those attributes get added to the materialized view's search document and will also be searched just like the other fields
              name: "D"
            }
        }
    ]
}
module.exports = {
    up: queryInterface => new QueryInterface(queryInterface).createMaterializedView(materializedViewName, referenceModel, attributes, options),

    down: queryInterface => new QueryInterface(queryInterface).dropMaterializedView(materializedViewName)
}
