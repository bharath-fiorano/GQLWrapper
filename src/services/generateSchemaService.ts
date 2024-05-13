import { readFileSync } from 'fs';
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql';

const jsonFilePath = "./../inputschemas/objectschema.json"; 
import { Field } from '../interfaces/fields';
import { InputObject } from '../interfaces/InputObject';

// function getFirstKey(jsonString : string): string | null{
//   try {
//     const parsedData = JSON.parse(jsonString);
//     const keys = Object.keys(parsedData);
//     return keys.length > 0 ? keys[0] : null;
//   } catch (error) {
//     console.error('Error parsing JSON:', error);
//     return null;
//   }
// }


function generateSchemaFromObject(jsonObject : InputObject, schemaName: any){
    const fields: Field = {};
    
    for (const key in jsonObject) {
      const value = jsonObject[key];
      let type;
      
      if (typeof value === 'string') {
        type = GraphQLString;
      } else if (typeof value === 'number') {
        type = GraphQLInt;
      } else if (typeof value === 'boolean') {
        type = GraphQLBoolean;
      } else {
        throw new Error(`Unsupported type for property '${key}'`);
      }
      
      fields[key] = { type};
    }
    
    return new GraphQLObjectType({
      name: schemaName,
      fields: () => fields,
    });
  }

  export function generateSchemas(): GraphQLObjectType[] {
    const jsonInput = readFileSync(jsonFilePath, 'utf8');
    const schemaObjects = JSON.parse(jsonInput) as InputObject[]; 
    
    if (!schemaObjects || !Object.keys(schemaObjects).length) {
      throw new Error('No schema objects found in the JSON file.');
    }
    
    const allSchemas: GraphQLObjectType[] = [];
    for (const [key,schemaObject] of Object.entries(schemaObjects)) {
      const schemaName = key;
      allSchemas.push(generateSchemaFromObject(schemaObject,schemaName));
    }
  
    return allSchemas;
  }
  
  