import fs from 'fs'
interface JsonObject {
    [key: string]: {
        columnName: string;
        endpoint: string;
    };
}

// Function to parse JSON into a Map
export function parseJSONToMap(filePath: string): Map<string, { columnName: string, endpoint: string }> {
    // Load JSON data from file
    const jsonData = fs.readFileSync(filePath, 'utf8');

    // Parse JSON data into a JavaScript object with type assertion
    const jsonObject = JSON.parse(jsonData) as JsonObject;

    // Initialize an empty map
    const mapJson = new Map<string, { columnName: string, endpoint: string }>();

    // Iterate over the keys in the JSON object and populate the map
    Object.entries(jsonObject).forEach(([key, value]) => {
        mapJson.set(key, value);
    });

    return mapJson;
}
