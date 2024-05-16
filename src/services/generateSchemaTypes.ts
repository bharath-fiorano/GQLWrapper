import { GraphQLObjectType } from "graphql";

export function generateSchemaTypes(data: any): string {
    let schemaTypes = '';
    Object.keys(data).forEach((objectName) => {
      schemaTypes += `type ${objectName} {\n`;
      Object.entries(data[objectName]).forEach(([fieldName, fieldValue]) => {
        const fieldType = typeof fieldValue === 'number' ? 'Int' : 'String';
        schemaTypes += `  ${fieldName}: ${fieldType}\n`;
      });
      schemaTypes += '}\n';
    });
    return schemaTypes;
  }