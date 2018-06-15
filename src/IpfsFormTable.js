import React, { Component } from 'react'
import IpfsForm from './IpfsForm'
import TransactionTable from './TransactionTable'
const ServerApi = require('./ServerApi')
import ipfs from './ipfs'



class IpfsFormTable extends React.Component {
  constructor(props) {
    super(props)
    this.state ={

      dataFromApi:[],
      transactionHash:''
    };

    this.renderWithoutTable = this.renderWithoutTable.bind(this)
    this.renderWithTableAndButton = this.renderWithTableAndButton.bind(this)

  }

  onChildChanged(jsonArray) {
  this.setState({ dataFromApi: jsonArray })
}
onChildChangedHash(tHash) {
  console.log("Setting hashvalue in Parent component =", tHash)
this.setState({ transactionHash: tHash })
}

handleSubmit = (evt) => {
  console.log("In handlesubmit clickhandler for store in ipfs")
  evt.preventDefault();
  var tranactionHash =this.state.dataFromApi[0]["transactionHash"]
  var urlEndPoint = ServerApi.SearchTransactionGetUrl("TransactionHash",this.state.transactionHash)
  console.log("UrlEndPoint", urlEndPoint)
  ipfs.util.addFromURL(urlEndPoint, (err, result) => {
  if (err) {
    console.log(err)
  }
  if(!err){
    ServerApi.UpdateTransactionWithIpfs(this.state.transactionHash,result[0].path)
  }
  console.log("Ipfs upload result", result)
})
  console.log("Uploaded to Ipfs" )
}

 renderWithoutTable() {
   console.log("Rendering Ipfs Form Table")
   return (<div>
     <IpfsForm dataFromApiParent={this.state.dataFromApi}  callbackParent={(newState) => this.onChildChanged(newState)}
callbackSetHash={(tHash) => this.onChildChangedHash(tHash)}/>
     </div>)
 }

 renderWithTableAndButton(){

   return(
     <div>
     <IpfsForm dataFromApiParent={this.state.dataFromApi}  callbackParent={(newState) => this.onChildChanged(newState)} />
     <TransactionTable dataFromApi={this.state.dataFromApi}/>
       <form onSubmit={this.handleSubmit}>
       <button>Store Transaction in IPFS</button>
     </form>
     </div>
   );
 }

render(){
 if(!Array.isArray(this.state.dataFromApi) || !this.state.dataFromApi.length)
 {
   return this.renderWithoutTable();
 }
 else {
   return this.renderWithTableAndButton();

 }
}

}

  export default IpfsFormTable
