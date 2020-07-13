import axios from 'axios';
import jwt from 'jsonwebtoken';
import GithubRequests from './GithubRequests';
import { githubTasks } from '../../test_data';

jest.mock('axios');

describe('GithubRequests', () => {

  const mockGet = axios.get.mockImplementation((url) => {
    if (url === 'https://api.github.com/repos/Devolution-Oy/test-repo/issues') {
      return new Promise(resolve => {
        resolve({ data: githubTasks });
      });
    }
    else if (url === 'https://api.github.com/app/installations') {
      const installations = [{
        account: {
          login: 'Devolution-Oy'
        },
        access_tokens_url: 'https://tokens.url'
      }];
      return new Promise(resolve => {
        resolve({ data: installations });
      });
    }
  });

  const mockPost = axios.post.mockImplementationOnce(() => {
    return new Promise(resolve => {
      resolve({
        data: {
          token: 'access_token'
        }
      });
    });
  });

  describe('getJWT', () => {
    it('It contains iat, exp and iss fields', () => {
      const token = GithubRequests.getJWT();
      const pub_key = process.env.REACT_APP_ROSTER_GH_APP_PUB_KEY;
      const APP_ID = process.env.REACT_APP_ROSTER_GITHUB_APP_ID;
      jwt.verify(token, pub_key, (_err, decoded) => {
        expect(decoded.iat).toBeTruthy();
        expect(decoded.exp).toBeTruthy();
        const date = new Date(decoded.exp);
        const now = Math.floor(Date.now() / 1000);
        expect(date > now).toBeTruthy();
        expect(decoded.iss).toBe(APP_ID);
      });
    });
  });
  
  describe('getAccessToken', () => {
    const getExpectedParams = expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: expect.stringMatching('Bearer *'),
        Accept: 'application/vnd.github.machine-man-preview+json'
      })
    });
  
    const postExpectedParams = {
      permissions: {
        issues: 'read'
      },
      headers: {
        Authorization: expect.stringMatching('Bearer *'),
        Accept: 'application/vnd.github.machine-man-preview+json'
      }
    };
  
    it('It fetch github installation access tokens', () => {
      GithubRequests.getAccessToken().then(token => {
        expect(token.data.token).toBeTruthy();
        expect(mockGet).toHaveBeenCalledWith('https://api.github.com/app/installations', getExpectedParams);
        expect(mockPost).toHaveBeenCalled('https://tokens.url', postExpectedParams);
      }).catch(err => {
        throw err.message;
      });
    });
  });

  describe('getIssues', () => {
    it('Fetch issues from github', () => {
      const expected_params = {
        params: {
          assignee: 'test_user',
          state: 'open'
        },
        headers: expect.objectContaining({
          Authorization: expect.stringMatching('token somToken'),
          Accept: 'application/vnd.github.machine-man-preview+json'
        })
      };


      GithubRequests.getIssues('test-repo', 'test_user').then(res => {
        expect(mockGet).toHaveBeenCalledWith('https://api.github.com/repos/Devolution-Oy/test-repo/issues', expected_params);
        expect(mockPost).toHaveBeenCalled();
        expect(res.data[0].title).toBe('Task test title1');
        expect(res.data[1].title).toBe('Task test title2');
      }).catch(err => {
        throw err.message;
      });
    });
  });
});