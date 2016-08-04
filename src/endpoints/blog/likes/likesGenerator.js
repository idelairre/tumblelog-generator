import Faker from 'faker';
import { first, find, sample } from 'lodash';
import generateTumblelogName from '../../../generators/name/nameGenerator';

export const generateLike = () => {
  const post = generatePost();
  post.liked = true;
  return post;
}

export const generateLikes = (name, num) => {
  const tumblelogs = [];
  for (let i = 0; i < num; i += 1) {
    tumblelogs.push(generateBlogInfo(name, num));
  }
  return tumblelogs;
}

export const fetch = query => {
  const response = {
    posts: generateLikes(query.blog_name, query.limit)
  };
  return generateResponse(response);
}
