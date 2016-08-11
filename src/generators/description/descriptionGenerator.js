import * as Utils from '../../utils/utils';
import generateTumblelogName from '../name/nameGenerator';
import MarkovChain from 'markovchain';
import followingCorpus from '../../dictionary/following.json';
import pos from '../../corpus/pos.json';

const BAD_TERMINATORS = Utils.union(pos.WRB, pos.CC, pos.IN, pos.DT, ['A', 'be', 'by', 'with', 'of', 'that', 'That', 'The', 'the', 'THE', 'a', 'an', 'and', 'as', 'I', 'in', 'In', 'im', 'is', 'Is', 'IS', 'on', 'so', 'to', 'To', 'TO', 'no', 'No', 'could', 'And', 'your', ',', 'for', 'from', '&', ':']);

let markovChain = null;

export const template = (following = followingCorpus) => {
  const seeds = Utils.generateTemplateSeeds(following, 'description');
  return Utils.parseTemplate(seeds);
}

export const markov = (following = followingCorpus) => {
  const getRandomStarter = wordList => {
    const tmpList = Object.keys(wordList).filter(word => {
      return word[0];
    });
    return Utils.sample(tmpList);
  }

  const terminator = sentence => {
    return sentence[sentence.length - 1].includes(BAD_TERMINATORS);
  }

  let seed = '';

  following.forEach(user => {
    const desc = Utils.unescape(`${user.description}.`).trim();
    seed += desc;
  });
  markovChain = markovChain || new MarkovChain(seed);
  return Utils.replaceRealInfo(markovChain.start(getRandomStarter).end(terminator).process());
}

export const generate = (type = 'markov') => {
  if (type === 'markov') {
    return markov();
  }
  return template();
}
