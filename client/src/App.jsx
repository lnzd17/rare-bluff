import React, { Component } from "react";
import WordItem from "./_WordItem.jsx";
import WordPage from "./_WordPage.jsx";
import "./App.css";
class App extends Component {
  state = {
    wordList: [],
    showDefinition: false,
    wordDefinition: "",
    offset: 100,
    word: "",
    lexicalCategory: "",
    showOverLay: false,
    wordsVisited: localStorage.wordsVisited
      ? localStorage.wordsVisited.split(",")
      : [],
    wordsNotWorthy: localStorage.notWorthy
      ? localStorage.notWorthy.split(",")
      : []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ wordList: res.result.wordList }))
      .catch(err => console.log(err));
  }

  callApi = async (offset = 100) => {
    this.setState({ showOverLay: true });
    const response = await fetch("/balderdash/" + offset);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    if (body) {
      this.setState({ showOverLay: false });
    }
    return body;
  };

  getDefinition = async word => {
    if (!word) {
      return null;
    }
    this.setState({ showOverLay: true });
    const response = await fetch("/definition/" + word);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    if (body) {
      this.setState({ showOverLay: false });
    }
    return body;
  };

  backToList = () => {
    this.setState({ showDefinition: false });
  };

  fetchMoreResults = () => {
    this.callApi(this.state.offset + 100)
      .then(res =>
        this.setState({
          offset: this.state.offset + 100,
          wordList: [...res.result.wordList, ...this.state.wordList]
        })
      )
      .catch(err => console.log(err));
  };

  markNotWorthy = word => {
    if (!word) {
      return null;
    }
    this.setState(
      {
        wordsNotWorthy: [word, ...this.state.wordsNotWorthy],
        showDefinition: false
      },
      () => {
        localStorage.setItem(
          "notWorthy",
          this.state.wordsNotWorthy ? [...this.state.wordsNotWorthy] : [word]
        );
      }
    );
  };

  handleWordClick = word => {
    if (!word) {
      return null;
    }
    this.setState({ showDefinition: true }, () => {
      this.getDefinition(word)
        .then(res =>
          this.setState(
            {
              wordDefinition: res.result.wordDefinition,
              word: res.result.word,
              lexicalCategory: res.result.lexicalCategory,
              wordsVisited: [res.result.word, ...this.state.wordsVisited]
            },
            () => {
              localStorage.setItem(
                "wordsVisited",
                this.state.wordsVisited ? [...this.state.wordsVisited] : [word]
              );
            }
          )
        )
        .catch(err => console.log(err));
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.showOverLay ? (
          <div className="over-lay">
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        ) : null}
        {this.state.showDefinition ? (
          <WordPage
            markNotWorthy={this.markNotWorthy}
            word={this.state.word}
            lexicalCategory={this.state.lexicalCategory}
            wordDefinition={this.state.wordDefinition}
            backToList={this.backToList}
          />
        ) : (
          <div>
            <div className="button-container-center">
              <button onClick={this.fetchMoreResults} className="button">
                Load More Words
              </button>
            </div>
            <ul className="word-list">
              {this.state.wordList.map((word, index) =>
                  <WordItem
                    wordsNotWorthy={this.state.wordsNotWorthy}
                    wordsVisited={this.state.wordsVisited}
                    handleWordClick={this.handleWordClick}
                    key={index}
                    word={word.word}
                  />
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
export default App;
