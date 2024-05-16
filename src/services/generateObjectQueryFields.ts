import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, ThunkObjMap } from "graphql";

function generateQueryFields(data: any): ThunkObjMap<GraphQLFieldConfig<any, any, any>> {
    const queryFields = {};
    for (const objectName in data) {
      const fields = data[objectName];
      const fieldConfig: GraphQLFieldConfig<any, any, any> = {
        type: () => data[objectName], // Assuming data contains type information
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        }
      };
      queryFields[objectName] = fieldConfig;
    }
    return queryFields;
  }