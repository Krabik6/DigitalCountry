// SPDX-License-Identifier: MIT

import "./NftForCountry.sol";

pragma solidity ^0.8.0;

//теряют ли юзеры свои ранги при смене формы правления

contract DigitalCountry{
    struct User{
        string name;
        bool isActive;
        bool wasActive;
        uint userType;
    }

    mapping(address => User) public users;
    string name;
    uint version = 0;
    address formOfGovermentContract;
    CountryToken public _CountryToken;
     news _news;
     address newsAddresss;
    

    constructor(string memory _name, string memory creatorName) {
        BoeingFormOfGoverment boeingGoverment = new BoeingFormOfGoverment(address(this));
        _CountryToken = new CountryToken();


        formOfGovermentContract = address(boeingGoverment);
        name = _name;

        User storage user = users[msg.sender];
        user.name = creatorName;
        user.isActive = true;
        user.wasActive = false;
        user.userType = 1;

        _CountryToken.safeMint(msg.sender);

        _news = new news(address(this));
        newsAddresss = address(_news);

    }

    


    modifier callerIsFormOfGoverment {
        require(msg.sender == formOfGovermentContract, "only goverment can control the country");
        _;
    }






    function getAddressOfGovermentContract() external view returns(address) {
        return formOfGovermentContract;
    }

    function getVersion() external view returns(uint) {
        return version;
    }

        function getAddressNews() external view returns(address) {
        return newsAddresss;
    }
    
    function getName() external view returns(string memory) {
        return name;
    }

    function getUserName(address _address) external view returns(string memory) {
        return users[_address].name;
    }

    function getUser(address _address) external view returns(User memory)  {
        return users[_address];
    }

    function setUser(address _address, User memory newUserData) external callerIsFormOfGoverment {
        // require();
        User storage user = users[_address];

        user.name = newUserData.name;
        user.isActive = newUserData.isActive;
        user.wasActive = newUserData.wasActive;
        user.userType = newUserData.userType;

        _CountryToken.safeMint(_address);
    }

    function changeContryName(string memory newName) external callerIsFormOfGoverment {
        name = newName;
    }

    event changeFormOfGovermentEvent(address newGoverment);

    function changeFormOfGoverment(address _formOfGovermentContract) external callerIsFormOfGoverment {
        formOfGovermentContract = _formOfGovermentContract;
        emit changeFormOfGovermentEvent(_formOfGovermentContract);

        if(version == type(uint).max) {
            version = 0;
        } else {
            version++;
        }
    }
}

// http://abstractconstruction.com/projects/boeing/
contract BoeingFormOfGoverment {
    address countryAddress;
    address newsAddress;

    bytes4 private constant FUNC_SELECTOR = bytes4(keccak256("changeGoverment(address,stringcalldata)"));
    address payable private owner;
    news _news;
    constructor(address country) {
        countryAddress = country;
        owner = payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        DigitalCountry country = DigitalCountry(countryAddress);

       _news = news(country.getAddressNews());
    }

    event ErrorLogging(string reason);


    function addUser(address _address, string calldata name, uint _userType) external {
        DigitalCountry country = DigitalCountry(countryAddress);

        require(country.getUser(msg.sender).userType == 1, "only the president can add members");

        country.setUser(_address, DigitalCountry.User(name, true, false, _userType));
    }

    // function change own name

         function createNews(string calldata _header, string calldata _content, address _address) public {
         _news.createNews(_header, _content, _address);
     }


    function changeGoverment(address newAddress, string calldata newCountryName)  external  { //очищать историю или нет булеан
        // bool success;
        // bytes memory data = abi.encodeWithSelector(FUNC_SELECTOR, newAddress, newCountryName);

        // assembly {
        //     success := call(
        //         gas(),            // gas remaining
        //         newAddress,         // destination address
        //         0,              // no ether
        //         add(data, 32),  // input buffer (starts after the first 32 bytes in the `data` array)
        //         mload(data),    // input length (loaded from the first 32 bytes in the `data` array)
        //         0,              // output buffer
        //         0               // output length
        //     )
        // }

        // require(success, "hehe boooy");

        DigitalCountry country = DigitalCountry(countryAddress);
        require(country.getUser(msg.sender).userType == 1, "only the president can add members");
        // if(keccak256(abi.encodePacked(newCountryName)) != keccak256(abi.encodePacked(""))){
                // country.changeContryName(newCountryName); хочу иметь возможность создать страну без имени, ограничение в 3 символа сделать сложно/дорого
        // }
        country.changeContryName(newCountryName);
        country.changeFormOfGoverment(newAddress); 

        selfdestruct(owner);
        
    }

    // uint public i = 0;
    // function increment() public {
    //     i++;
    // }

    




}

contract anotherFormOfGoverment {
    //проверка на то, есть ли тут определенные функции
 function changeGoverment(address newAddress, string calldata newCountryName)  external {}
}

contract news {
    address countryAddress;

    constructor(address _country){
        countryAddress = _country;
    }

    DigitalCountry country = DigitalCountry(countryAddress);
    

    struct structOfNews{
        string header;
        string content;
        uint creationTime;
        string autorName;
    }

    event newNews(uint version, structOfNews message);
    uint id = 0;
    mapping(uint => mapping ( uint => structOfNews) ) mapOfNews;
    mapping(uint => mapping ( uint => structOfNews) ) mapOfNewss;
    structOfNews[] allNewsArray;

    modifier callerIsFormOfGoverment {
        require(msg.sender == country.getAddressOfGovermentContract(), "only goverment can control the country");
        _;
    }

    function createNews(string calldata _header, string calldata _content, address _address) public { //only president

        require(country.getUser(_address).userType == 1);

        mapOfNews[country.getVersion()][id] = structOfNews({
            header: _header,
            content: _content,
            creationTime: block.timestamp,
            autorName: country.getUserName(_address) //msg.sender
        });
        allNewsArray.push(mapOfNews[country.getVersion()][id]);

        emit newNews(country.getVersion(),  mapOfNews[country.getVersion()][id]);
        id ++;
    }

    function getAllNews() public view returns(structOfNews[] memory){
        return allNewsArray;
    }

    function getSpecificNews(uint _version, uint id) public view returns(structOfNews memory){
        return mapOfNews[_version][id];
    }

    function deleteNews(uint _version, uint id) public {
        mapOfNews[_version][id] = structOfNews({
            header: "",
            content: "",
            creationTime: 0,
            autorName: "" //msg.sender
        });
    } 


}
