import React, { Component } from "react";
import axios from "axios";

class WordPage extends Component {
  saveWord = async () => {
    axios.post('/word_item', {
      word: this.props.word,
      definition: this.props.wordDefinition
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  render() {
    return (
        <div>
          <h1>{this.props.word}</h1>
          <h2>{this.props.lexicalCategory}</h2>
          <div className="definition">
            <p>{this.props.wordDefinition}</p>
          </div>
          <div className="button-container-center">
            <button onClick={this.props.backToList} className="button">
              Back to List
            </button>
            <button
              onClick={() => this.props.markNotWorthy(this.props.word)}
              className="button not-worthy"
            >
              Word Not Game Worthy
            </button>
            <button
              onClick={this.saveWord}
              className="button save-word"
            >
              Save Word
            </button>
          </div>
        </div>
    );
  }
}
export default WordPage;
