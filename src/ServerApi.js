

module.exports = {
 SendServerLogStatement : function(contentHash, patternHash,
   transactionHash,eventType, statementId) {

     console.log("SendingData to ServiceApi",contentHash, patternHash,
       transactionHash,eventType)

       fetch(`http://localhost:8080/submitcontentinfo/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          "contentHash":contentHash,
          "patternHash": patternHash,
          "transactionHash": transactionHash,
          "eventType":eventType,
          "statementId":statementId
        }),
      }).then(function(response){
        console.log(response);
      }).catch(error =>console.log(error))


    },

/*
Sending Pre Transaction Information : This is used in the service backend to correlate with the transactionhash and event log, after we get the event from Ethereum network
*/
SendInfoPreTransaction: function(resourcelink, resourceContent, resourcePattern,contentHash,patternHash,eventType, userAddress){
 console.log("Initiationg transaction for submitting content",resourcelink, resourceContent, resourcePattern,contentHash,patternHash,eventType,userAddress)
 fetch(`http://localhost:8080/submitcontentinfo_pretransaction/`,{
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         mode: 'no-cors',
         body: JSON.stringify({
           "resourcelink": resourcelink,
           "resourceContent":resourceContent,
           "resourcePattern":resourcePattern,
           "contentHash":contentHash,
           "patternHash": patternHash,
           "eventType":eventType,
           "userAddress":userAddress
         }),
       }).then(function(response){
         console.log(response);
       }).catch(error =>console.log(error))

},

VerifyInformation: function(filterstyle, filterparam){
  console.log("Filter Style for blockchain information")
  var apidendpoint = new URL("http://localhost:8080/verifycontent/"),
  params = {"filterstyle":filterstyle, "filterparam":filterparam}
Object.keys(params).forEach(key => apidendpoint.searchParams.append(key, params[key]))


  fetch(apidendpoint).then(function(response){
          console.log(response);
        }).catch(error =>console.log(error))
},


/*
Get the endpoint only
*/
SearchTransactionGetUrl: function(requestType, requestParam){
  let result ="placeholderResult"
  var baseUrl="http://localhost:8080/search_transaction/?"
  var requestp ="requestType="+requestType
  var requestparam = "requestParam=" + requestParam
  var finalurl = baseUrl+requestp+"&"+ requestparam
  return finalurl
},
/*Invoke API request to query information to the Service API
We are setting state in parent component from child component. We store json response in parent, which is used to render results in table in
FormTable*/
SearchTransactionInformation: function (requestType, requestParam, thisref, callbackParent){
  let result ="placeholderResult"
  var baseUrl="http://localhost:8080/search_transaction/?"
  var requestp ="requestType="+requestType
  var requestparam = "requestParam=" + requestParam
  var finalurl = baseUrl+requestp+"&"+ requestparam
  console.log(finalurl)

  /*ipfs.util.addFromURL(finalurl, (err, result) => {
  if (err) {
    console.log(err)
  }
  console.log("Ipfs upload result", result)
})*/

  fetch(finalurl)
    .then(response => response.json())
    .then(data => {
      console.log("Setting state in child",data['searchResponse']['responseData']['transactionList'])
      console.log("Calling callback function to parent")
callbackParent(data['searchResponse']['responseData']['transactionList'])
},()=>{
console.log("CallBack for tracking when set state of dataFromApi has been done")
})
},

UpdateTransactionWithIpfs : function(transactionHash, ipfsHash) {
  fetch(`http://localhost:8080/update_transaction_ipfs/`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify({
            "transactionHash": transactionHash,
            "ipfsHash":ipfsHash,
          }),
        }).then(function(response){
          console.log(response);
        }).catch(error =>console.log(error))
}

}
