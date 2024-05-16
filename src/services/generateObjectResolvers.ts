let SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
export function generateResolvers(data: any,resolveMap:Map<string, { columnName: string, endpoint: string }>) {
    let generatedResolvers: { [key: string]: any } = {};
    Object.keys(data).forEach((objectName) => {
      generatedResolvers[objectName] = async ({ id }: { id: string }) => {
        try {
          // Fetch object details from the REST API
          const endpoint = resolveMap.get(objectName)?.endpoint
          const column = resolveMap.get(objectName)?.columnName
          const response = await fetch(`${endpoint}/${objectName}/select=${column}\
          -H "apikey: ${SUPABASE_KEY}" \
          -H "Authorization: Bearer ${SUPABASE_KEY}"`);
          const objectData = await response.json();
          return objectData; // Return the fetched data
        } catch (error) {
          console.error(`Error fetching ${objectName}:`, error);
          throw new Error(`Failed to fetch ${objectName} details`);
        }
      };
    });
    return generatedResolvers;
  }
  