import * as path from "path";
import * as fs from "fs";
import ExporterInterface, {
  ExporterInitPropsInterface,
} from "@hashlips-lab/art-engine/dist/common/exporters/exporter.interface";
import ItemsDataManager from "@hashlips-lab/art-engine/dist/utils/managers/items-data/items-data.manager";
import { ItemPropertiesInterface } from "@hashlips-lab/art-engine/dist/utils/managers/items-data/items-data.interface";

export class ExampleExporter implements ExporterInterface {
  private rendersGetter!: ItemsDataManager["getRenders"];
  private outputPath!: string;

  public async init(props: ExporterInitPropsInterface) {
    this.rendersGetter = props.rendersGetter;
    this.outputPath = props.outputPath;
  }

  public async export(): Promise<void> {
    for (const [itemUid, renders] of Object.entries(this.rendersGetter())) {
      // @ts-ignore
      let attributes = renders.find(
        (render: ItemPropertiesInterface<any>) =>
          "AnyUniqueRenderDataIdentifier@v1" === render.kind
      );

      if (attributes) {
        fs.copyFileSync(
          attributes?.data.path,
          path.join(path.join(this.outputPath), `${itemUid}.txt`)
        );
      }
    }
  }
}
