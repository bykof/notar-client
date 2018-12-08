import Amplify from "aws-amplify";
import aws_config from "./aws_config";
import userStore from "./stores/userStore";
import keysStore from "./stores/keysStore";


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
            API: {
                endpoints: [
                    {
                        name: 'notar',
                        endpoint: aws_config.apiGateway.URL,
                    }
                ]
            }
        }
    );

    await userStore.refreshToken();
    await keysStore.updateKeys();
}
