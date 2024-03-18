exports.handler = async function (event, context) {
  const OMDP_API_KEY = process.env.OMDP_API_KEY;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY

  return {
    statusCode: 200,
    body: JSON.stringify({ OPENAI_API_KEY: ${OPENAI_API_KEY}, OMDP_API_KEY: ${OMDP_API_KEY} }),
  };
};