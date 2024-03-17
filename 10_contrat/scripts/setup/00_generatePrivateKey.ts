import { generatePrivateKey } from 'viem/accounts'
 
let privateKey;
for(let i=0; i<11; i++){
    privateKey = generatePrivateKey();
    console.log(i.toString() + ' :', privateKey);
}