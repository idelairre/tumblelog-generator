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
    // describe('generate', () => {
    //
    // });
    //
    // describe('generateClientPost', () => {
    //
    // });

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

  // describe('blog', () => {
  //   it ('should work', () => {
  //     const blog = new Generator.Blog({
  //       posts: 100,
  //       name: 'sharkies'
  //     });
  //     expect(blog).toBeDefined();
  //     expect(blog.posts.length).toEqual(100);
  //   });
  //
  //   it ('should only generate posts with the designated blog name', () => {
  //     const blog = new Generator.Blog({
  //       posts: 100,
  //       name: 'sharkies'
  //     });
  //     blog.posts.forEach(post => expect(post.blog_name).toMatch(/sharkies/));
  //   });
  // });

  // describe('dashboard', () => {
  //   it ('should work', () => {
  //     const dashboard = new Generator.dashboard({ posts: 100 });
  //     expect(dashboard).toBeDefined();
  //   });
  //
  //   describe('fetch', () => {
  //     it ('should return posts from the same pool', () => {
  //       const dashboard = new Generator.dashboard({ posts: 100 });
  //       const resp1 = dashboard.fetch({ limit: 10, offset: 0 });
  //       const resp2 = dashboard.fetch({ limit: 10, offset: 0 });
  //       expect(resp1).toEqual(resp2);
  //       const resp3 = dashboard.fetch({ limit: 10, offset: 10 });
  //       const resp4 = dashboard.fetch({ limit: 10, offset: 10 });
  //       expect(resp3).toEqual(resp4);
  //     });
  //   });
  // });
});

if (isNode) {
  jasmine.execute();
}
