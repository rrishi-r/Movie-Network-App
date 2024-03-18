exports.handler = async function (event, context) {
  const OPENAI_API_KEY = process.env.OMDP_API_KEY;
  const OMDP_API_KEY = process.env.OPENAI_API_KEY

  return {
    statusCode: 200,
    body: OPENAI_API_KEY,
  };
};