import Generators from '../../generators/generators';
import * as Utils from '../../utils/utils';

export const generateTumblelog = (name = generateName()) => {
  const tumblelogDescription = generateDescriptionByMarkovChain();
  return {
    anonymous_asks: Utils.number({ min: 0, max: 1 }),
    asks: Utils.boolean(),
    avatar_url: `https://66.media.tumblr.com/avatar_${Utils.uuid().slice(0, 12).replace(/-/g, '')}_128.png`,
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
    likes: Utils.number(),
    name: name,
    premium_partner: false,
    share_following: Utils.boolean(),
    title: Generators.title.generate(),
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
