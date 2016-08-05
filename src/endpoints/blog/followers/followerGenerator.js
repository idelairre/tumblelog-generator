import Faker from 'faker';
import generateTumblelogName from '../../../generators/name/nameGenerator';
import { generateResponse, generateTumblrUrl, generateTimestamp } from '../../../utils/utils';

export const generateFollower = (name = generateTumblelogName()) => {
  const follower = {
    name,
    following: true,
    url: generateTumblrUrl(name),
    updated: generateTimestamp()
  };
  return follower;
};

export const generateFollowers = (num = 10) => {
  const tumblelogs = [];
  for (let i = 0; i < num; i += 1) {
    tumblelogs.push(generateFollower());
  }
  return tumblelogs;
};

export const fetch = (query = { limit: 10 }) => {
  const response = {
    total_followers: Faker.random.number(),
    users: generateFollowers(query.limit)
  };
  return generateResponse(response);
};
