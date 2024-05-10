import { readFileSync } from 'fs';
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql';

const jsonFilePath = "./../inputschemas/objectschema.json"; 
const jsonInput = readFileSync(jsonFilePath, 'utf8');
const inputObject: { [key: string]: string } = JSON.parse(jsonInput);
import { Field } from '../interfaces/fields';

function getFirstKey(json : string): string {
        const keys = Object.keys(inputObject);
        return keys[0] ;
}
  

const firstKey = getFirstKey(jsonFilePath);

function generateSchema(jsonObject : String){
    
    const fields: Field = {};
    
    for (const key in inputObject) {
      const value = inputObject[key];
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
      name: firstKey,
      fields: () => fields,
    });
  }