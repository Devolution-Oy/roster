import jwt from 'jsonwebtoken';
import axios from 'axios';
import { githubTasks } from '../../test_data/index';

const owner = 'Devolution-Oy';
const githubAPI = 'https://api.github.com/';
const private_key = process.env.REACT_APP_ROSTER_GH_APP_PRIVATE_KEY;
const APP_ID = process.env.REACT_APP_ROSTER_GITHUB_APP_ID;

const getJWT = () => {
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (10 * 60),
    iss: APP_ID
  };

  const jwt_token = jwt.sign(payload, private_key, { algorithm: 'RS256' });
  return jwt_token;
};

const getAccessToken = () => {
  const jwt_token = getJWT();

  const headers = {
    Authorization: 'Bearer ' + jwt_token,
    Accept: 'application/vnd.github.machine-man-preview+json'
  };

  // Get installations where organization = Devolution Oy
  return axios.get('https://api.github.com/app/installations', { headers: headers }).then(res => {
    const installations = res.data;
    const installation = installations.find(item  => item.account.login === owner);
    
    const params = { 
      permissions: {
        issues: 'read'
      }
    };

    const postHeaders = {
      Authorization: 'Bearer ' + jwt_token,
      Accept: 'application/vnd.github.machine-man-preview+json'
    };

    return axios.post(installation.access_tokens_url, params, {headers: postHeaders});
  });
};

const getHeaders = () => {
  return getAccessToken().then(token => {
    return new Promise(resolve => {
      resolve({
        Authorization: 'token ' + token.data.token,
        Accept: 'application/vnd.github.machine-man-preview+json'
      });
    });
  });
};

const getIssues = (repo, user) => {
  return getHeaders().then(headers => {
    let requestURL = githubAPI + 'repos/' + owner + '/' + repo + '/issues';
    const params = {
      assignee: user,
      state: 'open'
    };
    return axios.get(requestURL, { params: params, headers: headers });
  });
};

// TODO: Call github API for implementation ready issues
const getImplementationReadyIssues = _repo => {
  return new Promise(resolve => {
    resolve({data: githubTasks});
  });
};

const GithubRequests = {
  getIssues,
  getHeaders,
  getJWT,
  getAccessToken,
  getImplementationReadyIssues
};

export default GithubRequests;