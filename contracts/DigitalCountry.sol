// SPDX-License-Identifier: MIT

import "./NftForCountry.sol";

pragma solidity ^0.8.0;

contract DigitalCountry{

    struct User{
        string name;
        bool isActive;
        bool wasActive;
        uint userType;
    }

    mapping(address => User) public users;
    string countryName;
    address currentFormOfGovernment;
    string formOfGovernmentName;
    uint version = 0;
    // todo copy country stats to ntf
    CountryToken public _CountryToken;


    constructor(string memory _name, string memory creatorName) {
        News news = News(address(this));

        BoeingFormOfGovernment boeingGovernment = new BoeingFormOfGovernment(address(this), address(news));
        _CountryToken = new CountryToken();

        currentFormOfGovernment = address(boeingGovernment);
        formOfGovernmentName = "Boeing";
        countryName = _name;

        User storage user = users[msg.sender];
        user.name = creatorName;
        user.isActive = true;
        user.wasActive = false;
        user.userType = 1;

        _CountryToken.safeMint(msg.sender);
    }

    modifier callerIsFormOfGovernment {
        require(msg.sender == currentFormOfGovernment, "only Government can control the country");
        _;
    }



    function getCountryInfo() external view returns(string memory, uint, address, string memory) {
        return (countryName, version, currentFormOfGovernment, formOfGovernmentName);
    }

    function getUser(address _address) external view returns(User memory)  {
        return users[_address];
    }




    function transferTo(address payable toWho, uint256 howMuch) external {
        toWho.transfer(howMuch);
    }

    function changeCountryName(string calldata newName) external callerIsFormOfGovernment {
        countryName = newName;
    }

    function setUser(address _address, User memory newUserData) external callerIsFormOfGovernment {
        User storage user = users[_address];

        require(user.wasActive || newUserData.isActive, "first change must set isActive true");

        // first time user
        if(!user.wasActive) {
            _CountryToken.safeMint(_address);
        }

        user.wasActive = true;
        user.name = newUserData.name;
        user.isActive = newUserData.isActive;
        user.userType = newUserData.userType;
    }

    function changeFormOfGovernment(address _currentFormOfGovernment, string calldata _formOfGovernmentName) external callerIsFormOfGovernment {
        currentFormOfGovernment = _currentFormOfGovernment;
        formOfGovernmentName = _formOfGovernmentName;

        if(version == type(uint).max) {
            version = 0;
        } else {
            version++;
        }
    }
}

// http://abstractconstruction.com/projects/boeing/
contract BoeingFormOfGovernment
    News _news;
    DigitalCountry _country;


    constructor(address country, address news) {
        _country = DigitalCountry(country);
        _news = News(news);
    }

    modifier callerIsPresident {
        require(_country.getUser(msg.sender).userType == 1, "only the president can call this");
        _;
    }

    function addUser(address _address, string calldata name, uint _userType, bool isActive) external callerIsPresident {
        _country.setUser(_address, DigitalCountry.User(name, isActive, false, _userType));
    }

    function changeGovernment(address newGovernment, string calldata newGovernmentName, bool killFreeSpeech) external callerIsPresident {
        _country.changeFormOfGovernment(newGovernment, newGovernmentName);

        if(killFreeSpeech) {
            _news.killFreeSpeech();
        }

        selfdestruct(payable(address(_country)));
    }
}

contract News {
    DigitalCountry _country;

    constructor(address countryAddress){
        _country = DigitalCountry(countryAddress);
    }

    struct structOfNews{
        string header;
        string content;
        uint creationTime;
        string authorName;
    }

    event publication(structOfNews entry, uint total);
    structOfNews[] allNewsArray;

    modifier callerIsFormOfGovernment {
        (string memory countryName, uint countryVersion, address governmentAddress, string memory governmentName) = _country.getCountryInfo();

        require(msg.sender == governmentAddress, "only Government can control contract");
        _;
    }

    function pushNews(string calldata _header, string calldata _content, string memory authorName) public callerIsFormOfGovernment {
        if(allNewsArray.length == type(uint).max) {
            allNewsArray.pop();
        }

        if(bytes(authorName).length == 0) {
            authorName = _country.getUser(msg.sender).name;
        }

        allNewsArray.push(structOfNews({
        header: _header,
        content: _content,
        creationTime: block.timestamp,
        authorName: authorName
        }));

        emit publication(allNewsArray[0], allNewsArray.length);
    }

    function killFreeSpeech() public callerIsFormOfGovernment {
        selfdestruct(payable(address(_country)));
    }

    function getNews(uint page) public view returns(structOfNews[10] memory newsOutput){
        uint total = allNewsArray.length;

        uint started = page * 10;
        uint end = started + 10;
        if(end > total)
            end = total;

        require(total > started, "requested page does not exist");

        for (uint served = started; served < end; served++)
            newsOutput[served - started] = allNewsArray[served];
    }

    function getSpecificNews(uint index) public view returns(structOfNews memory){
        return allNewsArray[index];
    }
}
