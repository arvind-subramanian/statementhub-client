  import React, { Component } from 'react'
  const ServerApi = require('../ServerApi')
  import '../css/ResourceDetailsForm.css'

  var murmurhash = require('node-murmurhash');


  import getWeb3 from '../utils/getWeb3'
  import StatementHubContract from '../../build/contracts/StatementHub.json'


  function validate(resourcelink, resourcecontent, patterntext,patternsummary) {
  // true means invalid, so our conditions got reversed
  console.log("Substring search",resourcecontent.toLowerCase().indexOf(patterntext.toLowerCase()))
  return {
    resourcecontent: resourcecontent.length ===0,
    patterntext: patterntext.length ===0,
    resourcelink: resourcelink.length ===0,
    patternsummary:patternsummary.length ===0,
    resourcecontent:resourcecontent.toLowerCase().indexOf(patterntext.toLowerCase()) == -1,
  };
}


  class ResourceDetailsForm extends React.Component {

   constructor( {transactionHashParent}) {
    super();
    this.state = {
      email: '',
      resourcelink:'',
      resourcecontent:'',
      patterntext:'',
      patternsummary:'',
      transactionHash:transactionHashParent,
     touched: {
       resource:false,
       resourcelink:false,
       resourcecontent:false,
       patterntext:false,
       patternsummary:false
     },
  };
  this.handleElementChange = this.handleElementChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.instantiateContract =this.instantiateContract.bind(this);

  }

  componentDidMount() {
  console.log("In component did mount")
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

    let callbackfunc =this.props.callbackParent
    let callbackfuncloader = this.props.callbackParentLoader

    this.state.web3.eth.getAccounts((error, accounts) => {

      if (error) {
         console.log("GetAccounts Error",error);
         }
// checking for new statementhub deployment
statementHub.deployed().then( (instance) => {
  statementHubInstance = instance
  this.setState(prevState => ({...prevState, accounts, statementHubInstance}));
  statementHubInstance.StatementAdded({fromBlock:0}).watch( function(error, result){
    console.log("Printing Event Statement Added",result)
    ServerApi.SendServerLogStatement(result.args.patternHash.toString(),
    result.args.resourceHash.toString(),result.transactionHash.toString(),result.event.toString(), result.args.statementId.toString())
    callbackfunc(result.transactionHash.toString())
    callbackfuncloader(true)
    console.log("Printing parameters txhash,patternhash,resourcehash,event", result.transactionHash.toString(), result.args.patternHash.toString(),result.args.resourceHash.toString())
  })

  statementHubInstance.StatementRequested({fromBlock:0}).watch( function(error, result){
  console.log("Printing StatementRequested", result)
})

  statementHubInstance.StatementVerify({fromBlock:0}).watch(function(error,result){
    console.log("Printing StatementVerify", result)
  })

}).then ( (result)=> {console.log("Printing Result for new StatementHub", result)})
})
}

  //}



  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

  handleLinkChange = (evt) => {
    this.setState({ resourcelink: evt.target.value });
  }
  handleResourceContentChange = (evt) => {
    this.setState({ resourcecontent: evt.target.value });
  }
  handlePatternText = (evt) => {
    this.setState({ patterntext: evt.target.value });
  }

  handlePatternSummary = (evt) => {
    this.setState({ patternsummary: evt.target.value });
  }


  handleElementChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }



  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }

  const { resourcelink,resourcecontent,patterntext, patternsummary } = this.state;
  var resourcelinkparam = this.state.resourcelink
  var resourcecontentparam = this.state.resourcecontent
  var patterntextparam = this.state.patterntext
  var  patternsummaryparam =this.state.patternsummary
  var lh =   murmurhash(resourcelinkparam,97)
  var contenthash =  murmurhash(resourcecontentparam,97)
  var paternhash =  murmurhash(patterntextparam ,97)
  var resourcelinkhash = murmurhash(resourcelinkparam,97)
  var patternsummaryhash = murmurhash(patternsummaryparam, 97)
  var contenthash_str =contenthash+''
  var paternhash_str = paternhash+''
  var resourcelinkhash_str =  resourcelinkhash +''


  if(this.state.statementHubInstance && this.state.accounts){
    console.log("NewContract Check gone through")
  }



  /* Get computed hash value of link, linktext, patterntext, contenttext
  Initiate a sending transaction logic here ->
  In Log Callback, send back data to server api to collate
  In Verification, use search by topic / search by transaction etc
  */
 this.props.callbackParentLoader(false)
 console.log("Accounts Info",this.state.accounts)
  ServerApi.SendInfoPreTransaction(resourcelinkparam,resourcecontentparam, patterntextparam ,contenthash_str,paternhash_str,"StatementAdded", this.state.accounts[0].toString())
  this.state.statementHubInstance.addStatement(resourcelinkhash,paternhash,contenthash,parseInt("1",10),patternsummaryhash,
  {from: this.state.accounts[0], gas:3000000 } ).then((result) => {console.log("Result after Transaction =", result) })


  }

  canBeSubmitted() {
    const errors = validate(this.state.resourcelink, this.state.resourcecontent, this.state.patterntext, this.state.patternsummary);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(this.state.resourcelink, this.state.resourcecontent, this.state.patterntext, this.state.patternsummary);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    return (
      <form onSubmit={this.handleSubmit}>
      <input
      className={shouldMarkError('resourcelink') ? "error" : ""}
      type="text"
      placeholder="Enter Resource link(Ex:Tweet link)"
      value={this.state.resourcelink}
      onChange={this.handleLinkChange }
      onBlur={this.handleBlur('email')}
    />

    <input
      className={shouldMarkError('resourcecontent') ? "error" : ""}
      type="text"
      placeholder="Enter Resource Content(Ex: Content of Tweet) "
      value={this.state.resourcecontent}
      onChange={this.handleResourceContentChange}
      onBlur={this.handleBlur('email')}
    />

    <input
      className={shouldMarkError('patterntext') ? "error" : ""}
      type="text"
      placeholder="Enter Specific text you want to highlight(A phrase matching exactly some portion of Resource Content) "
      value={this.state.patterntext}
      onChange={this.handlePatternText}
      onBlur={this.handleBlur('email')}
    />

    <input
      className={shouldMarkError('filelink') ? "error" : ""}
      type="text"
      placeholder="Enter a summary of highlighted text"
      value={this.state.patternsummary}
      onChange={this.handlePatternSummary}
      onBlur={this.handleBlur('email')}
    />

    <button disabled={isDisabled}>Submit Resource Details</button>
  </form>
)

}
}

  export default ResourceDetailsForm
