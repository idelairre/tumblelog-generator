import Faker from 'faker';
import generateName from '../../generators/name/nameGenerator';
import { generateTitleByTemplate, generateTitleByMarkovChain } from '../../generators/title/titleGenerator';
import { generateDescriptionByTemplate, generateDescriptionByMarkovChain } from '../../generators/description/descriptionGenerator';
import * as Utils from '../../utils/utils';

export const generateTumblelog = (name = generateName()) => {
  const tumblelogDescription = generateDescriptionByMarkovChain();
  return {
    anonymous_asks: Faker.random.number({ min: 0, max: 1 }),
    asks: Utils.boolean(),
    avatar_url: `https://66.media.tumblr.com/avatar_${Faker.random.uuid().slice(0, 12).replace(/-/g, '')}_128.png`,
    can_recieve_message: Utils.boolean(),
    can_send_messages: Utils.boolean(),
    can_subscribe: Utils.boolean(),
    cname: '',
    customizable: Utils.boolean(),
    dashboard_url: `/blog/${name}`,
    description: tumblelogDescription,
    description_sanitized: tumblelogDescription,
    following: Utils.boolean(),
    is_group: Utils.boolean(),
    is_private: Utils.boolean(),
    is_subscribed: Utils.boolean(),
    likes: Faker.random.number(),
    name: name,
    premium_partner: false,
    share_following: Utils.boolean(),
    title: generateTitleByTemplate(),
    url: `http://${name}.tumblr.com`,
    uuid: `${name}.tumblr.com`
  };
};

export const generateTumblelogs = num => {
  const tumblelogs = [];
  for (let i = 0; i < num; i += 1) {
    tumblelogs.push(generateTumblelog());
  }
  return tumblelogs;
};
