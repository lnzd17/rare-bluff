import React, { Component } from "react";
class WordItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked:
        this.props.wordsVisited.length &&
        this.props.wordsVisited.indexOf(this.props.word) !== -1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        clicked:
          nextProps.wordsVisited.length &&
          nextProps.wordsVisited.indexOf(nextProps.word) !== -1
      });
    }
  }

  render() {
    if (
      this.props.wordsNotWorthy &&
      this.props.wordsNotWorthy.indexOf(this.props.word) !== -1
    ) {
      return null;
    }
    return (
      <li
        className={this.state.clicked ? "visited-word" : null}
        onClick={() => this.props.handleWordClick(this.props.word)}
      >
        {this.props.word}
      </li>
    );
  }
}
export default WordItem;
