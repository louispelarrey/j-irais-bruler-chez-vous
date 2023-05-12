const fs = require('fs');
require('dotenv').config();

const environment = `
export const environment = {
  apiUrl: '${process.env.API_URL}',
  otherVariable: '${process.env.OTHER_VARIABLE}'
};
`;

fs.writeFileSync('./src/environment.ts', environment);
