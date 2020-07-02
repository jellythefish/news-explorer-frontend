export default class Stats {
  constructor(counter, keywords, keyword1, keyword2, keywordOthers) {
    this.username = undefined;
    this._counter = counter,
    this._keywords = keywords;
    this._keyword1 = keyword1;
    this._keyword2 = keyword2;
    this._keywordOthers = keywordOthers;
  }

  renderStats(articleCnt, sortedKeywords) {
      let keywords;
      if (0 < sortedKeywords.length && sortedKeywords.length <= 3) {
        keywords = sortedKeywords.slice(0, 3);
      } else if (sortedKeywords.length > 3) {
        keywords = [sortedKeywords[0], sortedKeywords[1], sortedKeywords.length - 2];
      }
      this._counter.textContent = `${this.username}, у вас ${articleCnt} сохраненных статей`;
      if (!keywords) return this._keywords.textContent = '';
      if (keywords.length === 1) {
        this._keyword1.textContent = `${keywords[0][0]}.`;
        this._keyword2.textContent = '';
        this._keywordOthers.textContent = '';
      } else if (keywords.length === 2) {
        this._keyword1.textContent = keywords[0][0];
        this._keyword2.textContent = ` и ${keywords[1][0]}.`;
        this._keywordOthers.textContent = '';
      } else if (keywords.length === 3 && keywords[2].length > 1) {
        this._keyword1.textContent = keywords[0][0];
        this._keyword2.textContent = `, ${keywords[1][0]}`;
        this._keywordOthers.textContent = ` и ${keywords[2][0]}.`;
      } else {   
        this._keyword1.textContent = keywords[0][0];
        this._keyword2.textContent = `, ${keywords[1][0]}`;
        this._keywordOthers.textContent = ` и ${keywords[2]} другим.`;
      }
    }
    
    sortKeywords(keywords) {
      const res = [];
      for (let elem in keywords) {
        res.push([elem, keywords[elem]]);
      }
      res.sort(function(a, b) {
        return b[1] - a[1];
      })
      return res;
    }
}