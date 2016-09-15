import { Client } from '../src/index';
import * as Helpers from './helpers';

// let jasmine = jasmine || {};
//
// if (Helpers.isNode()) {
//   const Jasmine = require('jasmine');
//   jasmine = new Jasmine();
// }

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

let client;

describe('Client', () => {

  it ('should work', () => {
    client = new Client();
    expect(client).toBeDefined();
  });

  it ('should return response as a callback by default', () => {
    client.blogInfo('banshee-hands', (error, data) => {
      expect(data).toBeDefined();
    });
  });

  it ('should return promises if "returnPromises" argument is passed to constructor', async () => {
    client.returnPromises = true;

    const request = client.blogInfo('banshee-hands');
    expect(request instanceof Promise).toBe(true);

    const response = await client.blogInfo('banshee-hands');

    expect(response.blog).toBeDefined();
  });

  it ('should expect a callback if "returnPromises" is undefined or false', () => {
    client.returnPromises = false;

    expect(function () {
      client.blogInfo('banshee-hands');
    }).toThrow(new Error('function expects a callback'));
  });

  it ('should throw an error if "returnErrors" is enabled', () => {
    client.returnErrors = true;

    client.blogInfo('banshee-hands', (error, data) => {
      expect(error).toBeDefined();
    });
  });

  it ('should throw a specific error if designated', () => {
    client.returnErrors = '401';

    client.blogInfo('banshee-hands', (error, data) => {
      expect(error).toBeDefined();
      expect(error.meta).toMatch(/401/);
    });
  });

  it ('should persist blog data if "persistData" is enabled', async () => {
    try {
      const query = {
        limit: 10
      };

      client = new Client({
        persistData: true,
        returnPromises: true
      });

      expect(client.persistData).toBe(true);

      const info = await client.blogInfo('banshee-hands');
      const cache = client.__cache.blogs['banshee-hands'];

      expect(cache).toBeDefined();
      // expect(cache.info).toEqual(info.blog);
      expect(cache.followers).toBeDefined();
      expect(cache.posts).toBeDefined();
      expect(cache.likes).toBeDefined();

      const posts = await client.blogPosts('banshee-hands', query);
      expect(cache.posts.slice(0, 10)).toEqual(posts.posts);

      const followers = await client.blogFollowers('banshee-hands', query);
      expect(cache.followers.slice(0, 10)).toEqual(followers.users);

      const likes = await client.blogLikes('banshee-hands', query);
      expect(cache.likes.slice(0, 10)).toEqual(likes.posts);
    } catch (err) {
      console.error(err);
    }
  });

  it ('should persist user data if "persistData" is enabled', async () => {
    const query = {
      limit: 10
    };

    client = new Client({
      user: 'camdamage',
      persistData: true,
      returnPromises: true
    });

    const cache = client.__cache.user;

    expect(cache).toBeDefined();

    const posts = await client.userDashboard('camdamage', query);
    expect(cache.posts.slice(0, 10)).toEqual(posts.posts);
  });

  describe('Blog', () => {
    describe('blogPosts', () => {
      it ('should return a response object containing blog info and an array of posts', () => {
        client.blogPosts('banshee-hands', (error, data) => {
          expect(data).toBeDefined();
          expect(data.posts).toBeDefined();
          expect(data.posts.length).toEqual(10);
          expect(data.blog).toBeDefined();
        });
      });

      // it ('should accept query params', () => {
      //   const query = {
      //     limit: 15,
      //     type: 'quote'
      //   };
      //   client.blogPosts('banshee-hands', query, (error, data) => {
      //     expect(data).toBeDefined();
      //     expect(data.posts).toBeDefined();
      //     expect(data.posts.length).toEqual(query.limit);
      //     data.posts.forEach(post => expect(post.type).toMatch(/quote/));
      //   });
      // });

      it ('should only return posts from designated blog', () => {
        client.blogPosts('banshee-hands', (error, data) => {
          expect(data).toBeDefined();
          expect(data.posts).toBeDefined();
          expect(data.blog).toBeDefined();
          expect(data.blog.name).toMatch(/banshee-hands/);
          data.posts.forEach(post => expect(post.blog_name).toMatch(/banshee-hands/));
        });
      });
    });

    describe('blogLikes', () => {
      it ('should only return "liked" posts from the designated blog', () => {
        client.blogPosts('hypocrite-lecteur', (error, data) => {
          data.posts.forEach(post => expect(post.blog_name).toMatch(/hypocrite-lecteur/));
        });
      });
    });

    describe('blogFollowers', () => {
      it ('should return an array of followers', () => {
        client.blogFollowers('hypocrite-lecteur', (error, data) => {
          expect(data.users).toBeDefined();
        });
      });

      it ('should accept parameters', () => {
        const query = {
          limit: 25
        };
        const client = new Client();
        client.blogFollowers('hypocrite-lecteur', query, (error, data) => {
          expect(data.users.length).toEqual(query.limit);
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

  describe('User', () => {

    const client = new Client({
      user: 'luksfoks'
    });

    describe('userInfo', () => {
      it ('should work', () => {
        client.userInfo((err, data) => {
          expect(data).toBeDefined();
        });
      });

      // it ('should return a user object with the configured user name', () => {
      //   client.userInfo((err, data) => {
      //     expect(data).toBeDefined();
      //     // expect(data.user.blogs[0].name).toMatch(/luksfoks/);
      //   });
      // });
    });

    describe('userDashboard', () => {
      it ('should return an array of posts', () => {
        client.userDashboard((err, data) => {
          expect(data.posts).toBeDefined();
          // expect(Array.isArray(data.posts)).toBe(true);
        });
      });

      it ('should accept options', () => {
        const query = {
          limit: 50
        };

        client.userDashboard(query, (err, data) => {
          expect(data.posts.length).toEqual(query.limit);
        });
      });
    });

    describe('userLikes', () => {
      it ('should return an array of liked posts', () => {
        client.userLikes((err, data) => {
          data.posts.forEach(post => expect(post.liked).toBe(true));
        });
      });

      it ('should accept options', () => {
        const query = {
          limit: 50
        };

        client.userLikes(query, (err, data) => {
          expect(data.posts.length).toEqual(query.limit);
        });
      });
    });

    describe('userFollowing', () => {
      it ('should return an array of users', () => {
        client.userFollowing((err, data) => {
          expect(Array.isArray(data.blogs)).toBe(true);
        });
      });

      it ('should accept options', () => {
        const query = {
          limit: 50
        };
        client.userFollowing(query, (err, data) => {
          expect(data.blogs.length).toEqual(query.limit);
        });
      });
    });
  });
});

// if (Helpers.isNode()) {
//   jasmine.execute();
// }
