import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputText: ""
        }
    }

    handleInput = (event) => {
        this.setState({
            inputText: event.target.value
        })
    }

    handleValue = (event) => {
        if (event.keyCode === 13) {
            this.props.collectValue(event.target.value);
            this.setState({
                inputText: ""
            })
        }
    }

    render() {
        return (
            <div className='search col-12'>
                <i className="fa fa-search"></i><input type='text' value={this.state.inputText} onChange={this.handleInput} onKeyUp={this.handleValue} placeholder="Search for some videos" />
            </div>
        )
    }
}

export default Search;