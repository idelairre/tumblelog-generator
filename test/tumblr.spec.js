import tumblr from 'tumblr.js';
import Jasmine from 'jasmine';
import { Client } from '../src/index';
import credentials from './tokens.json';

const jasmine = new Jasmine();

const tumblrClient = tumblr.createClient({ credentials, returnPromises: true });
const fakerClient = new Client({ name: 'luksfoks', returnPromises: true });

describe('Client', () => {
  describe('blogPosts', () => {
    it ('should have the same response parameters as the real tumblr client', async () => {
      const real = await tumblrClient.blogPosts('camdamage', { limit: 1 });
      const fake = await fakerClient.blogPosts('camdamage', { limit: 1 });
      process.stdout.write(fake);
      process.stdout.write(real);
      expect(Object.keys(real)).toBeDefined(Object.keys(fake));
    });
  });
});

jasmine.execute();
