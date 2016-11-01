import { Generator } from '../src/index';
import BlogGenerator from '../src/blog/blog';
import isNode from 'detect-node';

let jasmine = jasmine || {};

if (isNode) {
  const Jasmine = require('jasmine');
  jasmine = new Jasmine();
}

describe('Generator', () => {
  describe('posts', () => {
    describe('genearteApiPost', () => {
      it ('should work', () => {
        const posts = Generator.posts();
        expect(posts).toBeDefined();
      });

      it ('should only generate posts of the specified type if type param is passed', () => {
        const posts = Generator.posts({ type: 'quote' });
        expect(posts[0].type).toMatch(/quote/);
      });
    });
  });

if (isNode) {
  jasmine.execute();
}
