import Amplify, {Auth} from "aws-amplify";
import AWS from 'aws-sdk';
import aws_config from "./aws_config";
import userStore from "./stores/userStore";
import keysStore from "./stores/keysStore";
import contractStore from "./stores/contractsStore";


export default async function initApplication() {
    Amplify.configure(
        {
            Auth: {
                region: aws_config.cognito.REGION,
                userPoolId: aws_config.cognito.USER_POOL_ID,
                identityPoolId: aws_config.cognito.IDENTITY_POOL_ID,
                userPoolWebClientId: aws_config.cognito.APP_CLIENT_ID,
                mandatorySignIn: true,
            },
            Storage: {
                region: aws_config.s3.REGION,
                bucket: aws_config.s3.BUCKET,
                identityPoolId: aws_config.cognito.IDENTITY_POOL_ID,
            },
            API: {
                endpoints: [
                    {
                        name: aws_config.apiGateway.NAME,
                        endpoint: aws_config.apiGateway.URL,
                    }
                ]
            },
        }
    );

    await userStore.refreshToken();

    try {
        if ((await Auth.currentSession()) !== null) {
            // Bug in AWS-Amplify, set the credentials hard
            AWS.config.credentials = Auth.essentialCredentials(await Auth.currentCredentials());
            await Promise.all([
                    keysStore.updateKeys(),
                    contractStore.updateContracts()
                ]
            );
        }
    } catch (error) {
        console.log(error);
    }

}
