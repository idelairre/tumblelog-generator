import Faker from 'faker';
import { first, find, sample } from 'lodash';
import { generateApiPost } from '../../../objects/post/postGenerator';
import generateTumblelogName from '../../../generators/name/nameGenerator';
import { generateResponse } from '../../../utils/utils';

export const generateBlogPost = (name, type) => {
  return generateApiPost(name, type);
}

export const generateBlogPosts = (name, type, num = 10) => {
  const tumblelogs = [];
  for (let i = 0; i < num; i += 1) {
    tumblelogs.push(generateBlogPost(name, type));
  }
  return tumblelogs;
}

export const fetch = (name, query = { limit: 10, offset: 0 }) => {
  const response = {
    posts: generateBlogPosts(name, query.type, query.limit)
  };
  return generateResponse(response);
}
