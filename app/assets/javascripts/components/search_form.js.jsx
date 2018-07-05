var SearchForm = createReactClass({

  handleSearch: function() {
    var query = this.value;
    var self = this;
    $.ajax({
      url: '/records',
      data: { query: query },
      success: function(data) {
        self.props.handleSearch(data);
      },
      error: function(xhr, status, error) {
        alert('Search error: ', status, xhr, error);
      }
    });
  },
  render: function() {
    return(
      <input onChange={this.handleSearch}
            type="text"
            className="form-control"
            placeholder="Type search phrase here..." 
            ref={ref => this.myTextInput = ref} />
    )
  }
});