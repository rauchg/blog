import {
  loadPageChunk,
  queryCollection,
  getCollectionSchemaNameIndex
} from './lib/notion'

async function test (){
  const { recordMap: { collection, collection_view } } = await loadPageChunk({
    pageId: "fa0a337c-3807-4aa9-b30f-dddc6ef4ec2e",
    chunkNumber: 0,
    limit: 50,
    verticalColumns: false,
    cursor: {stack: [[{table: "block", id: "fa0a337c-3807-4aa9-b30f-dddc6ef4ec2e", index: 0}]]}
  })

  const [collectionId] = Object.keys(collection);
  const [collectionViewId] = Object.keys(collection_view);
  const collectionSchema = getCollectionSchemaNameIndex(collection[collectionId].value.schema)

  const col = await queryCollection({
    collectionId,
    collectionViewId,
    query:{
      sort: [{property: collectionSchema.Votes, direction: "descending"}],
      aggregations: [{property: "title", aggregator: "count"}]
    },
    loader: {
      type: "table",
      limit: 1000,
      searchQuery: "",
      userTimeZone: "America/Los_Angeles",
      userLocale: "en",
      loadContentCover: false
    }
  })

  return col.result.blockIds.map(blockId => {
    const blockData = col.recordMap.block[blockId];
    
    if (blockData) {
      const props = blockData.value.properties;

      if (!props) {
        // not sure when this happens yet, but it seems
        // to be limited to only one row
        // console.info('missing props for block', blockId);
        return null;
      }

      // the props are named with unique ids, but
      // we want to return them with easily addressable
      // column names
      const indexedData = {};
      for (const key in collectionSchema) {
        indexedData[key] = props[collectionSchema[key]];
      }
      return indexedData;
    } else {
      console.warn(`missing block data for "${blockId}"`);
      return null;
    }
  })
    .filter(v => v != null)
}

test().then(console.log, console.error)
