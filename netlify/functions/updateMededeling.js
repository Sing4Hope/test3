const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Alleen POST-verzoeken zijn toegestaan.',
    };
  }

  const { tekst } = JSON.parse(event.body);

  try {
    const data = JSON.stringify({ tekst }, null, 2);
    const filePath = path.join(__dirname, '../../mededeling.json');

    fs.writeFileSync(filePath, data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, tekst }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
