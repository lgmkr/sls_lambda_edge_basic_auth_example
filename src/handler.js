/**
 * BASIC Authentication
 *
 * Simple authentication script intended to be run by Amazon Lambda to
 * provide Basic HTTP Authentication for a static website hosted in an
 * Amazon S3 bucket through Couldfront.
 *
 * https://hackernoon.com/serverless-password-protecting-a-static-website-in-an-aws-s3-bucket-bfaaa01b8666
 */

"use strict";

exports.run = (event, context, callback) => {
  const request = event.Records[0].cf.request;

  var olduri = request.uri;
  var newuri = olduri.replace(/\/$/, "/index.html");
  request.uri = newuri;

  const headers = request.headers;

  const authUser = "test";
  const authPass = "test";

  const authString =
    "Basic " + new Buffer(authUser + ":" + authPass).toString("base64");

  if (
    typeof headers.authorization == "undefined" ||
    headers.authorization[0].value != authString
  ) {
    const body = "Unauthorized";
    const response = {
      status: "401",
      statusDescription: "Unauthorized",
      body: body,
      headers: {
        "www-authenticate": [{ key: "WWW-Authenticate", value: "Basic" }]
      }
    };
    callback(null, response);
  }

  callback(null, request);
};
