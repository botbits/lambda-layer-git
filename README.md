# lambda-git
[![NPM Version](https://img.shields.io/npm/v/lambda-layer-git.svg)](https://www.npmjs.com/package/lambda-layer-git)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/dcc40ac5b08c4819b479da893c3ae9fa)](https://www.codacy.com/app/marcelobern/lambda-layer-git?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=botbits/lambda-layer-git&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/github/botbits/lambda-layer-git/badge.svg?targetFile=package.json)](https://snyk.io/test/github/botbits/lambda-layer-git?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbotbits%2Flambda-layer-git.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbotbits%2Flambda-layer-git?ref=badge_shield)

> Add git binaries to AWS Lambda layer.

## Overview

This module allows loading `git` (version 2.13.5) as an [AWS Lambda Layer](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) so it can be used within you Lambda function (e.g. through [`simple-git`](https://www.npmjs.com/package/simple-git)).

## Install

```shell
$ npm install --save lambda-layer-git
```

## AWS Lambda Layer `git`

### Manually creating your own `git` layer

For security, traceability, or other reasons it might be preferable to deploy your own `git` Lambda layer.

Your `git` lambda layer can be created manually by:
-   Compressing (zipping) the following folders/files:
   	-   bin
   	-   nodejs
   	-   LICENSE
   	-   README.md

-   Using the [AWS CLI](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) or [AWS console](https://console.aws.amazon.com/lambda/home?#/layers) to create your lambda layer and upload the zip file created in the previous step.

### Using `serverless` to create your own `git` layer

In case you are using the [`serverless` framework](https://serverless.com/), your `git` lambda layer can be created by using a `serverless.yml` file with the following contents:

```yml
service: lambda-layer-git
provider:
  name: aws
  region: us-east-1

layers:
  git:
    path: ../lambda-layer-git # using '.' clips first 2 characters
    description: Add git binaries to your lambda function (git v2.13.5)
    compatibleRuntimes:
      - nodejs4.3
      - nodejs6.10
      - nodejs8.10
    licenseInfo: MIT
    allowedAccounts:
      - 'YOUR_AWS_ACCOUNT_ID' # use '*' to give permission to all AWS accounts
    package:
      exclude:
        - ./**
      include:
        - bin/**
        - nodejs/**
        - LICENSE
        - README.md
```

## Using

Once a Lambda layer is created, it should be [referenced in your lambda function](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html#configuration-layers-path).

Invoke the `lambda-layer-git` module as follows:

```js
require("lambda-layer-git").prepareGit()
  .then(function () {
    // git is now ready
    // exec("git --version");
  })
  .catch(function (error) {
    // something failed
  });
```
