import * as ROLES from '../constants/roles';

export const adminuser = {
  uid: 'test',
  data: {
    displayName: 'tester',
    email: 'test@test.fi',
    githubUser: 'testuser',
    photo: 'https://photo.url.fi',
    projects: [],
    role: ROLES.ADMIN
  }
};

export const normaluser = {
  uid: 'test',
  data: {
    displayName: 'tester',
    email: 'test@test.fi',
    githubUser: 'testuser',
    photo: 'https://photo.url.fi',
    projects: [],
    role: ROLES.USER
  }
};

const test_user1 = {
  displayName: 'tester1',
  email: 'test1@test.fi',
  githubUser: 'testuser1',
  photo: 'https://photo.url.fi',
  projects: [],
  role: ROLES.USER
};
const test_user2 = {
  displayName: 'tester2',
  email: 'test2@test.fi',
  githubUser: 'testuser2',
  photo: 'https://photo.url.fi',
  projects: [],
  role: ROLES.USER
};
const test_user3 = {
  displayName: 'tester3',
  email: 'test3@test.fi',
  githubUser: 'testuser3',
  photo: 'https://photo.url.fi',
  projects: [],
  role: ROLES.USER
};

export const users = [
  test_user1,
  test_user2,
  test_user3
];

export const projects = [
  { name: 'project1', budget: 15000},
  { name: 'project2', budget: 5000},
  { name: 'project3', budget: 7512.00}
];

export const flushPromises = () => new Promise(setImmediate);