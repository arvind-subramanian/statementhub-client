contract StatementHub {

  mapping(uint256=> address) statementToPersonMap;  // maps which statemnent was issued by which address


  struct Statement {
    uint256 resourcelinkHash;
     uint256 resourceHash;
     uint256 patternHash;
     bool isPatternPresent;
     uint256 resourceSummaryHash;
  }

  Statement[] statementList;

  event LogStatement(uint256 resourcelinkHash,uint256 resourceHash,uint256 patternHash, bool isPatternPresent, uint256 resourceSummaryHash);



 function addStatement(uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash, bool isPatternPresent, uint256 resourceSummaryHash) {
  uint256 statementId = statementList.push(Statement(resourcelinkHash, resourceHash,patternHash,isPatternPresent,resourceSummaryHash)) -1;
  LogStatement(resourcelinkHash, resourceHash,patternHash,isPatternPresent,resourceSummaryHash);
  statementToPersonMap[statementId] = msg.sender;
  }

  function getResourceHash(uint256 id) returns(uint256){
  uint256 res =statementList[id].resourceHash;
  return res;
  }

  function getStatementListLength()
      public
      constant
      returns(uint betCount)
  {
      return statementList.length;
  }



}
