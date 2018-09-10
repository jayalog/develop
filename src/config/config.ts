const Config = {
    "REGION": "us-east-1",
    "USER_POOL_ID": "us-east-1_VTXzm1rAs",
    "CLIENT_ID": "35hdt4fn4toth0lqise8a6oe8f",
    "IDENTITY_POOL_ID": "us-east-1:3b333474-957d-420a-91d1-c03083b65e76",
    "API_NAME": 'Collab-API',
    "API_ENDPOINT": 'https://52lvpyjx81.execute-api.us-east-1.amazonaws.com/development',
    "S3_BUCKET_NAME": "collab-rbfc-private"
};

const amplifyConfig = {
    Auth: {
        identityPoolId: Config.IDENTITY_POOL_ID,
        region: Config.REGION,
        userPoolId: Config.USER_POOL_ID,
        userPoolWebClientId: Config.CLIENT_ID,
        mandatorySignIn: true, // Enforce user authentication prior to accessing AWS resources or not
    },
    API: {
        endpoints: [
            {
                name: Config.API_NAME,
                endpoint: Config.API_ENDPOINT
            }
        ]
    // },
    // Analytics: {
        // OPTIONAL -  Amazon Pinpoint App ID
        // appId: "ee5e101b09ac466b842951bdc95c2de3",
        // OPTIONAL -  Amazon service region
        // region: Config.REGION
      }
};

const storageConfig = {
    bucket: Config.S3_BUCKET_NAME,
    region: 'ap-south-1',
    identityPoolId: Config.IDENTITY_POOL_ID
};

export { Config, amplifyConfig, storageConfig };
