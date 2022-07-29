//Database code that we are testing
let db = require('../database');

//Server code that we are testing
let server = require ('../server');

//Set up Chai library 
let chai = require('chai');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

//Set up Chai for testing web service
let chaiHttp = require ('chai-http');
chai.use(chaiHttp);

//Import the mysql module and create a connection pool with the user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "user1",
    password: "pass123",
    database: "Coursework3",
    debug: false
});



//Wrapper for all database tests
describe('Database', () => {

    //Mocha test for getAllPosts
    describe('#getAllPosts', () => {
        it('should return all of posts in the database', (done) => {

            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of post is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if (resObj.length > 1) {
                    resObj[0].should.have.property('id');
                    resObj[0].should.have.property('author');
                    resObj[0].should.have.property('title');
                    resObj[0].should.have.property('country');
                    resObj[0].should.have.property('content');
                    resObj[0].should.have.property('date');
                    resObj[0].should.have.property('time');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.loadAllPosts(response);
        });
    });

    //==========================================================================================

    //Mocha test for addNewUser
    describe('#addNewUser', () => {
        it('should add a new user to the database', (done) => {

            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that user has been added to database
                let sql = "SELECT username FROM users WHERE username='" + username + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err) { //Check for errors
                        assert.fail(err); //Fail test if this does not work.
                        done(); //End test
                    } else {
                        //Check that user has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM users WHERE userName='" + username + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err) { //Check for errors
                                assert.fail(err); //Fail test if this does not work.
                                done(); //End test
                            } else {
                                // done(); //End test

                                //Clean up database
                                sql = "DELETE FROM users WHERE username='" + username + "'";
                                connectionPool.query(sql, (err, result) => {
                                    if (err) { //Check for errors
                                        assert.fail(err); //Fail test if this does not work.
                                        done(); //End test
                                    } else {
                                        done(); //End test
                                    }
                                });


                            }
                        });

                    }
                });
            };

            //Create random user details
            let username = Math.random().toString(36).substring(2, 15);
            let email = "john@earth.com";
            let password = "john123";

            let newUser = { username: username, email: email, password: password};

            //Call function to add a user to database
            db.registerUser(newUser, response);
        });
    });

    //==========================================================================================

    //Mocha test for login authentification 
    describe('#Login_authentification', () => {
        it('should check for valid credentials in the database', (done) => {

            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                

                //Check that an array of user is returned
                result.should.be.a('string');
                result.includes('granted!');

                //End of test
                done();
            }

            //Store details of a registered user
            let username = "Melissa12";
            let password = "ouioui";

            let user = { username: username, password: password};

            //Call function that we are testing
            db.loginUser(user, response);
        });
    });

    //==========================================================================================

    //Mocha test for addNewPost
    describe('#addNewPost', () => {
        it('should add a new post to the database', (done) => {

            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that post has been added to database
                let sql = "SELECT title FROM posts WHERE title='" + title + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err) { //Check for errors
                        assert.fail(err); //Fail test if this does not work.
                        done(); //End test
                    } else {
                        //Check that post has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM posts WHERE title='" + title + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err) { //Check for errors
                                assert.fail(err); //Fail test if this does not work.
                                done(); //End test
                            } else {
                                // done(); //End test

                                //Clean up database
                                sql = "DELETE FROM posts WHERE title='" + title + "'";
                                connectionPool.query(sql, (err, result) => {
                                    if (err) { //Check for errors
                                        assert.fail(err); //Fail test if this does not work.
                                        done(); //End test
                                    } else {
                                        done(); //End test
                                    }
                                });


                            }
                        });

                    }
                });
            };

            //Create random post details
            let author = Math.random().toString(36).substring(2, 15);
            let title = Math.random().toString(36).substring(2, 15);
            let country = Math.random().toString(36).substring(2, 15);
            let content = Math.random().toString(36).substring(2, 15);
            let date = "2022-03-31";
            let time = "12:31:39";

            let postDetails = { author: author, title: title, country: country, content: content, date:date, time: time};

            //Call function to add post to database
            db.savePostDetails(postDetails, response);
        });
    });

});




//Wrapper for all web service tests
describe('Web Service', () => {

    //Test of GET request sent to /displayPost
    describe('/GET displayPost', () => {
        it('should GET all the posts', (done) => {
            chai.request(server)
                .get('/displayPost')
                .end((err, response) => {
                    //Check the status code
                    response.should.have.status(200);

                    //Convert returned JSON to JavaScript object
                    let resObj = JSON.parse(response.text);

                    //Check that an array of post is returned
                    resObj.should.be.a('array');

                    //Check that appropriate properties are returned
                    if (resObj.length > 1) {
                        resObj[0].should.have.property('id');
                        resObj[0].should.have.property('author');
                        resObj[0].should.have.property('title');
                        resObj[0].should.have.property('country');
                        resObj[0].should.have.property('content');
                        resObj[0].should.have.property('date');
                        resObj[0].should.have.property('time');
                    }

                    //End test
                    done();
                });
        });
    });

});