var Record = createReactClass({
  
  render: function() {
    var record = this.props.record;
    return(
      <tr>
        <td>{record.title}</td>
        <td>{record.date}</td>
        <td>{record.amount}</td>
      </tr>
    )
  }
});