// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Social {
    address public owner;

    struct Transaction {
        address from;
        address to;
        string name;
        uint256 amount;
        uint256 timestamp;
    }
    
    struct Structher {
        string name;
        string avatar;
        string account;
        string essay;
        uint timestamp;
    }
    struct RabbiTube {
       
        string account;
        string title;
        string description;
        string videoUrl;
        string thumbnail;
        uint timestamp;


    }

    RabbiTube[] public tubes;


    Structher[] public datas;


    Transaction[] public transactions;

    event EtherSent(address indexed user, string name, uint256 amount, uint256 timestamp);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }


    //RabbitTubes


    function addTube(
        
        string calldata  account,
        string calldata  title,
        string calldata  description,
        string calldata  videoUrl,
        string calldata  thumbnail
       
    ) public {
        
        tubes.push(RabbiTube(account , title,description,videoUrl,thumbnail,block.timestamp));
    }

    function getTube() public view returns (RabbiTube[] memory) {
        return tubes;
    }

    //Furry Feeds
       function setEssay(
        string calldata name,
        string calldata avatar,
        string calldata account,
        string calldata essay
    ) public {
        datas.push(Structher(name, avatar,account, essay, block.timestamp));
    }

    function getEssay() public view returns (Structher[] memory) {
        return datas;
    }

    function sendEther(address payable user, string memory name) external onlyOwner payable {
        require(user != address(0), "Invalid user address");
        require(msg.value > 0, "Value sent must be greater than 0");

        // Send Ether to the user
        user.transfer(msg.value);

        // Record the transaction
        transactions.push(Transaction(msg.sender, user, name, msg.value, block.timestamp));
        emit EtherSent(user, name, msg.value, block.timestamp);
    }

  
}


    

