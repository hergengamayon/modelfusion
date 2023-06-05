---
sidebar_position: 2
title: Pinecone
---

# Pinecone Vector DB

[API documentation](/api/classes/PineconeStore)
|
[Basic Examples](https://github.com/lgrammel/ai-utils.js/tree/main/examples/basic/src/vector-db/PineconeStoreExample.ts)

### Installation

You need to install the Pinecone JS client separately:

```bash
npm install @pinecone-database/pinecone
```

### Example Usage

```ts
import { PineconeClient } from "@pinecone-database/pinecone";

// ...

const client = new PineconeClient();
await client.init({
  apiKey: PINECONE_API_KEY,
  environment: PINECONE_ENVIRONMENT,
});
const index = client.Index(PINECONE_INDEX_NAME);

// assuming zod schema for data and an embedding model are defined:
const vectorDB = new VectorDB({
  store: new PineconeStore({ index, schema: zodSchema }),
  embeddingModel,
});
```