import { generateApiPost } from '../../../objects/post/postGenerator';
import { generateResponse } from '../../../utils/utils';

export const generateLike = () => {
  const post = generateApiPost();
  post.liked = true;
  return post;
};

export const generateLikes = (name, num = 10) => {
  const likes = [];
  for (let i = 0; i < num; i += 1) {
    likes.push(generateLike());
  }
  return likes;
};

export const fetch = (name, query = { limit: 10, offset: 0 }) => {
  const response = {
    posts: generateLikes(query.blog_name, query.limit)
  };
  return generateResponse(response);
};
