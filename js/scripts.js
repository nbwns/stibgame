// tutorial1.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});

var TransportGame = React.createClass({
  getInitialState: function() {
    return {
      transport: {},
      displayedTransport: {}
    };
  },
  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function(result) {
      console.log(result);
      this.setState({
        transport: result.transport,
        displayedTransport: result.displayedTransport
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() { 
		return (
            <div className="game">
			 <TransportNumber transport={this.state.displayedTransport}/>
		  </div>
        );
  }
});


var TransportNumber = React.createClass({
    render: function() {
        var divStyle = {
        	backgroundColor: this.props.transport.backgroundColor,
          color: this.props.transport.foregroundColor
            
        };
		return (
            <div className="transport" style={divStyle}>
                {this.props.transport.number}
            </div>
        );
    }
});


ReactDOM.render(
  <TransportGame source="https://node-test-nbwns.c9.io/transport/game/random" />,
  document.getElementById('container')
);