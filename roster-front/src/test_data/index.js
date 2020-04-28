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