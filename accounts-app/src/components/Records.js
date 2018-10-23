import React, { Component } from "react";
import Record from "./Record";
import axios  from 'axios';

class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    };
  }

  componentDidMount() {
    axios.get(" http://localhost:3004/records").then(
      response =>
        this.setState({
          records: response,
          isLoaded: true
        }),
      error =>
        this.setState({
          isLoaded: true,
          error
        })
    );
  }

  render() {
    const { error, isLoaded, records } = this.state;

    if (error) {
      return <div>Error: {error.statusText}</div>;
    } else if (!isLoaded) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <h2>Records</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <Record {...record} key={record.id} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Records;
