import Faker from 'faker';
import { first, find, sample } from 'lodash';
import generateTumblelogName from '../../../generators/name/nameGenerator';
import { generateDescriptionByTemplate } from '../../../generators/description/descriptionGenerator';
import { generateResponse } from '../../../utils/utils';

export const generateBlogInfo = (name = generateTumblelogName()) => {
  const user = {
    title: name,
    posts: Faker.random.number(),
    updated: Date.parse(Faker.date.past()),
    description: generateDescriptionByTemplate(),
    ask: Faker.random.boolean(),
    likes: Faker.random.number(),
    is_nsfw: Faker.random.boolean()
  };
  if (user.ask) {
    user.ask_anon = Faker.random.boolean();
  }
  return user;
}

export const generateBlogInfos = num => {
  const tumblelogs = [];
  for (let i = 0; i < num; i += 1) {
    tumblelogs.push(generateBlogInfo());
  }
  return tumblelogs;
}

export const fetch = name => {
  const response = {
    blog: generateBlogInfo(name)
  };
  return generateResponse(response);
}
