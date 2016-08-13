import { Generator } from '../src/index';

describe('Generator', () => {
  describe('posts', () => {
    it ('should work', () => {
      const post = Generator.posts.generateApiPost();
      expect(post).toBeDefined();
    });

    it ('should only generate posts of the specified type if type param is passed', () => {
      const post = Generator.posts.generateApiPost('luksfoks', { type: 'quote' });
      expect(post.type).toMatch(/quote/);
    });
  });
});
