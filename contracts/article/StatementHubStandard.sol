contract StatementHubStandard {

   struct Statement {
    uint256 resourcelinkHash; /*Hash of Resource Link. Hash computed off-chain*/
     uint256 resourceHash; /*Hash of the content present at Resource Link. Hash computed off-chain*/
     uint256 patternHash;  /*Hash of the Pattern which is being referenced within the Resource. Hash computed off-chain */
     bool isPatternPresent; /*Store whether the pattern was present in Resource or not. Determination of the same to be made off-chain */
     uint256 resourceSummaryHash;/*Hash of the Resouce Summary. Resource summary could be a topic*/
     address statementIssuer; /*Address of the person who is issuing a statement. Address of contract which initiated the addition of statement */
  }

  /*Event to be triggered when a Statement is added */
 event StatementAdded(uint256 resourcelinkHash,uint256 indexed resourceHash,uint256 indexed  patternHash, bool indexed isPatternPresent,
   uint256 resourceSummaryHash, address statementIssuer, uint256 statementId);

/*Event to be triggered when a lookup is done on Statement Entry */
 event StatementRequested(uint256 statementId) ;

 /*Event to be triggered when Verification is done with pararameters off-chain, with contents on-chain. statementId is index into  a particular statement*/
 event StatementVerify(uint256 statementId, bool result, uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash, bool isPatternPresent,
 uint256 resourceSummaryHash);

/*Contract method to retrieve contents of a particular statement, indexed by an Id */
 function getStatement(uint256 _Id) public view returns(uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash,
 bool isPatternPresent, uint256 resourceSummaryHash, address statementIssuer);

/*Contract method to add a statement. Returns StatementId, which should be used by the invoker of the method */
 function addStatement(uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash, bool isPatternPresent,
 uint256 resourceSummaryHash) public returns (uint256 statementId);

/*Contract method which is passed a particular 'Id', and comparison is done with the rest of the parameters, and the value stored on-chain */
 function verifyStatement(uint256 Id, uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash, bool isPatternPresent,
 uint256 resourceSummaryHash, address statementIssuer) public view returns (bool);

}
