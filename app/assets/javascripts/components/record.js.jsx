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

  handleTitleChange: function(e) {
    this.setState({ title: e.target.value });
  },
  handleDateChange: function(e) {
    this.setState({ date: e.target.value });
  },
  handleAmountChange: function(e) {
    this.setState({ amount: e.target.value });
  },

	handleUpdate: function(e) {
    e.preventDefault();
    console.log(self);
    if (this.validRecord()) {
      var event_data = {
        title: this.state.title,
        date: this.state.date,
        amount: this.state.amount
      };
    console.log(event_data);
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
    if (this.props.record.title && this.props.record.date &&
        this.props.record.amount) {
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
                  value={this.state.title}
                  onChange={this.handleTitleChange}
          />
        </td>
        <td>
          <input name="date"
                  defaultValue={this.props.record.date}
                  className="form-control"
                  type="date"
					        ref={ref => this.value = ref}
                  value={this.state.date}
                  onChange={this.handleDateChange}
          />
        </td>
        <td>
          <input name="amount"
                  defaultValue={this.props.record.amount}
                  className="form-control"
                  type="text"
					        ref={ref => this.value = ref}
                  value={this.state.amount}
                  onChange={this.handleAmountChange}
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