var RecordTable = createReactClass({
  getInitialState: function() {
    return { records: [],
             sort: "title",
             order: "asc" };
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
	handleDeleteRecord: function(record) {
		var records = this.state.records.slice();
		var index = records.indexOf(record);
    records.splice(index, 1);
    this.setState({ records: records });
  },
	handleUpdateRecord: function(old_record, record) {
    var records = this.state.records.slice();
    var index = records.indexOf(old_record);
    records.splice(index, 1, record);
    this.setState({ records: records });
  },
  // getDefaultProps: function() {
  //   return {
  //     records: []
  //   };
  // },
  render: function() {
    var records = [];
    this.props.records.forEach(function(record) {
      records.push(<Record record={record}
                         key={'record' + record.id}
                         handleDeleteRecord={this.handleDeleteRecord}
                         handleUpdateRecord={this.handleUpdateRecord} />);
    }.bind(this));

    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-2 sortable">Title
              <SortColumn name="title"
                          text="Title"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn}/>
            </th>
            <th className="col-md-2 sortable">Date
              <SortColumn name="date"
                          text="Date"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn}/>
            </th>
            <th className="col-md-3 sortable">Amount
              <SortColumn name="amount"
                          text="Amount"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn}/>
            </th>
            <th className="col-md-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records}
        </tbody>
      </table>
    )
  }
});