#Node
## Set Raygun api key

Open `index.js` and change the following line set your api key instead of `'your-api-key'`

~~~javascipt
const raygunClient = new raygun.Client().init({apiKey: 'your-api-key'});
~~~

## Running 

~~~
npm install && node index.js
~~~

Now visit `localhost:3001` and see an error been thrown