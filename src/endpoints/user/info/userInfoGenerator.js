import Faker from 'faker';
import generateTumblelogName from '../../../generators/name/nameGenerator';
import { generateDescriptionByTemplate } from '../../../generators/description/descriptionGenerator';
import { generateTitleByTemplate } from '../../../generators/title/titleGenerator';
import * as Utils from '../../../utils/utils';

export const generateUserInfo = name => {
  const user = {
    title: generateTitleByTemplate(),
    name: name,
    posts: Faker.random.number(),
    url: Utils.generateTumblrUrl(name),
    updated: Utils.generateTimestamp(),
    description: generateDescriptionByTemplate(),
    is_nsfw: Faker.random.boolean(),
    ask: Faker.random.boolean(),
    ask_page_title: generateTitleByTemplate(),
    followed: false,
    likes: Faker.random.number(),
    is_blocked_from_primary: false,
    share_likes: Faker.random.boolean(),
    twitter_enabled: Faker.random.boolean(),
    twitter_send: Faker.random.boolean(),
    facebook_opengraph_enabled: Utils.generateSocialSetting(),
    tweet: Utils.generateSocialSetting(),
    facebook: Utils.generateSocialSetting(),
    followers: Faker.random.number(),
    primary: false,
    admin: Faker.random.boolean(),
    messages: Faker.random.number(),
    queue: Faker.random.number(),
    drafts: Faker.random.number(),
    type: 'public',
    reply_conditions: Faker.random.number({ min: 0, max: 2}),
    subscribed: false,
    can_subscribe: false
  };
  if (user.ask) {
    user.ask_anon = Faker.random.boolean();
  }
  return user;
};

export const generateUserInfos = num => {
  const tumblelogs = [];
  for (let i = 0; i < num; i += 1) {
    tumblelogs.push(generateUserInfo());
  }
  return tumblelogs;
}

export const fetch = (name = generateTumblelogName()) => {
  const response = {
    user: {
      blogs: [generateUserInfo(name)]
    }
  };
  response.user.blogs.concat(generateUserInfos(Faker.random.number({ min: 0, max: 5 })));
  response.user.blogs[0].primary = true;
  response.user.blogs[0].admin = true
  return Utils.generateResponse(response);
};
