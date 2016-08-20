import Generator from '../../generators/generators';
import * as Utils from '../../utils/utils';

export const generate = (name = Generator.name()) => {
  const posts = Utils.number();
  const user = {
    title: Generator.title(),
    name,
    total_posts: posts,
    posts: posts,
    url: Utils.tumblrUrl(name),
    updated: Utils.timestamp(),
    description: Generator.description(),
    is_nsfw: Utils.boolean(),
    ask: Utils.boolean(),
    ask_page_title: Generator.title(),
    ask_anon: Utils.boolean(),
    followed: Utils.boolean(),
    can_send_fan_mail: Utils.boolean(),
    is_blocked_from_primary: false,
    share_likes: Utils.boolean(),
    subscribed: false,
    can_subscribe: Utils.boolean()
  };
  if (!user.ask) {
    delete user.ask_anon;
  }
  return user;
};

export const generateMany = num => {
  return Utils.populate(new Array(num), generate.bind(this));
};

export const fetch = name => {
  const response = {
    blog: generate(name)
  };
  return Utils.generateResponse(response);
};
