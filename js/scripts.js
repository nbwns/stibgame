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
			 <div className="table-row">
        <TransportNumber transport={this.state.displayedTransport}/>
       </div>
       <div className="table-row">
        <TransportYesNoButtons transport={this.state.transport} displayedTransport={this.state.displayedTransport} onChange={this.changeHandler}/>
       </div>
       <div className="table-row">
        <div className="score">Score: {this.state.score} sur {this.state.total}</div>
       </div>
		  </div>

        );
  }
});

var TransportGoodAnswer = React.createClass({
  render: function(){
      return (
      <div class="good-answer">
        <span>Voici la bonne réponse</span>
        <TransportNumber transport={this.state.transport} className="mini" />
      </div>
    );
  }
});

var TransportYesNoButtons = React.createClass({
  getInitialState: function() {
      return {
          disabled: false
      };
  },
  propTypes: {
        onChange:   React.PropTypes.func
  },
  handleClick: function(answer) {
    this.setState({
        disabled: true
    });
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

    this.setState({
        disabled: false
    });
    
  },
  render: function() {
    return (
      <div className="button-group">
        <button className="btn yes" onClick={this.handleClick.bind(this, true)} disabled={this.state.disabled}>
          <i className="fa fa-check"></i>
        </button>
        <button className="btn no" onClick={this.handleClick.bind(this, false)} disabled={this.state.disabled}>
          <i className="fa fa-times"></i>
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
            <div className="transport {this.props.className}" style={divStyle}>
                {this.props.transport.number}
            </div>
        );
    }
});


ReactDOM.render(
  <TransportGame source="https://node-test-nbwns.c9.io/transport/game/random" />,
  document.getElementById('container')
);