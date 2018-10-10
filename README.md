# Statementhub-client
Ethereum Dapp : StatementHub  tracks a  Resource link, Resource Content and Resource Pattern, and stores the hashes of the same on the blockchain. With a queryable layer, we can now track any changes done to the the resource link, content or pattern, and compare with the smart contract data in Ethereum.

Here's a screenshot of the UI 



![screenshotdapp](https://user-images.githubusercontent.com/369012/41529305-51028c9a-730a-11e8-9f34-8c59bcdaa1c0.png)


## Demo Video : 

https://www.youtube.com/watch?v=x7x9bgkkzKs 

## Blog Article: 
https://medium.com/@arvind.subramanian.286/statementhub-an-ethereum-dapp-that-uses-ipfs-microservices-for-authoritative-time-sensitive-267b6b467fd


## Instructions:


<dl>
  <dt>Server</dt>
  <dd>In statementhub-client/ </dd>
  <dd>docker-compose up </dd>

  <dt>Client</dt>
    <dd>In statementhub-client/ </dd>
    <dd>truffle compile --reset --compile-all</dd>
   <dd>truffle migrate --network development</dd>
  <dd>npm install</dd>
   <dd>npm start run</dd>
 
</dl>



 


