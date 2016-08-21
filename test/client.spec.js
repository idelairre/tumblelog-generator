import { Client } from '../src/index';
import * as Helpers from './helpers';

let jasmine = jasmine || {};

if (Helpers.isNode()) {
  const Jasmine = require('jasmine');
  jasmine = new Jasmine();
}

describe('Client', () => {
  it ('should work', () => {
    const client = new Client();
    expect(client).toBeDefined();
  });

  it ('should return responses as a callback by default', done => {
    const client = new Client();
    client.blogInfo('banshee-hands', (error, data) => {
      expect(data).toBeDefined();
      done();
    });
  });

  it ('should return promises if "returnPromises" argument is passed to constructor', async done => {
    const client = new Client({
      returnPromises: true
    });

    const request = client.blogInfo('banshee-hands');
    expect(request instanceof Promise).toBe(true);

    const response = await client.blogInfo('banshee-hands');

    expect(response.blog).toBeDefined();
    done();
  });

  it ('should expect a callback if "returnPromises" is undefined or false', () => {
    const client = new Client({
      returnPromises: false
    });
    expect(function () {
      client.blogInfo('banshee-hands');
    }).toThrow(new Error('function expects a callback'));
  });

  it ('should throw an error if "returnErrors" is enabled', done => {
    const client = new Client({
      returnErrors: true
    });
    client.blogInfo('banshee-hands', (error, data) => {
      expect(error).toBeDefined();
      expect(data).toBeUndefined();
      done();
    });
  });

  it ('should throw a specific error if designated', done => {
    const client = new Client({
      returnErrors: '401'
    });
    client.blogInfo('banshee-hands', (error, data) => {
      expect(error).toBeDefined();
      expect(error.meta).toMatch(/401/);
      done();
    });
  });

  it ('should persist blog data if "persistData" is enabled', async () => {
    const query = { limit: 10 };

    const client = new Client({
      persistData: true,
      returnPromises: true
    });

    expect(client.persistData).toBe(true);

    const info = await client.blogInfo('banshee-hands');
    const cache = client.__cache.blogs['banshee-hands'];

    expect(cache).toBeDefined();
    expect(cache.info).toEqual(info.blog);
    expect(cache.followers).toBeDefined();
    expect(cache.posts).toBeDefined();
    expect(cache.likes).toBeDefined();

    const posts = await client.blogPosts('banshee-hands', query);
    expect(cache.posts.slice(0, 10)).toEqual(posts.posts);

    const followers = await client.blogFollowers('banshee-hands', query);
    expect(cache.followers.slice(0, 10)).toEqual(followers.users);

    const likes = await client.blogLikes('banshee-hands', query);
    expect(cache.likes.slice(0, 10)).toEqual(likes.posts);
  });

  it ('should persist user data if "persistData" is enabled', async () => {
    const query = { limit: 10 };

    const client = new Client({
      user: 'camdamage',
      persistData: true,
      returnPromises: true
    });

    const cache = client.__cache.user;

    expect(cache).toBeDefined();

    const posts = await client.userDashboard('camdamage', query);
    expect(cache.posts.slice(0, 10)).toEqual(posts.posts);
  });

  describe('Blog methods', () => {
    describe('blogPosts', () => {
      it ('should return a response object containing blog info and an array of posts', done => {
        const client = new Client();
        client.blogPosts('banshee-hands', (error, data) => {
          expect(data).toBeDefined();
          expect(data.posts).toBeDefined();
          expect(data.posts.length).toEqual(10);
          expect(data.blog).toBeDefined();
          done();
        });
      });

      it ('should accept query params', done => {
        const query = {
          limit: 25,
          type: 'quote'
        };
        const client = new Client();
        client.blogPosts('banshee-hands', query, (error, data) => {
          expect(data).toBeDefined();
          expect(data.posts).toBeDefined();
          expect(data.posts.length).toEqual(query.limit);
          data.posts.forEach(post => expect(post.type).toMatch(/quote/));
          done();
        });
      });

      it ('should only return posts from designated blog', done => {
        const client = new Client();
        client.blogPosts('banshee-hands', (error, data) => {
          expect(data).toBeDefined();
          expect(data.posts).toBeDefined();
          expect(data.blog).toBeDefined();
          expect(data.blog.name).toMatch(/banshee-hands/);
          data.posts.forEach(post => expect(post.blog_name).toMatch(/banshee-hands/));
          done();
        });
      });
    });

    describe('blogLikes', () => {
      it ('should only return "liked" posts from the designated blog', done => {
        const client = new Client();
        client.blogPosts('hypocrite-lecteur', (error, data) => {
          data.posts.forEach(post => expect(post.blog_name).toMatch(/hypocrite-lecteur/));
          done();
        });
      });
    });

    describe('blogFollowers', () => {
      it ('should return an array of followers', done => {
        const client = new Client();
        client.blogFollowers('hypocrite-lecteur', (error, data) => {
          expect(data.users).toBeDefined();
          done();
        });
      });

      it ('should accept parameters', done => {
        const query = {
          limit: 25
        };
        const client = new Client();
        client.blogFollowers('hypocrite-lecteur', query, (error, data) => {
          expect(data.users.length).toEqual(query.limit);
          done();
        });
      });
    });

    // describe('blogSubmissions', () => {
    //
    // });
    //
    // describe('blogDrafts', () => {
    //
    // });
    //
    // describe('blogQueue', () => {
    //
    // });
  });

  describe('User methods', () => {
    describe('userInfo', () => {
      it ('should work', done => {
        const client = new Client({
          user: 'luksfoks'
        });

        client.userInfo((err, data) => {
          done();
        });
      });

      it ('should return a user object with the configured user name', done => {
        const client = new Client({
          user: 'luksfoks'
        });

        client.userInfo((err, data) => {
          console.log(data);
          expect(data.user.blogs[0].name).toMatch(/luksfoks/);
          done();
        });
      });
    });

    describe('userDashboard', () => {
      it ('should return an array of posts', done => {
        const client = new Client({
          user: 'luksfoks'
        });

        client.userDashboard((err, data) => {
          expect(Array.isArray(data.posts)).toBe(true);
          done();
        });
      });

      it ('should accept options', done => {
        const query = {
          limit: 50
        };
        const client = new Client({
          user: 'luksfoks'
        });

        client.userDashboard(query, (err, data) => {
          expect(data.posts.length).toEqual(query.limit);
          done();
        });
      });
    });

    describe('userLikes', () => {
      it ('should return an array of liked posts', done => {
        const client = new Client({
          user: 'luksfoks'
        });
        client.userLikes((err, data) => {
          data.posts.forEach(post => expect(post.liked).toBe(true));
          done();
        });
      });

      it ('should accept options', done => {
        const query = {
          limit: 50
        };
        const client = new Client({
          user: 'luksfoks'
        });
        client.userLikes(query, (err, data) => {
          expect(data.posts.length).toEqual(query.limit);
          done();
        });
      });
    });

    describe('userFollowing', () => {
      it ('should return an array of users', done => {
        const client = new Client({
          user: 'luksfoks'
        });
        client.userFollowing((err, data) => {
          expect(Array.isArray(data.blogs)).toBe(true);
          done();
        });
      });

      it ('should accept options', done => {
        const query = {
          limit: 50
        };
        const client = new Client({
          user: 'luksfoks'
        });
        client.userFollowing(query, (err, data) => {
          expect(data.blogs.length).toEqual(query.limit);
          done();
        });
      });
    });
  });
});

if (Helpers.isNode()) {
  jasmine.execute();
}
