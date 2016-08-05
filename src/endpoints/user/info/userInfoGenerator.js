import Generator from '../../../generators/generators';
import * as Utils from '../../../utils/utils';

export const generateUserInfo = name => {
  const user = {
    title: Generator.title.template(),
    name: name,
    posts: Utils.number(),
    url: Utils.tumblrUrl(name),
    updated: Utils.timestamp(),
    description: Generator.description.template(),
    is_nsfw: Utils.boolean(),
    ask: Utils.boolean(),
    ask_page_title: Generator.title.template(),
    followed: false,
    likes: Utils.number(),
    is_blocked_from_primary: false,
    share_likes: Utils.boolean(),
    twitter_enabled: Utils.boolean(),
    twitter_send: Utils.boolean(),
    facebook_opengraph_enabled: Utils.setting(),
    tweet: Utils.setting(),
    facebook: Utils.setting(),
    followers: Utils.number(),
    primary: false,
    admin: Utils.boolean(),
    messages: Utils.number(),
    queue: Utils.number(),
    drafts: Utils.number(),
    type: 'public',
    reply_conditions: Utils.number({ min: 0, max: 2 }),
    subscribed: false,
    can_subscribe: false
  };
  if (user.ask) {
    user.ask_anon = Utils.boolean();
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

export const fetch = (name = Generator.name.tumblelog()) => {
  const response = {
    user: {
      blogs: [generateUserInfo(name)]
    }
  };
  response.user.blogs.concat(generateUserInfos(Utils.number({ min: 0, max: 5 })));
  response.user.blogs[0].primary = true;
  response.user.blogs[0].admin = true
  return Utils.generateResponse(response);
};
