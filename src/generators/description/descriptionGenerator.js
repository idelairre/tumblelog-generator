import { first, find, sample, unescape, without } from 'lodash';
import { generateTemplateSeeds, parseTemplate, generateResponse, replaceRealInfo } from '../../utils/utils';
import MarkovChain from 'markovchain';
import generateTumblelogName from '../name/nameGenerator';
import followingCorpus from '../../dictionary/following.json';

let markovChain = null;

export const template = (following = followingCorpus) => {
  const seeds = generateTemplateSeeds(following, 'description');
  return parseTemplate(seeds);
}

export const markov = (following = followingCorpus) => {
  const getRandomStarter = wordList => {
    const tmpList = Object.keys(wordList).filter(word => {
      return word[0];
    });
    return sample(tmpList);
  }

  const terminator = sentence => {
    return !sentence[sentence.length - 1].includes('', 'of', 'The', 'the', 'a', 'and', 'I', 'is', 'Is', 'could', 'And', 'your', ',');
  }

  let seed = '';

  following.forEach(user => {
    const desc = unescape(user.description).trim();
    seed += desc;
  });
  markovChain = markovChain || new MarkovChain(seed);
  return replaceRealInfo(markovChain.start(geRandomStarter).end(terminator).process());
}
