import { ethers } from 'hardhat';
import { generatePrivateKey } from 'viem/accounts';
import fs from 'fs';
import path from 'path'

let privateKeys = [];
let privateKeysStr = [];
let addressList = [];
let wallet;
let privateKey;

for(let i=0; i<10; i++){
    privateKey = generatePrivateKey();
    privateKeysStr.push('key0'+ i.toString() + '=' + privateKey);
    privateKeys.push(privateKey);
}

for(let i=0; i<10; i++){
    wallet = new ethers.Wallet(privateKeys[i]);
    addressList.push('dev0'+ i.toString() + '=' + wallet.address);
}

const filePath01 = path.join(process.cwd(), 'scripts' , 'setup','output', 'PrivateKey.txt');
const data01 = privateKeysStr.join('\n');
console.log(data01);
fs.writeFile(filePath01, data01, 'utf-8', (err) => {
    console.log(err);
});

const filePath02 = path.join(process.cwd(), 'scripts' , 'setup','output', 'Address.txt');
const data02 = addressList.join('\n');
fs.writeFile(filePath02, data02, 'utf-8', (err) => {
    console.log(err);
});
