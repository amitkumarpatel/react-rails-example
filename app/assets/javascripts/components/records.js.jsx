var Records = createReactClass({

  getInitialState: function() {
    return {
      records: this.props.data
    };
  },
  handleSearch: function() {
    this.setState({ events: events });
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
		var records = [];
    this.props.data.forEach(function(record) {
      records.push(<Record record={record}
                         key={'record' + record.id}/>);
    }.bind(this));

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
			    	<table className="table table-striped">
			    		<thead>
			    			<tr>
				    			<th className="col-md-3">Title</th>
				    			<th className="col-md-3">Date</th>
				    			<th className="col-md-3">Amount</th>
			    			</tr>
			    		</thead>
			    		<tbody>
								{records}
							</tbody>	
			    	</table>	
          </div>
        </div>
   		</div>
		);	
  }
});