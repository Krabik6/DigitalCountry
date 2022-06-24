import {ethers} from "ethers";
import countryAbi from "./artifacts/contracts/DigitalCountry.sol/DigitalCountry.json";
import serverConfig from "./serverConfig.json";


export class Blockchain {
    constructor() {
        if (typeof window.ethereum === 'undefined')
            throw new Error("window.ethereum not found");

        this.provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
        this.country = new ethers.Contract(serverConfig.contractAddress, countryAbi.abi, this.provider);
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
}

window.blockchain = new Blockchain();