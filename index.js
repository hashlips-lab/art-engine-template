const { ArtEngine, inputs, generators, renderers, exporters } = require('@hashlips-lab/art-engine');

const BASE_PATH = __dirname;

const ae = new ArtEngine({
  cachePath: `${BASE_PATH}/cache`,
  outputPath: `${BASE_PATH}/output`,

  inputs: {
    apes: new inputs.ImageLayersInput({
      assetsBasePath: `${BASE_PATH}/data`,
    }),
  },

  generators: [
    new generators.ImageLayersAttributesGenerator({
      dataSet: 'apes',
      startIndex: 1,
      endIndex: 10,
    }),
  ],

  renderers: [
    new renderers.ItemAttributesRenderer({
      name: (itemUid) => `Ape ${itemUid}`,
      description: (attributes) => {
        return `This is a token with "${attributes['Background'][0]}" as Background`;
      },
    }),
    new renderers.ImageLayersRenderer({
      width: 2048,
      height: 2048,
    }),
  ],

  exporters: [
    new exporters.ImagesExporter(),
    new exporters.Erc721MetadataExporter({
      imageUriPrefix: 'ipfs://__CID__/',
    }),
    new exporters.SolMetadataExporter({
      imageUriPrefix: 'ipfs://__CID__/',
      symbol: 'APES',
      sellerFeeBasisPoints: 200,
      collectionName: 'The Apes',
      creators: [
        {
          address: '__SOLANA_WALLET_ADDRESS_HERE__',
          share: 100,
        },
      ],
    }),
  ],
});

ae.run();
