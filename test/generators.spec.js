import { Generator } from '../src/index';

console.log(Generator.posts.generateApiPost('luksfoks', { type: 'chat' }));

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
