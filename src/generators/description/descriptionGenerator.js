import { first, find, sample, unescape, without } from 'lodash';
import { generateTemplateSeeds, parseTemplate, generateResponse, replaceRealInfo } from '../../utils/utils';
import Faker from 'faker';
import MarkovChain from 'markovchain';
import generateTumblelogName from '../name/nameGenerator';
import followingCorpus from '../../dictionary/following.json';

let markov = null;

export const generateDescriptionByTemplate = (following = followingCorpus) => {
  const seeds = generateTemplateSeeds(following, 'description');
  return parseTemplate(seeds);
}

export const generateDescriptionByMarkovChain = (following = followingCorpus) => {
  const getRandomStarter = wordList => {
    const tmpList = Object.keys(wordList).filter(word => {
      return word[0];
    });
    return sample(tmpList);
  }

  const terminator = sentence => {
    return !last(sentence).includes('', 'of', 'The', 'the', 'a', 'and', 'I', 'is', 'Is', 'could', 'And', 'your', ',');
  }

  let seed = '';

  following.forEach(user => {
    const desc = unescape(user.description).trim();
    seed += desc;
  });
  markov = markov || new MarkovChain(seed);
  return replaceRealInfo(markov.start(geRandomStarter).end(terminator).process());
}
