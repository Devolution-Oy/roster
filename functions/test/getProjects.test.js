const test = require('firebase-functions-test')();
const admin = require('firebase-admin');
const sinon = require('sinon');
const chai = require('chai');
const sandbox = sinon.createSandbox();


describe('getProjects', () => {
  let myFunctions;
  let wrapped;
  before(() => {
    sandbox.stub(admin, 'initializeApp');
    myFunctions = require('../index.js');
    wrapped = test.wrap(myFunctions.getProjects);
  });

  after(() => {
    test.cleanup();
    sandbox.restore();
  });

  const stubProject1Data = sandbox.stub();
  const stubProject2Data = sandbox.stub();
  const stubProject3Data = sandbox.stub();

  const projects = {
    docs: [
      { data: stubProject1Data },
      { data: stubProject2Data },
      { data: stubProject3Data },
    ]
  };

  stubProject1Data.returns({
    name: 'project1',
    budget: 1000,
    github: true,
    contributors: [
      'testuser1',
      'testuser2',
      'testuser3',
    ]
  });

  stubProject2Data.returns({
    name: 'project2',
    budget: 2000,
    github: true,
    contributors: [
      'testuser2',
      'testuser3',
    ]
  });

  stubProject3Data.returns({
    name: 'project3',
    budget: 3000,
    github: false,
    contributors: [
      'testuser3',
    ]
  });
  const stubFirestore = sandbox.stub();
  const stubCollection = sandbox.stub();
  const collectionArg = 'projects';
  const stubGet = sinon.stub();
  
  sandbox.stub(admin, 'firestore').get(() => stubFirestore);
  stubFirestore.callsFake(() => {
    return({ collection: stubCollection });
  });
  stubCollection.withArgs(collectionArg).returns({ get: stubGet });
  stubGet.callsFake(() => {
    return new Promise(resolve => {
      resolve(projects);
    });
  });

  it('It returns all projects if no user given', async () => {
    const data = null;
    await wrapped(data, {
      auth:
      {
        uid: 'LoR1xY535HP6gNJNRBokMfhD8343',
        token: '123456'
      }
    }).then(projects => {
      return chai.assert.equal(3, projects.length);
    }).catch(err => {
      throw chai.assert.fail(err.message);
    });
  });

  it('It returns user\'s projects when user is given', async () => {
    const data = 'testuser1';
    await wrapped(data, {
      auth:
      {
        uid: 'LoR1xY535HP6gNJNRBokMfhD8343',
        token: '123456'
      }
    }).then(projects => {
      chai.assert.equal(1, projects.length);
      chai.assert.equal(projects[0].contributors.includes('testuser1'), true);
      return true;
    }).catch(err => {
      chai.assert.fail(err.message);
      return false;
    });
  });
});