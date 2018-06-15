var SimpleStorage = artifacts.require("./SimpleStorage.sol");
const UserProfile = artifacts.require("./UserProfile.sol")
const StatementHub = artifacts.require("./StatementHub.sol")
const StatementHubNew = artifacts.require("./StatementHubNew.sol")
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(UserProfile);
  deployer.deploy(StatementHub);
  deployer.deploy(StatementHubNew);
};
