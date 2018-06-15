contract StatementHubStandard {

   struct Statement {
    uint256 resourcelinkHash;
     uint256 resourceHash;
     uint256 patternHash;
     bool isPatternPresent;
     uint256 resourceSummaryHash;
     address statementIssuer;
  }

 event StatementAdded(uint256 resourcelinkHash,uint256 indexed resourceHash,uint256 indexed  patternHash, bool indexed isPatternPresent, uint256 resourceSummaryHash, address statementIssuer);
 event StatementRequested(uint256 statementId) ;
 event StatementVerify(uint256 statementId, bool result, uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash, bool isPatternPresent,
 uint256 resourceSummaryHash);


 function getStatement(uint256 _Id) public view returns(uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash,
 bool isPatternPresent, uint256 resourceSummaryHash, address statementIssuer);


 function addStatement(uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash, bool isPatternPresent,
 uint256 resourceSummaryHash, address statementIssuer) public returns (uint256 statementId);

 function verifyStatement(uint256 Id, uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash, bool isPatternPresent,
 uint256 resourceSummaryHash, address statementIssuer) public view returns (bool);

}
