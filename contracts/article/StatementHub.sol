import "./StatementHubStandard.sol";

contract StatementHub is StatementHubStandard {

  mapping(uint256 => address) private statementToPersonMap;  // maps which statemnent was issued by which address

  Statement[] private statementList;
  uint256 private statementNonce;

  function addStatement(uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash, bool isPatternPresent,
  uint256 resourceSummaryHash) public returns (uint256 ) {
    uint256 statementId = statementList.push(Statement(resourcelinkHash, resourceHash, patternHash, isPatternPresent, resourceSummaryHash, msg.sender)) -1;
    emit StatementAdded(resourcelinkHash, resourceHash, patternHash, isPatternPresent, resourceSummaryHash, msg.sender, statementId);
    statementNonce = statementId;
    statementToPersonMap[statementId] = msg.sender;
    return statementNonce;
  }

  function getStatement(uint256 _Id) public view returns(uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash,
  bool isPatternPresent, uint256 resourceSummaryHash, address statementIssuer) {
    require(_Id <= statementNonce);

    emit StatementRequested(_Id);
    return (statementList[_Id].resourcelinkHash, statementList[_Id].resourceHash, statementList[_Id].patternHash,
     statementList[_Id].isPatternPresent, statementList[_Id].resourceSummaryHash, statementList[_Id].statementIssuer);
  }

  function verifyStatement(uint256 Id, uint256 resourcelinkHash, uint256 resourceHash, uint256 patternHash, bool isPatternPresent,
  uint256 resourceSummaryHash, address statementIssuer) public view returns (bool) {
    require(Id <= statementNonce);

    if ( (statementList[Id].resourcelinkHash == resourcelinkHash)
      && (statementList[Id].resourceHash == resourceHash)
      && (statementList[Id].patternHash == patternHash)
      && (statementList[Id].isPatternPresent == isPatternPresent)
      && (statementList[Id].resourceSummaryHash == resourceSummaryHash) ) {
        emit StatementVerify(Id, true, resourcelinkHash, resourceHash, patternHash, isPatternPresent, resourceSummaryHash);
        return true;
    }

    return false;
  }

}
