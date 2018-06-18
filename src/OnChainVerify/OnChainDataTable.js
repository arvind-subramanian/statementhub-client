
import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips,getDataFromServer } from "../utils/TableUtils.js";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";



class OnChainDataTable extends React.Component {
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
/*
uint256 resourcelinkHash;
 uint256 resourceHash;
 uint256 patternHash;
 bool isPatternPresent;
 uint256 resourceSummaryHash;
 address statementIssuer;
*/

  render() {
    return (
      <div>
      <ReactTable data={
        this.props.dataFromApi
      }
      columns ={[
      {
        Header:"ResourceLinkHash",
        accessor:"resourcelinkHash"
      },
      {
        Header:"ResourceHash",
        accessor:"resourceHash"
      },
      {
        Header:"PatternHash",
        accessor:"patternHash"
      },
      {
          Header:"IsPatternPresent",
          accessor:"isPatternPresent"
      },
      {
          Header:"ResourceSummaryHash",
          accessor:"resourceSummaryHash"
      },
      {
          Header:"StatementIssuer",
          accessor:"statementIssuer"
      },

    ]}
    defaultPageSize={10}
    className="-striped -highlight"
    />
        <br />
      </div>
    );
  }
}
export default OnChainDataTable
