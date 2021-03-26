import React, {Component} from "react";

class Rank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emoji: ''
    }
  };

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {return;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(`${process.env.REACT_APP_RANK_LAMBDA_URL}?rank=${entries}`)
      .then(res => res.json())
      .then(data => {
        this.setState({emoji: data.input})
      })
      .catch(console.log);
  }

  render() {
    const {name, entries} = this.props;
    const {emoji} = this.state;

    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {`Entries: ${entries ? entries : 0}`}
        </div>
        {
          emoji &&
          <div className='white f3'>
            {`Rank Badge: ${emoji}`}
          </div>
        }
      </div>
    );
  };
}

export default Rank;
