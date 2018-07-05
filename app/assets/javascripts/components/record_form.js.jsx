var NewForm = createReactClass({
  // propTypes: {
  //   name: React.PropTypes.string,
  //   event_date: React.PropTypes.string,
  //   place: React.PropTypes.string,
  //   description: React.PropTypes.string
  // },
  getInitialState: function() {
    return {
      title: '',
      date: '',
      amount: '',
    }
  },
  handleAdd: function(e) {
    e.preventDefault();
    var self = this;
    if (this.validForm()) {
      $.ajax({
        url: '/records',
        method: 'POST',
        data: { record: self.state },
        success: function(data) {
          self.props.handleAdd(data);
          self.setState(self.getInitialState());
        },
        error: function(xhr, status, error) {
          alert('Cannot add a new record: ', error);
        }
      })
    } else {
      alert('Please fill all fields.');
    }
  },
  validForm: function() {
    if (this.state.title && this.state.date &&
        this.state.amount ) {
      return true;
    } else {
      return false;
    }
  },
  handleChange: function(e) {
    var input_name = e.target.name;
    var value = e.target.value;
    this.setState({ [input_name] : value });
  },

  renderForm: function() {
    return(
      <tr>
        <td>
          <input name="name"
                 defaultValue={this.props.event.name}
                 className="form-control"
                 type="text"
                 ref="name"
          />
        </td>
        <td>
          <input name="event_date"
                 defaultValue={this.props.event.event_date}
                 className="form-control"
                 type="date"
                 ref="date"
          />
        </td>
        <td>
          <input name="place"
                 defaultValue={this.props.event.place}
                 className="form-control"
                 type="text"
                 ref="place"
          />
        </td>
        <td>
          <input name="description"
                 defaultValue={this.props.event.description}
                 className="form-control"
                 type="text"
                 ref="description"
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
  render: function() {
    return(
      <form className="form-inline" onSubmit={this.handleAdd}>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 name="title"
                 placeholder="Title"
                 value={this.state.title}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="date"
                 className="form-control"
                 name="date"
                 placeholder="Add Date"
                 value={this.state.date}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 name="amount"
                 placeholder="Amount"
                 value={this.state.amount}
                 onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
});


