
const raygun = require('raygun');
const raygunClient = new raygun.Client().init({apiKey: 'your-api-key'});
//for each service set a tag
raygunClient.setTags(['service-1']);

const koa = require('koa');
const app = new koa();
app.use(function* () {
    // some auth stuff here
    this.state = {};
    this.state.user = 'my-user';

    // some error
    throw new Error("Oh-Koa, we're dead");
    // also manual sending with raygunClient.send() on try/catch blocks
});

// error handle from koa
app.on('error', function(err, ctx) {
  const customData = { 'someKey': 'sunny' };
  raygunClient.send(err, customData, function(response) {
    //this callback give back a response from raygun
    //either 202, 401, 403 or 500
	}, ctx.request);
});

// how to inject user info from request
raygunClient.user = function (req) {
  //just this data is valid to be set for the user
  //other kind of data has to be passes has custom data
  return {
    identifier: 'user_email_address@localhost.local',
    isAnonymous: false,
    email: 'emailaddress@localhost.local',
    firstName: 'Foo',
    fullName: 'Foo Bar',
    uuid: 'BAE62917-ACE8-ab3D-9287-B6A33B8E8C55'
  };

  //if a user is set in the state attribute after auth
  if (req.state.user) {
    const userInfo = req.state.user.userInfo;
    return {
      identifier: userInfo.id,
      isAnonymous: false,
      email: userInfo.email,
      fullName: userInfo.name
    }
  }
};

app.listen(3001,function() {
  console.log("app running on port 3001")
});
