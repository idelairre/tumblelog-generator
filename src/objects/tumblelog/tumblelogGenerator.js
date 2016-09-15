import nameGenerator from '../../generators/name/nameGenerator';
import * as Utils from '../../utils/utils';

export const generate = (name = generateName()) => {
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
    title: Generators.title(),
    url: `http://${name}.tumblr.com`,
    uuid: `${name}.tumblr.com`
  };
};

export const generateTumblelogs = num => {
  return Utils.populate(new Array(num), generate.bind(this));
};
