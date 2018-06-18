
import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips,getDataFromServer } from "./utils/TableUtils.js";

// Import React Table
import ReactTable from "react-table";
const ServerApi = require('./ServerApi')
import "react-table/react-table.css";



class TransactionTable extends React.Component {
  constructor() {
    super();
    this.state = {
      dataFromApi:[],
      dataEndPoint:'',
    };

  }



componentDidMount() {
  console.log("Inside Table component did mount")
   let stateVariable = this
}


  render() {
    return (
      <div>
      <ReactTable data={
        this.props.dataFromApi
      }
      columns ={[
      {
        Header:"ResourcePattern",
        accessor:"resourcePattern"
      },
      {
        Header:"PatternHash",
        accessor:"patternHash"
      },
      {
        Header:"ResourceContent",
        accessor:"resourceContent"
      },
      {
          Header:"ResourceHash",
          accessor:"resourceHash"
      },
      {
          Header:"TransactionHash",
          accessor:"transactionHash"
      },
      {
          Header:"ResourceLink",
          accessor:"resourceLink"
      },
      {
          Header:"StatementId",
          accessor:"statementId"
      }

    ]}
    defaultPageSize={10}
    className="-striped -highlight"
    />
        <br />
      </div>
    );
  }
}
export default TransactionTable
