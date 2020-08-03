import Fetch from '@zeit/fetch'

const API_ENDPOINT = 'https://www.notion.so/api/v3'
const fetch = Fetch();

export default async function rpc(fnName, body) {
  const res = await fetch(`${API_ENDPOINT}/${fnName}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (res.ok) {
    return res.json()
  } else {
    throw new Error(await getError(res))
  }
}

function getJSONHeaders(res) {
  return JSON.stringify(res.headers.raw())
}

function getBodyOrNull(res) {
  try {
    return res.text()
  } catch (err) {
    return null
  }
}

export function getCollectionSchemaNameIndex(collectionSchema){
  const names = {};
  for (const id in collectionSchema) {
    const nameKey = collectionSchema[id].name;
    if (nameKey in names) {
      console.warn(`duplicate key "${nameKey}" in schema index – make sure column names are unique`);
    }
    names[nameKey] = id;
  }
  return names;
}

async function getError(res) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`
}

export function loadPageChunk(body) {
  return rpc('loadPageChunk', body)
}

export function queryCollection(body) {
  return rpc('queryCollection', body)
}
