import {ethers} from "ethers";
import countryAbi from "./artifacts/contracts/DigitalCountry.sol/DigitalCountry.json";
import governmentAbi from "./artifacts/contracts/DigitalCountry.sol/BoeingFormOfGovernment.json";
import newsAbi from "./artifacts/contracts/DigitalCountry.sol/News.json";
import serverConfig from "./serverConfig.json";


export class Blockchain {
    constructor() {
        if (typeof window.ethereum === 'undefined')
            throw new Error("window.ethereum not found");

        this.provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
        this.country = new ethers.Contract(serverConfig.contractAddress, countryAbi.abi, this.provider);
        return new Promise((resolve, reject) => {
            this.country.getCountryInfo().then(([countryName, countryGeneration, currentGovernmentAddress, currentGovernmentName]) => {
                this.government = new ethers.Contract(currentGovernmentAddress, governmentAbi.abi, this.provider);
                if(window.setIsGood){
                    window.setIsGood(true);
                }
                resolve(this);
            }).catch(reject);
        });
    }

    async getInfo() {
        if(this.info === undefined) {
            const [countryName, countryGeneration, currentGovernmentAddress, currentGovernmentName] = await this.country.getCountryInfo();

            this.info = {
                countryName,
                countryGeneration,
                currentGovernmentAddress,
                currentGovernmentName,
            };
        }

        return this.info;
    }

    async getNews(pageNumber) {

    }
}

window.blockchain = (new Blockchain()).then(blockchain => {
    window.blockchain = blockchain;
});