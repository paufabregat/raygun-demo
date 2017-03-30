import rg4js from 'raygun4js';
const Raygun = (() => {
  const Raygun = () => {
    //Create singleton and require the same object throw the app when willing to programatically set
    // new settings or send errors.
    rg4js('apiKey', 'your-api-key');
    rg4js('enableCrashReporting', true);
    rg4js('withTags', ['my-dashboard']);
    rg4js('options', {
      ignoreAjaxAbort: true,
      debugMode: true,
      // excludedHostnames: ['localhost', 'dev-services.relayr.io'], //could be used to not so send error while dev
    });
  }
  let instance;
  return {
    getInstance: () => {
      if(instance == null) {
        instance = new Raygun();
      }
      return rg4js;
    },
    setUser: (user) => {
      if(user.userInfo) {
        const userInfo = user.userInfo;
        if(userInfo.token) delete userInfo.token;
        rg4js('withCustomData', { userInfo })
        const raygunUserInfo = {
          identifier: userInfo.id,
          isAnonymous: false,
          email: userInfo.email,
          fullName: userInfo.name
        }
        rg4js('setUser', raygunUserInfo)
      }
    }
  };
})();



export default Raygun;
