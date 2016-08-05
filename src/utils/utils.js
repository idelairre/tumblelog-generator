import { isEmpty, replace, sample, truncate, without } from 'lodash';
import mersenne from './mersenne';
import pos from 'pos';
import Generator from '../generators/generators';
import posCorpus from '../corpus/pos.json';
import following from '../dictionary/following.json';

export const boolean = () => {
  return !!number(1);
}

export const color = (baseRed255 = 0, baseGreen255 = 0, baseBlue255 = 0) => {
  // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
  const red = Math.floor((number(256) + baseRed255) / 2);
  const green = Math.floor((number(256) + baseGreen255) / 2);
  const blue = Math.floor((number(256) + baseBlue255) / 2);
  const redStr = red.toString(16);
  const greenStr = green.toString(16);
  const blueStr = blue.toString(16);
  return `#${redStr.length === 1 ? '0' : ''}${redStr}${(greenStr.length === 1 ? '0' : '')}${greenStr}${(blueStr.length === 1 ? '0': '')}${blueStr}`;
}

export const email = (name = Generator.name.tumblelog()) => {
  const provider = sample(['gmail', 'hotmail', 'aol', 'yahoo']);
  return `${name}@${provider}.com`;
}

export const number = (options = { min: 0, max: false }) => {
  if (typeof options === 'number') {
    options = {
      max: options
    };
  }

  if (typeof options.min === 'undefined') {
    options.min = 0;
  }

  if (typeof options.max === 'undefined') {
    options.max = 99999;
  }
  if (typeof options.precision === 'undefined') {
    options.precision = 1;
  }

  // Make the range inclusive of the max value
  let max = options.max;
  if (max >= 0) {
    max += options.precision;
  }

  const randomNumber = options.precision * Math.floor(mersenne.rand(max / options.precision, options.min / options.precision));
  return randomNumber;
}

export const past = (years, refDate) => {
  const date = (refDate) ? new Date(Date.parse(refDate)) : new Date();
  const range = {
    min: 1000,
    max: (years || 1) * 365 * 24 * 3600 * 1000
  };

  let past = date.getTime();
  past -= number(range); // some time from now to N years ago, in milliseconds
  date.setTime(past);

  return date;
}

export const uuid = (length = false) => {
  const RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  const replacePlaceholders = placeholder => {
    const random = number({
      min: 0,
      max: 15
    });
    const value = placeholder == 'x' ? random : (random & 0x3 | 0x8);
    return value.toString(16);
  };
  const uuid = RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
  if (length) {
    return truncate(uuid, { length, omission: '' }).replace(/-/g, '');
  }
  return uuid.replace(/-/g, '');
}

export const words = (length = number(12)) => {
  return Generator.title.template().split(' ').slice(0, length);
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
      word = Generator.name.tumblelog();
      return word;
    }
    return word;
  }).join(' ');
  return words;
}

export const replaceEmails = text => {
  return text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, email());
}

export const replaceTwitter = text => {
  return text.replace(/^@?(\w){1,15}$/g, `@${Generator.name.tumblelog()}`);
}

export const replaceRealInfo = text => {
  return replaceNames(replaceTwitter(replaceEmails(text)));
}

export const setting = () => {
  return sample(['auto', 'Y', 'N']);
}

export const tumblrUrl = name => {
  return `http:\/\/${name}.tumblr.com`;
}

export const tumblrUuid = name => {
  return `${name}.tumblr.com`;
}

export const timestamp = () => {
  return parseInt(truncate(Date.parse(past()), { length: 10, omission: '' }));
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
