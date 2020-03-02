// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '88144970231198296', //  App ID--r 96
        'clientSecret'  : '56a678ec57f3f88fec7ec7fb79bbf96b96', //  App Secret --r 96
        'callbackURL'   : '/auth/facebook/callback'
       
    },

    'googleAuth' : {
        'clientID'      : '622237229236-sqgu4j67k1g91ml968l23mp459u0n90t96.apps.googleusercontent.com',// --r 96
        'clientSecret'  : 'wQ1vlEVktjeUFeXfmSLa_Fvz96',// --r 96
        'callbackURL'   : '/auth/google/callback'
    }

};
