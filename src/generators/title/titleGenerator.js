import MarkovChain from 'markovchain';
import { generateTemplateSeeds, sample, parseTemplate, union } from '../../utils/utils';
import { replaceRealInfo } from '../../utils/replacers';
import followingCorpus from '../../dictionary/following.json';
import pos from '../../corpus/pos.json';

const BAD_TERMINATORS = union(pos.WRB, pos.CC, pos.IN, pos.DT, ['A', 'be', 'by', 'with', 'of', 'that', 'That', 'The', 'the', 'THE', 'a', 'an', 'and', 'as', 'I', 'in', 'In', 'im', 'is', 'Is', 'IS', 'on', 'so', 'to', 'To', 'TO', 'no', 'No', 'could', 'And', 'your', ',', 'for', 'from', '&', ':']);

let markovChain;

let seed = '';

export const template = (following = followingCorpus) => {
  const seeds = generateTemplateSeeds(following, 'title');
  return parseTemplate(seeds);
}

export const markov = (following = followingCorpus) => {
  const randomStarter = wordList => {
    const tmpList = Object.keys(wordList).filter(word => {
      return word[0];
    });
    return sample(tmpList);
  }

  const terminator = sentence => {
    return sentence.split(' ').length >= 10 || sentence[sentence.length - 1].includes(BAD_TERMINATORS);
  }
  if (seed.length === 0) {
    following.forEach(user => {
      const desc = user.title.trim();
      seed += desc;
    });
  }
  markovChain = markovChain || new MarkovChain(seed);
  let sentence = replaceRealInfo(markovChain.start(randomStarter).end(terminator).process());
  return checkEndWord(sentence);
}

const checkEndWord = sentence => {
  sentence = sentence.split(' ');
  let endWord = sentence[sentence.length - 1];
  if (BAD_TERMINATORS.includes(endWord)) {
    sentence = sentence.slice(0, -1).join(' ');
    return checkEndWord(sentence);
  }

  if (endWord.match(/,/g)) {
    endWord = endWord.replace(/,/, '');
    sentence[sentence.length - 1] = endWord;
  }

  if (Array.isArray(sentence)) {
    sentence = sentence.join(' ');
  }

  return sentence;
}

const generate = (type = 'markov') => {
  if (type === 'markov') {
    return markov();
  }
  return template();
}

export default generate;
