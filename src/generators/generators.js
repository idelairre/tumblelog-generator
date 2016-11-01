import Blog from './blog/blog';
import email from './email/email';
import description from './description/descriptionGenerator';
import { generateMany as followings, generate as following } from '../user/following/followingGenerator';
import name from './name/nameGenerator';
import sentence from './sentence/sentence';
import paragraph from './paragraph/paragraph';
import title from './title/titleGenerator';
import words from './words/words';
import url from './url/url';
import posts from '../objects/post/postGenerator';
import * as tumblelog from '../objects/tumblelog/tumblelogGenerator';
import User from './user/user';

const Generator = {
  Blog,
  User,
  email,
  name,
  following,
  followings,
  description,
  sentence,
  paragraph,
  title,
  posts,
  tumblelog,
  words,
  url
};

export default Generator;
