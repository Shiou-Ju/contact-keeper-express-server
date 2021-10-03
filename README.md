# contact-keeper-express

## Instance on Google App Engine
https://contact-keeper-327809.de.r.appspot.com/login

## Description
A demo app to present a full-stack app using MongoDB, Express.js, React.js, Node.js (MERN), in which:
1. User can register as well as log in.  
2. After a user is logged in, they are authorized to access protected route and CRUD their contact infos.

## Under development
`npm run dev` to run client and server concurrently.
Other scripts please see package.json of server.

## Deployment 
### To GCP
#### app.yaml
runtime: nodejs14

instance_class: F2

env_variables:
  - MONGO_URI: `fill in yours here`
  - JWT_SECRET: `fill in yours here`
