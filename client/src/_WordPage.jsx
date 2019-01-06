import React, { Component } from "react";
class WordPage extends Component {
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
          </div>
        </div>
    );
  }
}
export default WordPage;
