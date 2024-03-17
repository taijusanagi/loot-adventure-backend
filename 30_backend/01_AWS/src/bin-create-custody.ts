import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
  
const secret_name = process.env.SSM_NAME;

const client = new SecretsManagerClient({
    region: "ap-northeast-1",
});

export const handler = async (event: Event) => {
    let response;
    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
        console.log(response);
    } catch (error) {
        throw error;
    }
    const secret = JSON.parse(response.SecretString as string);
    console.log(secret);
    const privateKey = secret.key;
}
  

// export const handler = async (event: Event) => {
    // // Secrets Manager から値を取得
    // const responseSM = await axios.get(requestEndpoint, requestOptions);
    // console.log(responseSM);
    // // const jsonSecret = JSON.parse(responseSM.data["SecretString"]);
// }