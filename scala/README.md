# Scala

This is a starter application that shows how Play works but that has been modified to show where to handle
error and send request to Raygun.

## Running
~~~
cd play-scala
./sbt run
~~~

And then go to `http://localhost:9000` to see the running web application.
Browse to `/error` and see an error being thrown. 

## What has been added

Under `play-scala/app` the file `Glocal.scala` has been added in order to overwrite the global 
error handler so all errors caught by this handler are sent to Raygun. 

