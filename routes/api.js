'use strict';

const { getAllIssues, addNewIssue, updateIssue, deleteIssue } = require('../controllers/issueController.js')

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(getAllIssues)

    .post(addNewIssue)

    .put(updateIssue)

    .delete(deleteIssue);

};
