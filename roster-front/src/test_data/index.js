import * as ROLES from '../constants/roles';

export const adminuser = {
  uid: 'test',
  data: {
    displayName: 'tester',
    email: 'test@test.fi',
    githubUser: 'testuser2',
    photo: 'https://photo.url.fi',
    role: ROLES.ADMIN
  }
};

export const normaluser = {
  uid: 'test',
  data: {
    displayName: 'tester',
    email: 'test@test.fi',
    githubUser: 'testuser1',
    photo: 'https://photo.url.fi',
    role: ROLES.USER
  }
};

const test_user1 = {
  displayName: 'tester1',
  email: 'test1@test.fi',
  githubUser: 'testuser1',
  photo: 'https://photo.url.fi',
  role: ROLES.USER
};
const test_user2 = {
  displayName: 'tester2',
  email: 'test2@test.fi',
  githubUser: 'testuser2',
  photo: 'https://photo.url.fi',
  role: ROLES.USER
};
const test_user3 = {
  displayName: 'tester3',
  email: 'test3@test.fi',
  githubUser: 'testuser3',
  photo: 'https://photo.url.fi',
  role: ROLES.USER
};

export const users = [
  test_user1,
  test_user2,
  test_user3
];

export const projects = [
  { 
    name: 'project1',
    budget: 15000.0234,
    github: true,
    contributors: [
      'testuser1',
      'testuser2',
      'testuser3',
    ],
    accepted: 48.80,
    bug: 43.30,
    dev: 40.00,
    design:46.60,
    documentation: 44.40,
    question: 45.50,
    review: 47.70,
    testautomation: 42.20,
    ux: 41.10
  },
  {
    name: 'project2',
    budget: 5000,
    github: true,
    contributors: [
      'testuser2',
      'testuser3',
    ],
    accepted: 0,
    bug: 0,
    dev: 0,
    design: 0,
    documentation: 0,
    question: 0,
    review: 0,
    testautomation: 0,
    ux: 0
  },
  {
    name: 'project3',
    budget: 7512.00,
    github: false,
    contributors: [
      'testuser3',
    ]
  }
];

export const project1Records = [
  {
    amount: 49.00,
    description: 'Did something',
    date: '2020-07-01 13:00:00'
  },
  {
    amount: 50.00,
    description: 'Implemented a feature',
    date: '2020-07-02 15:00:00'
  },
  {
    amount: 51.10,
    description: 'Fixed an issue',
    date: '2020-07-03 14:00:00'
  }
];
export const githubTasks = [
  {
    title: 'Task test title1',
    labels: [
      {
        name: 'dev',
        color: 'ff0000'
      }
    ]
  },
  {
    title: 'Task test title2',
    labels: [
      {
        name: 'UX',
        color: '00ff00'
      }
    ]
  }
];

export const flushPromises = () => new Promise(setImmediate);