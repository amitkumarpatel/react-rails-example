var Records = createReactClass({
  getInitialState: function() {
    return { records: [],
             sort: "title",
             order: "asc" };
  },

  getDataFromApi: function() {
    var self = this;
    $.ajax({
      url: '/records',
      success: function(data) {
        self.setState({ records: data });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  },

  handleSortColumn: function(title, order) {
    if (this.state.sort != title) {
      order = 'asc';
    }
    $.ajax({
      url: '/records',
      data: { sort_by: title, order: order },
      method: 'GET',
      success: function(data) {
        this.setState({ records: data, sort: title, order: order });
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot sort records: ', error);
      }
    });
  },
  handleSearch: function() {
    var records = this.state.records;
    this.setState({ records: records });
  },
  handleAdd: function(record) {
    var records = this.state.records;
    records.push(record);
    this.setState({ records: records });
  },
  getDefaultProps: function() {
    return {
      records: []
    };
  },
  render: function() {
    return (
    	<div className="container">
				<div className="jumbotron">
          <h1>ReactJS Tutorial</h1>
		    	<h1>Records Listing</h1>
        </div>

			  <div className="row">
        	<div className="col-md-4">
	          <SearchForm handleSearch={this.handleSearch} />
        	</div>
					<div className="col-md-8">
          	<NewForm handleAdd={this.handleAdd} />
        	</div>
      	</div>

        <div className="row">
          <div className="col-md-12">
			    	<RecordTable records={this.props.data}
                        sort={this.state.sort}
                        order={this.state.order}
                        handleDeleteRecord={this.handleDeleteRecord}
                        handleUpdateRecord={this.handleUpdateRecord}/>
          
          </div>
        </div>
   		</div>
		);	
  }
});