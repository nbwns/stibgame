var TransportGame = React.createClass({
  getInitialState: function() {
    return {
      transport: {},
      displayedTransport: {},
      score: 0,
      total:0
    };
  },
  changeHandler: function(win) {
        if(win){
          var newScore = this.state.score + 1;
          this.setState({
              score: newScore
          });
        }
        var newTotal = this.state.total + 1;
          this.setState({
              total: newTotal
          });
        this.ajaxRequest();
  },
  ajaxRequest: function() {
    this.serverRequest = $.get(this.props.source, function(result) {
      console.log(result);
      this.setState({
        transport: result.transport,
        displayedTransport: result.displayedTransport
      });
    }.bind(this));
  },
  componentDidMount: function(){
    this.ajaxRequest();
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() { 
		return (
      <div className="game">
			 <TransportNumber transport={this.state.displayedTransport}/>
       <TransportYesNoButtons transport={this.state.transport} displayedTransport={this.state.displayedTransport} onChange={this.changeHandler}/>
       <div className="score">Score: {this.state.score} sur {this.state.total}</div>
		  </div>

        );
  }
});

var TransportYesNoButtons = React.createClass({
  /*getInitialState: function() {
    
  },*/
  propTypes: {
        onChange:   React.PropTypes.func
  },
  handleClick: function(answer) {
    console.log(this);
    var correctColor = this.props.transport.backgroundColor == this.props.displayedTransport.backgroundColor;
    var win = false;
    if(answer == true){
      if(correctColor == true){
        win = true;
      }
    }
    else{
      if(correctColor == false){
        win = true;
      }
    }

    if(typeof this.props.onChange === 'function') {
      this.props.onChange(win);
    }
    
  },
  render: function() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this, true)}>
          Oui
        </button>
        <button onClick={this.handleClick.bind(this, false)}>
          Non
        </button>
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