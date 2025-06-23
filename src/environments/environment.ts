export const environment = {
    production: false,

    staging: true,

    testing: false,

    pua: false,

    baseUrl: 'https://eshopstg.vodafone.com.eg/',

    BaseUr1BLC: 'https://eshopstg.vodafone.com.eg/ecommerce/',

    BaseUrlDXL: 'https://eshopstg.vodafone.com.eg/services/dxl/',

    ApplicationIdBLC: '01HSFECVAV4YWTONGQKXEN1T51',

    TenantIdBLC: 'SDF1363059675161A85F5760',

    keycloakAuth: 'https://test1.vodafone.com.eg/auth',

    lifeRayBaseURL: 'https://test1.vodafone.com.eg/o/anaVodafoneContent/',

    tokentinValidity: 100,

    tokenExpiresIn: 120,

    refetchApi: true,

    enableChatbot: true,

    scripts: [

        {

            name: 'chatbot',

            src: 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js',

            dtconfig: '',

            crossorigin: '',

            async: true,

            defer: false
        }, {

            name: 'utag',

            src: 'https://tags.tiqcdn.com/utag/vodafone/eg-main-new/qa/utag.js',

            dtconfig: '',

            crossorigin: '',

            async: false,
            defer: true
        }]
}