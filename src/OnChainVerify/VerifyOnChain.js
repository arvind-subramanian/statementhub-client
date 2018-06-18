import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import StatementHubContract from '../../build/contracts/StatementHub.json'


function validate(resourceHash, patternHash, statementId) {
// true means invalid, so our conditions got reversed
return {
  resourceHash: resourceHash.length ===0,
  patternHash: patternHash.length ===0,
  statementId: statementId.length ===0,
};
}
  class VerifyOnChain extends React.Component {
    constructor() {
     super();
     this.handleSubmit = this.handleSubmit.bind(this)
     this.state = {
       resourceHash:'',
       patternHash:'',
       statementId:'',
       touched: {
         resourceHash:false,
         patternHash:false,
         statementId:false,
       },
     }
     this.handleSubmit = this.handleSubmit.bind(this);
     this.instantiateContract =this.instantiateContract.bind(this);
   }

   componentWillMount() {
   // Get network provider and web3 instance.
   // See utils/getWeb3 for more info.
   getWeb3
   .then(results => {
   this.setState({
     web3: results.web3
   })
   // Instantiate contract once web3 provided.
   this.instantiateContract()
   })
   .catch(() => {
   console.log('Error finding web3.')
 })
   }
  instantiateContract() {
    const contract = require('truffle-contract')
    const statementHub = contract(StatementHubContract)
    statementHub.setProvider(this.state.web3.currentProvider)
    var statementHubInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      statementHub.deployed().then( (instance) => {
        statementHubInstance = instance
        this.setState(prevState => ({...prevState, accounts, statementHubInstance}));
    })
    })



  }


   handleBlur = (field) => (evt) => {
     this.setState({
       touched: { ...this.state.touched, [field]: true },
     });
   }
  handleStatementChange = (evt) => {
     this.setState({ statementId: evt.target.value });
   }

   handleResourceHash= (evt) => {
      this.setState({ resourceHash: evt.target.value });
    }

    handlePatternHash = (evt) => {
       this.setState({ patternHash: evt.target.value });
     }

  handleSubmit= (evt) =>  {
     console.log("In handlesubmit clickhandler")
     evt.preventDefault();
     if (!this.canBeSubmitted()) {
       console.log("In prevemt default handle submit")
       evt.preventDefault();
       return;
     }
     console.log("Entered Going to trigger getStatement")
     var statementIdparam = this.state.statementId
/*
/*
uint256 resourcelinkHash;
 uint256 resourceHash;
 uint256 patternHash;
 bool isPatternPresent;
 uint256 resourceSummaryHash;
 address statementIssuer;
 returns(uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash,
 bool isPatternPresent, uint256 resourceSummaryHash,address statementIssuer)
*/

     this.state.statementHubInstance.getStatement(parseInt(statementIdparam, 10),
     {from: this.state.accounts[0], gas:3000000 } ).then((result) => {
       console.log("Result after Transaction =", result)
       var dict = {}
       dict['resourcelinkHash']=result[0].toString()
       dict['patternHash'] = result[1].toString()
       dict['resourceHash'] =result[2].toString()
       dict['isPatternPresent'] = result[3].toString()
       dict['resourceSummaryHash'] = result[4].toString()
       dict['statementIssuer'] = result[5].toString()
        var myarray =[]
        myarray[0] =dict
        console.log("Calling parent component with setstate")
        this.props.callbackParent(myarray),() => {console.log("Done callback to parent")}
        if( (dict['resourceHash'].localeCompare(this.state.resourceHash) ==0 ) && (dict['patternHash'].localeCompare(this.state.patternHash) ==0 ) ){
          this.props.callbackCompare("Identical"),() => {console.log("Done callback to parent:compare")}
        }else {
          this.props.callbackCompare("Not Identical"),() => {console.log("Done callback to parent:compare")}
        }

     })

   }
   canBeSubmitted() {
     const errors = validate(this.state.resourceHash, this.state.patternHash, this.state.statementId);
     const isDisabled = Object.keys(errors).some(x => errors[x]);
     return !isDisabled;
   }

    render() {
      const errors = validate(this.state.resourceHash, this.state.patternHash, this.state.statementId);
      const isDisabled = Object.keys(errors).some(x => errors[x]);

      const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field];
        return hasError ? shouldShow : false;
      };

      return(
          <form onSubmit={this.handleSubmit}>
          <input
          className={shouldMarkError('statementId') ? "error" : ""}
          type="text"
          placeholder="Enter StatementId"
          value={this.state.statementId}
          onChange={this.handleStatementChange }
          onBlur={this.handleBlur('statementId')}
        />
        <input
        className={shouldMarkError('resourceHash') ? "error" : ""}
        type="text"
        placeholder="Enter Resource Hash"
        value={this.state.resourceHash}
        onChange={this.handleResourceHash }
        onBlur={this.handleBlur('resourceHash')}
      />
      <input
      className={shouldMarkError('patternHash') ? "error" : ""}
      type="text"
      placeholder="Enter Pattern Hash"
      value={this.state.patternHash}
      onChange={this.handlePatternHash }
      onBlur={this.handleBlur('patternHash')}
    />

        <button disabled={isDisabled}>Verify OnChain</button>


          </form>
      );
    }
  }
export default VerifyOnChain
