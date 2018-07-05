var HelloWorld = createReactClass({
  propTypes: {
    greeting: PropTypes.string
  },

  render: function() {
    return (
      <div>
        <div>Greeting: {this.props.greeting}</div>
      </div>
    );
  }
});

