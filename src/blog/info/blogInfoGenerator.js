import descriptionGenerator from '../../generators/description/descriptionGenerator';
import nameGenerator from '../../generators/name/nameGenerator';
import titleGenerator from '../../generators/title/titleGenerator';
import { boolean, generateResponse, number, populate, timestamp, tumblrUrl } from '../../utils/utils';

export const generate = (name = nameGenerator()) => {
  const posts = number();
  const user = {
    title: titleGenerator(),
    name,
    total_posts: posts,
    posts: posts,
    url: tumblrUrl(name),
    updated: timestamp(),
    description: descriptionGenerator(),
    is_nsfw: boolean(),
    ask: boolean(),
    ask_page_title: titleGenerator(),
    ask_anon: boolean(),
    followed: boolean(),
    can_send_fan_mail: boolean(),
    is_blocked_from_primary: false,
    share_likes: boolean(),
    subscribed: false,
    can_subscribe: boolean()
  };
  if (!user.ask) {
    delete user.ask_anon;
  }
  return user;
};

export const generateMany = num => {
  return populate(new Array(num), generate.bind(this));
};

export const fetch = name => {
  const response = {
    blog: generate(name)
  };
  return generateResponse(response);
};
