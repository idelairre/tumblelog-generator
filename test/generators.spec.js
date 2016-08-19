import { Generator } from '../src/index';
import BlogGenerator from '../src/blog/blog';

describe('Generator', () => {
  describe('posts', () => {
    it ('should work', () => {
      const post = Generator.posts.generateApiPost();
      expect(post).toBeDefined();
    });

    it ('should only generate posts of the specified type if type param is passed', () => {
      const post = Generator.posts.generateApiPost({ type: 'quote' });
      expect(post.type).toMatch(/quote/);
    });
  });
});
