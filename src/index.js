import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './index.scss';
import './resets.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordToAdd: '',
            logMessages: [],
        };
        this.handleAddWord = this.handleAddWord.bind(this);
    }

    handleAddWord(e) {
        e.preventDefault();
        axios.get(`${this.props.api}/post/${this.state.wordToAdd}`)
            .then((response) => {
                if (response.status === 200) {
                    this.state.logMessages.unshift(`Added: ${this.state.wordToAdd}`);
                } else {
                    this.state.logMessages.unshift('Could not add.');
                }
                this.forceUpdate();
            });
    }

    render() {
        return (
            <div
                className={styles.aligner}
            >
                <div className={styles.aligner_item}>
                    <h1>Add A Word</h1>
                    <form
                        onSubmit={this.handleAddWord}
                    >
                        <input
                            className={styles.textInput}
                            type="text"
                            name="word"
                            value={this.state.wordToAdd}
                            onChange={({ target }) => this.setState({ wordToAdd: target.value })}
                        />
                        <input
                            className={styles.submit}
                            type="submit"
                            value="Add Word"
                        />
                    </form>
                </div>
                {
                    this.state.logMessages.length > 0 &&
                    <div
                        className={styles.aligner_item}
                    >
                        <h3>Log</h3>
                        {this.state.logMessages.map((log, index) => (
                            <p key={index}>{log}</p>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

ReactDOM.render(
    <App
        api={'/api'}
    />,
    document.querySelector('body'),
);
