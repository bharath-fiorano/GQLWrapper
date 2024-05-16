import { GraphQLObjectType, GraphQLSchema } from "graphql";


import { generateSchemaTypes } from "./generateSchemaTypes";

import { parseJSONToMap } from "./parseAPIMap";
import { generateResolvers } from "./generateObjectResolvers";
import fs from 'fs'

const data = JSON.parse(fs.readFileSync('../inputschemas/objectSchema.json', 'utf8'));

const schemaTypes = generateSchemaTypes(data)
//const queryFields = generateQueryFields(data)
//console.log(queryFields)
const map = parseJSONToMap('../inputschemas/objectResolveAPI.json')
let resolvers = generateResolvers(data,map)

const builtSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        
      }),
    }),
  });