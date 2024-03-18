exports.handler = async function (event, context) {
  const <var1> = process.env.OMDP_API_KEY;
  const <var2> = process.env.OPENAI_API_KEY

  return {
    statusCode: 200,
    body: JSON.stringify({ OPENAI_API_KEY: OPENAI_API_KEY, OMDP_API_KEY: OMDP_API_KEY}),
  };
};