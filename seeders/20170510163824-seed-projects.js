'use strict';
const M = require('../models/index');
const Project = M.Project;
const User = M.User;
const faker = require('faker');

const projects = [
    {
      title: 'New Fundraising Site',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 11,
      isHidden: false
    }, {
      title: 'Volunteer Application Site',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 11,
      isHidden: false
    }, {
      title: 'Message Board for Cancer Survivors',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 14,
      isHidden: false
    }, {
      title: 'Messaging System between Counselors and People Seeking Help',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 12,
      isHidden: false
    }, {
      title: 'Overhaul Website with Responsive Design',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 13,
      isHidden: false
    }, {
      title: 'Donation Page',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 15,
      isHidden: false
    }, {
      title: 'Set Up Animal Profiles that Need Adoption',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 11,
      isHidden: false
    }, {
      title: 'Map that Shows Location of Offices',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 18,
      isHidden: false
    }, {
      title: 'News Page that Provides Live Updates',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 16,
      isHidden: false
    }, {
      title: 'Set Up Online Education Courses',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 17,
      isHidden: false
    }, {
      title: 'Page that Shows External Help Programs in User’s Area',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 12,
      isHidden: false
    }, {
      title: 'Page to Let People Sign Up for Newsletter',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 20,
      isHidden: false
    }, {
      title: 'Careers Page',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 19,
      isHidden: false
    }, {
      title: 'Let Users Create Profiles',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 16,
      isHidden: false
    }, {
      title: 'Fundraising Page Needs to Show Live Updates',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 15,
      isHidden: false
    }, {
      title: 'Site to Sponsor Children in Need',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 13,
      isHidden: false
    }, {
      title: 'Need Site to Show Educational Videos',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 17,
      isHidden: false
    }, {
      title: 'Site for Educational Online Games',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 14,
      isHidden: false
    }, {
      title: 'Need Site to Connect to Social Media Services',
      description: faker.lorem.paragraph(),
      deadline: faker.date.future(),
      github: 'http://github.com/xyz',
      ownerId: 18,
      isHidden: false
    }
  ].map(function(project) {
    Project.create({
      title: project.title,
      description: project.description,
      deadline: project.deadline,
      github: project.github,
      ownerId: project.ownerId,
      isHidden: project.isHidden
    })
    .catch(function(error) { console.log('Error creating project') });
  })


// const randomOwnerId = (possibleOwners) => {
//   const randomlySelectedIndex = Math.floor(Math.random() * possibleOwners.length);
//   const randomlySelectedOwner = possibleOwners[randomlySelectedIndex];
//   return randomlySelectedOwner.id;
// }
//
// const createProjects = (possibleOwners) => {
//     return Array
//       .from({length: 20})
//       .map(function() {
//         return Project.create({
//           title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
//           description: faker.hacker.phrase(),
//           deadline: faker.date.future(),
//           github: faker.internet.url(),
//           ownerId: randomOwnerId(possibleOwners),
//           isHidden: false
//         })
//         .catch(function(error) { console.log('Duplicate project') });
//       });
// }

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(projects);
    // const possibleOwners = User.findAll(
    //                         { where: { userType: 'nonprofit' } }
    //                       ).then((users) => {
    //                         return Promise.all(createProjects(users));
    //                       });
    // return possibleOwners;
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
