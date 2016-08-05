import { isEmpty, replace, sample, truncate, without } from 'lodash';
import Faker from 'faker';
import pos from 'pos';
import generateTumblelogName from '../generators/name/nameGenerator';
import posCorpus from '../corpus/pos.json';
import following from '../dictionary/following.json';

export const boolean = () => {
  return Faker.random.boolean();
}

export const number = (args = { min: 0, max: false }) => {
  return Faker.random.number(args);
}

export const uuid = (length = false) => {
  const uuid = Faker.random.uuid();
  if (length) {
    return truncate(uuid, { length, omission: '' }).replace(/-/g, '');
  }
  return uuid.replace(/-/g, '');
}

let names = [];

export const replaceNames = text => {
  if (isEmpty(names)) {
    names = following.map(user => {
      return user.name;
    });
  }
  const words = text.split(' ').map(word => {
    if (names.includes(word)) {
      word = generateTumblelogName();
      return word;
    } else {
      return word;
    }
  }).join(' ');
  return words;
}

export const replaceEmails = text => {
  return text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, Faker.internet.email());
}

export const replaceTwitter = text => {
  return text.replace(/^@?(\w){1,15}$/g, `@${generateTumblelogName()}`);
}

export const replaceRealInfo = text => {
  return replaceNames(replaceTwitter(replaceEmails(text)));
}

export const generateSocialSetting = () => {
  return sample(['auto', 'Y', 'N']);
}

export const generateTumblrUrl = name => {
  return `http:\/\/${name}.tumblr.com`;
}

export const generateTumblrUuid = name => {
  return `${name}.tumblr.com`;
}

export const generateTimestamp = () => {
  return parseInt(truncate(Date.parse(Faker.date.past()), { length: 10, omission: '' }));
}

export const generateResponse = response => {
  return {
    meta: '200',
    msg: 'OK',
    response
  };
}

export const generateError = () => {
  return {
    meta: '400',
    msg: 'Error'
  }
}

export const parseTemplate = template => {
  let sentence = template;
  const occurrences = template.match(/\{\{(.+?)\}\}/g);

  if (occurrences && occurrences.length) {
    for (let i = 0; i < occurrences.length; i += 1) {
      let action = occurrences[i].replace('{{', '').replace('}}', '').trim();
      let result = '';
      if (typeof posCorpus[action] !== 'undefined') {
        try {
          result = sample(posCorpus[action]).toLowerCase();
        } catch (err) {
          console.error(err);
        }
      } else {
        if (action.match(/\W/)) {
          result = action;
        } else {
          result = '{{ ' + action + ' }}';
        }
      }
      sentence = sentence.replace(occurrences[i], result);
    }
    return replaceRealInfo(sentence).replace(/\"/g, '').replace(/\s+(\W)/g, '$1');;
  }
}

const seeds = [];

export const generateTemplateSeeds = (corpus, property) => {
  const tagger = new pos.Tagger();
  if (isEmpty(seeds)) {
    corpus.forEach(item => {
      const desc = unescape(item[property]).trim();
      const words = new pos.Lexer().lex(desc);
      let tags = tagger.tag(words);
      tags = tags.map(pos => {
        return `{{ ${pos[1]} }}`;
      }).join(' ');
      seeds.push(tags);
    });
  }
  return sample(without(seeds, ''));
}
