# React

Slightly modified create-react-app for demo purposes
 
## Set the app 

Navigate to the app 

~~~
cd demo
~~~

### Raygun api key

Open `src/index.html` and `src/raygun.js` files and change the following line so you set your api instead of
 `'your-api-key'`

~~~javascipt
rg4js('apiKey', 'your-api-key');
~~~

### Relayr project id

Open `src/App.basic.js` and `src/App.js` and replace the value `'some-id'` of the `config` object to reflect
your project id. 


## Running

~~~
npm install && npm start
~~~

Now visit `localhost:3000` and click the button called `Click me to throw an error ` to...well throw an error :sweat_smile:

## Raygun
### Basic Raygun setup
The app is set in a way that the Raygun script is loaded in `src/index.html`. The script instancies a new Raygun object and
exposes at the global scope the `rg4js` function that when called with [specific parameters](https://github.com/MindscapeHQ/raygun4js#documentation)
 modifies the Raygun object.
 
The user information is set in `src/App.basic.js` after the authorization against the relayr API has finished. 

#### Problem
Now if you throw an error you will notice that no user information has been set on the request and instead 
the anonymous user information has been sent. Why? Seems that requiring the `rg4js` function elsewhere than in 
the `index.html` does not modify the instance of the Raygun object instancied when we loaded the app. 
Therefore the user is never set. 

One possible solution? Singleton to the rescue! :sparkles:

### Singleton

To use the singleton and be able to require a `rg4js` function that always modify the same Raygun object:
1. Open `src/index.html` and comment out the script inside the `<head>` tag that loads the Raygun script and also 
the script that sets basic stuff to the Raygun object found at the end of the file. 

2. Open `src/index.js` and replace the line:

~~~javascript
import App from './App.basic';
~~~

by this one

~~~javascript
import App from './App';
~~~

Now the app will use the singleton `src/raygun` and properly set the user. Throw and error and check it out!

#### TODO

- Load Raygun script on load and still have the ability of requiring anywhere else the `rg4js` function that modifies the initial
Raygun object.  
