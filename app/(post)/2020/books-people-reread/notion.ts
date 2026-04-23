const API_ENDPOINT = "https://www.notion.so/api/v3";

export default async function rpc(fnName, body, retries = 3) {
  const url = `${API_ENDPOINT}/${fnName}`;
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return res.json();
    }

    if (res.status >= 500 && attempt < retries - 1) {
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
      continue;
    }

    throw new Error(await getError(url, res));
  }
}

function getJSONHeaders(res) {
  const headers = {};
  res.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return JSON.stringify(headers);
}

function getBodyOrNull(res) {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}

export function getCollectionSchemaNameIndex(collectionSchema) {
  const names = {};
  for (const id in collectionSchema) {
    const nameKey = collectionSchema[id].name;
    if (nameKey in names) {
      console.warn(
        `duplicate key "${nameKey}" in schema index – make sure column names are unique`
      );
    }
    names[nameKey] = id;
  }
  return names;
}

async function getError(url, res) {
  return `Notion API error for URL ${url} (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`;
}

export function loadPageChunk(body) {
  return rpc("loadPageChunk", body);
}

export function getRecordValues(body) {
  return rpc("getRecordValues", body);
}
