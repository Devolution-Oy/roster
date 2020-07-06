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
  uid: 'test_user1',
  data: {
    displayName: 'tester1',
    email: 'test1@test.fi',
    githubUser: 'testuser1',
    photo: 'https://photo.url.fi',
    projects: [],
    role: ROLES.USER
  }
};
const test_user2 = {
  uid: 'test_user2',
  data: {
    displayName: 'tester2',
    email: 'test2@test.fi',
    githubUser: 'testuser2',
    photo: 'https://photo.url.fi',
    projects: [],
    role: ROLES.USER
  }
};
const test_user3 = {
  uid: 'test_user3',
  data: {
    displayName: 'tester3',
    email: 'test3@test.fi',
    githubUser: 'testuser3',
    photo: 'https://photo.url.fi',
    projects: [],
    role: ROLES.USER
  }
};

export const users = [
  test_user1,
  test_user2,
  test_user3
];

export const projects = [
  'project1', 'project2', 'project3'
];
