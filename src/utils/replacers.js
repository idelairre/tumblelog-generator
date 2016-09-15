import generateName from '../generators/name/nameGenerator';
import email from '../generators/email/email';
import following from '../dictionary/following.json';

let names = [];

export const replaceNames = text => {
  if (names.length === 0) {
    names = following.map(user => {
      return user.name;
    });
  }
  const words = text.split(' ').map(word => {
    if (names.includes(word)) {
      word = generateName();
      return word;
    }
    return word;
  }).join(' ');
  return words;
};

export const replaceEmails = text => {
  return text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, email());
};

export const replaceTwitter = text => {
  return text.replace(/^@?(\w){1,15}$/g, `@${generateName()}`);
};

export const replaceRealInfo = text => {
  return replaceNames(replaceTwitter(replaceEmails(text)));
};
