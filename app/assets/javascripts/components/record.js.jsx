var Record = createReactClass({
  getInitialState: function() {
  return { edit: false };
	},
	propTypes: {
    title: PropTypes.string,
    date: PropTypes.string,
    amount:  PropTypes.string
  },
	handleDelete: function(e) {    
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/records/' + this.props.record.id,
      success: function(data) {
        this.props.handleDeleteRecord(this.props.record);
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot delete requested record: ', error);
      }
    });
  },
	handleToggle: function(e) {
  	e.preventDefault();
  	this.setState({ edit: !this.state.edit });
	},
	handleUpdate: function(e) {
    e.preventDefault();
    if (this.validRecord()) {
      var event_data = {
        title: this.recordValue("title"),
        date: this.recordValue("date"),
        amount: this.recordValue("amount")
      };
      $.ajax({
        method: 'PUT',
        url: 'records/' + this.props.record.id,
        data: { record: event_data },
        success: function(data) {
          this.props.handleUpdateRecord(this.props.record, data);
          this.setState({ edit: false });
        }.bind(this),
        error: function(xhr, status, error) {
          alert('Cannot update requested record: ', error);
        }
      });
    } else {
      alert('Please fill all fields.');
    }
  },
  validRecord: function() {
    if (this.recordValue("title") &&
        this.recordValue("amount") &&
        this.recordValue("date") ) {
      return true;
    } else {
      return false;
    }
  },

	renderForm: function() {
    return(
      <tr>
        <td>
          <input title="title"
                  defaultValue={this.props.record.title}
                  className="form-control"
                  type="text"
					        ref={ref => this.value = ref}
          />
        </td>
        <td>
          <input name="date"
                  defaultValue={this.props.record.date}
                  className="form-control"
                  type="date"
					        ref={ref => this.value = ref}
          />
        </td>
        <td>
          <input name="amount"
                  defaultValue={this.props.record.amount}
                  className="form-control"
                  type="text"
					        ref={ref => this.value = ref}
          />
        </td>
        <td>
          <a className="btn btn-success btn-sm"
             onClick={this.handleUpdate}>
            Save
          </a>
          <a className="btn btn-default btn-sm"
             onClick={this.handleToggle} >
            Cancel
          </a>
        </td>
      </tr>
    );
  },
  renderRecord: function() {
    var record = this.props.record;
    return(
      <tr>
        <td>{record.title}</td>
        <td>{record.date}</td>
        <td>{record.amount}</td>
        <td>
          <a className="btn btn-primary btn-xs"
             onClick={this.handleToggle} >
             Edit
          </a>
          <a className="btn btn-danger btn-xs"
             onClick={this.handleDelete} >
            Delete
          </a>
        </td>
      </tr>
    );
  },
  render: function() {
    if (this.state.edit) {
      return(this.renderForm());
    } else {
      return(this.renderRecord());
    }
  }
});