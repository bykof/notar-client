import Amplify from "aws-amplify";
import aws_config from "./aws_config";
import userStore from "./states/userState";


export default function initApplication() {
    Amplify.configure(
        {
            Auth: {
                region: aws_config.cognito.REGION,
                userPoolId: aws_config.cognito.USER_POOL_ID,
                identityPoolId: aws_config.cognito.IDENTITY_POOL_ID,
                userPoolWebClientId: aws_config.cognito.APP_CLIENT_ID,
                mandatorySignIn: true,
            }
        }
    );

    userStore.refreshToken();
}
