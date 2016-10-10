import MarkovChain from 'markovchain';
import { generateTemplateSeeds, parseTemplate, sample, union } from '../../utils/utils';
import { replaceRealInfo } from '../../utils/replacers';
import followingCorpus from '../../dictionary/following.json';
import pos from '../../corpus/pos.json';

const BAD_TERMINATORS = union(pos.WRB, pos.CC, pos.IN, pos.DT, ['A', 'be', 'by', 'with', 'of', 'that', 'That', 'The', 'the', 'THE', 'a', 'an', 'and', 'as', 'I', 'in', 'In', 'im', 'is', 'Is', 'IS', 'on', 'so', 'to', 'To', 'TO', 'no', 'No', 'could', 'And', 'your', ',', 'for', 'from', '&', ':']);

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
    return sentence[sentence.length - 1].includes(BAD_TERMINATORS);
  }

  let seed = '';

  following.forEach(user => {
    const desc = `${user.description}.`.trim();
    seed += desc;
  });
  markovChain = markovChain || new MarkovChain(seed);
  return replaceRealInfo(markovChain.start(getRandomStarter).end(terminator).process()).replace(/"/g, ' ');
}

const generate = (type = 'markov') => {
  if (type === 'markov') {
    return markov();
  }
  return template();
}

export default generate;
