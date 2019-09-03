Read through the tutorial here: [How to build a Google Cloud Function with NodeJS](https://www.zesty.io/mindshare/build-guides/how-to-build-a-google-cloud-function-example-for-nodejs-with-yaml-secrets-cors-and-local-testing/)

# Google Cloud Platform (GCP) Cloud Function Example for NodeJS with YAML secrets, CORS, and local testing

This is an example starter codebase for launching a cloud function into Google Cloud Platform (GCP). Learn more about cloud functions at https://cloud.google.com/functions/. This cloud function is written in NodeJS v8. 

This README serves as a tutorial on how to launch your first cloud function with Node JS. Conducted on macOS Mojave. Run through can be done in 15 minutes.

### Why Zesty.io made this Tutorial

Zesty.io is a cloud headless content management system. Integrations are extensions are often made leveraging cloud functions. At Zesty.io we use cloud functions for many of our side services, and really enjoy their quick deployment, reliablity, and cheap cost structure.#

## Getting Started

### Setting up your envirnoment

1. Create a Google Cloud account https://cloud.google.com/ and create a project (`MY_PROJECT` will be used as an exmaple)
2. Download and install Google Cloud SDK https://cloud.google.com/sdk/docs/quickstarts and from your terminal run `gcloud auth login`
3. Install NodeJS https://nodejs.org/en/
4. Install Node Version Manager (NVM) https://github.com/nvm-sh/nvm/blob/master/README.md or from your terminal run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash` in your terminal
5. Install GCP [functions emulator](https://cloud.google.com/functions/docs/emulator) for local testing by running `npm install -g @google-cloud/functions-emulator` in your terminal
6. Seting functions emulator `functions config set projectId MY_PROJECT`, and run `functions start`
7. Install a code editor like [Atom.io](https://Atom.io) or [VS Code](https://code.visualstudio.com/download)
8. *(OPTIONAL)* Install Postman https://www.getpostman.com/ to make test requests the cloud function (rather than using your browser)

### Setting up your project

You are going to use your terminal to run most commands. 

1. Create a new directory on your computer  e.g. `mkdir ./my-cloud-function`
2. run `cd ./my-cloud-function` to open the directory
3. run `npm init` and fill out the init question prompted in terminal, defaults are fine
4. run `npm install cors` installs a package we will use to control cross origin resource sharing
5. run `npm install env-yaml` installs a package to read a local yaml file with secrets
5. run `nvm use v8` to use node8
6. run `echo "v8" > .nvmrc` to create an nvm file to always use node 8  when you open the directory
7. run `touch .env.yaml` to create your base secret file
8. run `echo ".env.yaml" > .gitignore` to create a file that tells git not to commit secrets (security reasons)
9. run `touch index.js` to create your base javascript file

## Coding

### index.js

1. run `code .` or `atom .` to open the directory in your code editor
2. open `.env.yaml` and add this line `TEST_SECRET: hello world` which creates a secret string `TEST_SECRET`
3. open `index.js` and add this code: 
```
require('env-yaml').config({ path: './.env.yaml' })
console.log(process.env.TEST_SECRET)
``` 
*this code will load up your secret file and output a secret to console*
4. run `node index.js` to see `hello world` outputted to the terminal. At this point if you are running into errors, trace back to the Getting Starting section and walk through every step again.
5. open `index.js` and replace all the code your wrote with:
```
require('env-yaml').config({ path: './.env.yaml' })

exports.myFunction = (req, res) => {
  const cors = require('cors')()

  cors(req, res, () => {
    myFunction(req, res)
  })
}

const myFunction = async (req, res) => {
    res.send(process.env.TEST_SECRET)
}
```

Now you are ready to test

### deploying locally

1. run `functions deploy myFunction --env-vars-file .env.yaml --trigger-http` which will create a local testable function, if this ran successfully, it will return you a url for your function, mine was `http://localhost:8010/my-project/us-central1/myFunction`, to test the function copy that url.
2. open your function url in a web browser, you should see "hello world"

If these steps failed you, you need to check your envirnoment setup be going over easy step in getting started.

### deploying to the cloud

1. run `gcloud functions deploy myFunction --trigger-http --project=my-project --env-vars-file .env.yaml --runtime=nodejs8 --memory=256mb --timeout=240s"`
2. it should take 2 minutes to deploy, once deployed the terminal will display a URL to load it from remote, open that in your browser.

# Success!