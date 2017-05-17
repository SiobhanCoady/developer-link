var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const UserTagging = require('../models/index').UserTagging;
const Tag = require('../models/index').Tag;
const UserMaterializedView = require('../models/index').UserMaterializedView;

const _ = require('underscore');


async function getSearchResults(search, searchAttributes) {
  const developers = await UserMaterializedView.searchByText(search);
  const tags = await Tag.findAll();

  const devIds = developers.map(({id}) => id);
  let devDetails = [];

  if (searchAttributes[0] === undefined) {
    devDetails = await User
      .findAll({
        where: {
          id: { $in: devIds },
          userType: 'developer'
        }
      })
  } else {
    devDetails = await User
      .findAll({
        where: {
          id: { $in: devIds },
          userType: 'developer'
        },
        include: [
          {
            model: Tag, as: 'Tags',
            where: {
              name: { $in: searchAttributes }
            }
          }
        ]
      })
  }

  const tagsByType = {
    charityType: [],
    technology: [],
    language: []
  };

  tags.forEach((tag) => {
    tagsByType[tag.tagType].push(tag);
  });
  
  return [devDetails, tagsByType];
}


router.get('/', function(req, res, next) {
  if (req.query.search || req.query.charity || req.query.technology || req.query.language) {
    console.log(req.query);
    const searchAttributes = _.flatten([
      req.query.charity,
      req.query.technology,
      req.query.language
    ]);

    getSearchResults(req.query.search, searchAttributes)
      .then(([filteredDevelopers, typedTags]) =>
        res.render('developers/index', {
          developers: filteredDevelopers,
          techs: typedTags.technology,
          langs: typedTags.language,
          chars: typedTags.charityType
        })
      );

  } else {
    User
      .findAll({
        where: {userType: 'developer'},
        order: [['createdAt', 'DESC']]})
      .then(function(developers) {
        return Promise.all([
          developers,
          Tag.findAll({
            where: { tagType: 'technology'}
          }),
          Tag.findAll({
            where: { tagType: 'language'}
          }),
          Tag.findAll({
            where: { tagType: 'charityType'}
          })
        ])
      })
      .then(function([developers, techs, langs, chars]) {
        res.render('developers/index', { developers, techs, langs, chars });
      });
  }
});

module.exports = router;
