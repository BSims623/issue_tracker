const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    let deleteThisUser;
    test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
        const requestData = {
            issue_title: "Post Issue",
            issue_text: "Not creating user",
            created_by: "Brian",
            assigned_to: "Brian",
            status_text: "Need This Pronto Sir"
        };
        chai
            .request(server)
            .post("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                deleteThisUser = res.body;
                done();
            });
    });
    test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
        const requestData = {
            issue_title: "Post Issue",
            issue_text: "Not creating user",
            created_by: "Brian",
        };
        chai
            .request(server)
            .post("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });
    test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
        const requestData = {

        };
        chai
            .request(server)
            .post("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "error": "required field(s) missing"
                });
                done();
            });
    });
    test("View issues on a project: GET request to /api/issues/{project}", function (done) {
        chai
            .request(server)
            .get("/api/issues/apitest")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });
    test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
        chai
            .request(server)
            .get("/api/issues/apitest?issue_title=Post Issue")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });
    test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
        chai
            .request(server)
            .get("/api/issues/apitest?issue_title=Post Issue&created_by=Brian")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });
    test("Update one field on an issue: PUT request to /api/issues/{project}", function (done) {
        const requestData = {
            _id: "6595e9491ff526aee3d70fd0",
            issue_title: "Bob's Post Issue",
        }
        chai
            .request(server)
            .put("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "result": "successfully updated", "_id": "6595e9491ff526aee3d70fd0"
                });
                done();
            });
    });
    test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
        const requestData = {
            _id: "6595e9491ff526aee3d70fd0",
            issue_title: "Still Bob's Post Issue",
            created_by: "Bob"
        }
        chai
            .request(server)
            .put("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "result": "successfully updated", "_id": "6595e9491ff526aee3d70fd0"
                });
                done();
            });
    });
    test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
        const requestData = {

        }
        chai
            .request(server)
            .put("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "error": "missing _id"
                });
                done();
            });
    });
    test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
        const requestData = {
            _id: "6595e9491ff526aee3d70fd0"
        }
        chai
            .request(server)
            .put("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "error": "no update field(s) sent",
                    "_id": "6595e9491ff526aee3d70fd0"
                });
                done();
            });
    });
    test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
        const requestData = {
            _id: "6595e9491ff526aee3d70fd",
            created_by: "Bob"
        }
        chai
            .request(server)
            .put("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "error": "could not update", "_id": "6595e9491ff526aee3d70fd"
                });
                done();
            });
    });
    test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
        const requestData = deleteThisUser;
        const { _id } = deleteThisUser;
        chai
            .request(server)
            .delete("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "result": "successfully deleted", "_id": _id
                });
                done();
            });
    });
    test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
        const requestData = {
            _id: "65961e563d495c00139be6d8",
        }
        chai
            .request(server)
            .delete("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "error": "could not delete", "_id": "65961e563d495c00139be6d8"
                });
                done();
            });
    });
    test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
        const requestData = {

        }
        chai
            .request(server)
            .put("/api/issues/apitest")
            .send(requestData)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "error": "missing _id"
                });
                done();
            });
    });
});

// Create an issue with every field: POST request to /api/issues/{project}
// Create an issue with only required fields: POST request to /api/issues/{project}
// Create an issue with missing required fields: POST request to /api/issues/{project}
// View issues on a project: GET request to /api/issues/{project}
// View issues on a project with one filter: GET request to /api/issues/{project}
// View issues on a project with multiple filters: GET request to /api/issues/{project}
// Update one field on an issue: PUT request to /api/issues/{project}
// Update multiple fields on an issue: PUT request to /api/issues/{project}
// Update an issue with missing _id: PUT request to /api/issues/{project}
// Update an issue with no fields to update: PUT request to /api/issues/{project}
// Update an issue with an invalid _id: PUT request to /api/issues/{project}
// Delete an issue: DELETE request to /api/issues/{project}
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
// Delete an issue with missing _id: DELETE request to /api/issues/{project}