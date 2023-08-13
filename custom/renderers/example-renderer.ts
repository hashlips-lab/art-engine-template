import * as path from "path";
import * as fs from "fs";
import RendererInterface, {
  ItemsRenders,
  RendererInitPropsInterface,
} from "@hashlips-lab/art-engine/dist/common/renderers/renderer.interface";
import ItemsDataManager from "@hashlips-lab/art-engine/dist/utils/managers/items-data/items-data.manager";
import { CACHE } from "@hashlips-lab/art-engine";
import { ItemPropertiesInterface } from "@hashlips-lab/art-engine/dist/utils/managers/items-data/items-data.interface";

interface ExampleCustomInterface {
  path: string;
}

export class ExampleRenderer
  implements RendererInterface<ExampleCustomInterface>
{
  attributesGetter!: ItemsDataManager["getAttributes"];
  tempRenderDir!: string;

  constructor() {}

  public async init(props: RendererInitPropsInterface): Promise<void> {
    this.attributesGetter = props.attributesGetter;
    this.tempRenderDir = path.join(
      props.cachePath,
      CACHE.RENDERERS_TEMP_CACHE_DIR,
      "words"
    );
  }

  public async render(): Promise<ItemsRenders<ExampleCustomInterface>> {
    const renders: ItemsRenders<ExampleCustomInterface> = {};

    for (const [itemUid, attributes] of Object.entries(
      this.attributesGetter()
    )) {
      if (!fs.existsSync(this.tempRenderDir)) {
        fs.mkdirSync(this.tempRenderDir);
      }
      // @ts-ignore
      const supportedAssets = attributes.filter(
        (attribute: ItemPropertiesInterface<ExampleCustomInterface>) =>
          "AnyUniqueGeneratorDataIdentifier@v1" === attribute.kind
      );

      if (supportedAssets.length > 0) {
        const outputPath = path.join(this.tempRenderDir, `${itemUid}.json`);
        fs.writeFileSync(
          outputPath,
          JSON.stringify(supportedAssets[0].data, null, 2)
        );

        renders[itemUid] = [
          {
            kind: "AnyUniqueRenderDataIdentifier@v1",
            data: {
              path: outputPath,
            },
          },
        ];
      }
    }

    return renders;
  }
}
