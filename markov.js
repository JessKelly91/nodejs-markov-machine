/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    // split text into individual words
    let words = text.split(/[ \r\n]+/);
    // delete empty strings
    this.words = words.filter(c => c !== "");
    // create how words are chained together
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // create "chains" that only allows machine to choose next index of array

    // create new Map
    let chains = new Map();

    // iterate through each word in the text entered, and create arrays for potential words to follow each word based on text input
    for(let i=0; i < this.words.length; i++){
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    // assign this to the this.chains property
    this.chains = chains;
  }


  /** return random text from chains */

  static choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    let output = [];
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys); 

    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    
    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};