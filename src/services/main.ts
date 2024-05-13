const generateSchemas = require("./generateSchemaService").generateSchemas;

const allSchemas = generateSchemas();

console.log(JSON.stringify(allSchemas, null, 2));
