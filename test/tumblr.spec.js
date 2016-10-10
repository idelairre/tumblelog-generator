import tumblr from 'tumblr.js';
import Jasmine from 'jasmine';
import { Client } from '../src/index';
import credentials from './tokens.json';

const jasmine = new Jasmine();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const tumblrClient = tumblr.createClient({
  credentials, returnPromises: true
});

const fakerClient = new Client({
  name: 'luksfoks',
  returnPromises: true
});

const removeOptional = post => {
  delete post.reblog;
  delete post.trail;
  delete post.photoset_layout;
};

describe('Client', () => {
  describe('blogInfo', () => {
    it ('should have the same response parameters as the real tumblr client', async done => {
      try {
        const query = { limit: 1 };
        const real = await tumblrClient.blogInfo('camdamage', query);
        const fake = await fakerClient.blogInfo('camdamage', query);
        delete real.blog.ask_anon;
        delete fake.blog.ask_anon;

        expect(Object.keys(real.blog)).toEqual(Object.keys(fake.blog));
        done();
      } catch (err) {
        console.error(err);
      }
    });
  });

  describe('blogPosts', () => {
    it ('should have the same response parameters as the real tumblr client (text)', async done => {
      try {
        const query =  {
          limit: 1,
          type: 'text'
        };
        const real = await tumblrClient.blogPosts('camdamage', query);
        const fake = await fakerClient.blogPosts('camdamage', query);
        removeOptional(real.posts[0]);
        removeOptional(fake.posts[0]);

        expect(Object.keys(real.posts[0]).sort()).toEqual(Object.keys(fake.posts[0]).sort());
        done();
      } catch (err) {
        console.error(err);
      }
    });

    it ('should have the same response parameters as the real tumblr client (photo)', async done => { // TODO: find all the variations on photo posts
      try {
        const query =  {
          limit: 1,
          type: 'photo'
        };
        const real = await tumblrClient.blogPosts('camdamage', query);
        const fake = await fakerClient.blogPosts('camdamage', query);
        removeOptional(real.posts[0]);
        removeOptional(fake.posts[0]);

        expect(Object.keys(real.posts[0]).sort()).toEqual(Object.keys(fake.posts[0]).sort());
        done();
      } catch (err) {
        console.error(err);
      }
    });

    it ('should have the same response parameters as the real tumblr client (quote)', async done => {
      try {
        const query =  {
          limit: 1,
          type: 'quote'
        };
        const real = await tumblrClient.blogPosts('camdamage', query);
        const fake = await fakerClient.blogPosts('camdamage', query);
        removeOptional(real.posts[0]);
        removeOptional(fake.posts[0]);

        expect(Object.keys(real.posts[0]).sort()).toEqual(Object.keys(fake.posts[0]).sort());
        done();
      } catch (err) {
        console.error(err);
      }
    });

    it ('should have the same response parameters as the real tumblr client (link)', async done => {
      try {
        const query =  {
          limit: 1,
          type: 'link'
        };
        const real = await tumblrClient.blogPosts('camdamage', query);
        const fake = await fakerClient.blogPosts('camdamage', query);
        removeOptional(real.posts[0]);
        removeOptional(fake.posts[0]);

        expect(Object.keys(real.posts[0]).sort()).toEqual(Object.keys(fake.posts[0]).sort());
        done();
      } catch (err) {
        console.error(err);
      }
    });

    it ('should have the same response parameters as the real tumblr client (chat)', async done => {
      try {
        const query =  {
          limit: 1,
          type: 'chat'
        };
        const real = await tumblrClient.blogPosts('luxfoks', query);
        const fake = await fakerClient.blogPosts('luxfoks', query);

        removeOptional(real.posts[0]);
        removeOptional(fake.posts[0]);

        expect(Object.keys(real.posts[0]).sort()).toEqual(Object.keys(fake.posts[0]).sort());
        done();
      } catch (err) {
        console.error(err);
      }
    });

    it ('should have the same response parameters as the real tumblr client (answer)', async done => {
      try {
        const query =  {
          limit: 1,
          type: 'answer'
        };
        const real = await tumblrClient.blogPosts('luxfoks', query);
        const fake = await fakerClient.blogPosts('luxfoks', query);

        removeOptional(real.posts[0]);
        removeOptional(fake.posts[0]);

        expect(Object.keys(real.posts[0]).sort()).toEqual(Object.keys(fake.posts[0]).sort());
        done();
      } catch (err) {
        console.error(err);
      }
    });
  });
});

jasmine.execute();
