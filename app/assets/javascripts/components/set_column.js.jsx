var SortColumn = createReactClass({
  handleSort: function(e) {
    e.preventDefault();
    var order = this.props.order == 'desc' ? 'asc' : 'desc';
    this.props.handleSortColumn(this.props.name, order);
  },
  render: function() {
    return(
      <span onClick={this.handleSort}>
      </span>
    );
  }
});