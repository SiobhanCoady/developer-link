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
  let arraysOfDevs = [];
  let devIntersection = [];

  if (searchAttributes.length === 0) {
    devIntersection = await User
      .findAll({
        where: {
          id: { $in: devIds },
          userType: 'developer'
        }
      })
  } else {
    let counter = 0;
    for (let attr of searchAttributes) {
      devDetails[counter] = await User
      .findAll({
        where: {
          id: { $in: devIds },
          userType: 'developer'
        },
        include: [
          {
            model: Tag, as: 'Tags',
            where: {
              name: attr
            }
          }
        ]
      })
      .then(function(devs) {
        arraysOfDevs[counter] = devs.map(function(dev) {return dev.id});
      })
      counter++;
    }
    let filteredDevs = _.intersection.apply(_, arraysOfDevs);
    devIntersection = await User
    .findAll({
      where: {
        id: { $in: filteredDevs }
      }
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

  return [devIntersection, tagsByType];
}

async function getCoords(developers) {
  let devCoords = [];
  let layer = 1;
  for (let dev of developers) {
    if (dev.latitude) {
      devCoords.push([
        `${dev.firstName} ${dev.lastName}`,
        dev.latitude,
        dev.longitude,
        layer
      ]);
      layer++;
    }
  }
  return await devCoords;
}


router.get('/', function(req, res, next) {
  if (req.query.search || req.query.charity || req.query.technology || req.query.language) {
    let charities = req.query.charity || [];
    let technologies = req.query.technology || [];
    let languages = req.query.language || [];

    const searchAttributes = _.flatten([
      charities,
      technologies,
      languages
    ]);

    getSearchResults(req.query.search, searchAttributes)
      .then(function([filteredDevelopers, typedTags]) {
        return Promise.all([
          filteredDevelopers,
          typedTags,
          getCoords(filteredDevelopers)
        ])
      })
      .then(([filteredDevelopers, typedTags, devCoords]) =>
        res.render('developers/index', {
          developers: filteredDevelopers,
          devCoords: devCoords,
          techs: typedTags.technology,
          langs: typedTags.language,
          chars: typedTags.charityType,
          selectedChars: charities,
          selectedTechs: technologies,
          selectedLangs: languages,
          searchVal: req.query.search
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
          }),
          getCoords(developers)
        ])
      })
      .then(function([developers, techs, langs, chars, devCoords]) {
        res.render('developers/index', {
          developers,
          techs,
          langs,
          chars,
          devCoords,
          selectedChars: [],
          selectedTechs: [],
          selectedLangs: [],
          searchVal: ''
        });
      });
  }
});

module.exports = router;
