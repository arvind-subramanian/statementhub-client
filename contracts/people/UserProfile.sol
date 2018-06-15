
contract UserProfile {

   struct User {
     uint256  userNameHash;
     bool  userEmailVerified;
     uint256  userEmailHash;   // While adding this person, only if person is identified correctly
     uint32  userRole;
     uint32  userReportReputation;
   }


   event LogPersonCreated(uint256 personId, uint256 nameHash, uint256 emailHash, bool emailverified, uint32 personRole, uint32 reputation);

   mapping (uint256 => uint256) emailPersonMap;
   User[] userList;

   function addPerson(uint256 nameHash, uint256 emailHash,bool emailverified, uint32 personRole, uint32 reputation ) external payable {

       uint256 personId = userList.push(User(nameHash,emailverified,emailHash,personRole,reputation)) -1;
       emailPersonMap[emailHash] = personId;
       LogPersonCreated(personId,nameHash,emailHash,emailverified,personRole,reputation);
   }

}
