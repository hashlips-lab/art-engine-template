import GeneratorInterface, {
  GeneratorInitPropsInterface,
  ItemsAttributes,
} from "@hashlips-lab/art-engine/dist/common/generators/generator.interface";
import InputsManager from "@hashlips-lab/art-engine/dist/utils/managers/inputs/inputs.manager";

interface ExampleCustomInterface {
  example: string;
}

export class ExampleGenerator
  implements GeneratorInterface<ExampleCustomInterface>
{
  inputsManager!: InputsManager;

  public async init(props: GeneratorInitPropsInterface): Promise<void> {
    this.inputsManager = props.inputsManager;
  }

  public async generate(): Promise<ItemsAttributes<ExampleCustomInterface>> {
    const inputData = this.inputsManager.get("any_existing_input_key");
    const items = {
      1: [
        {
          kind: "AnyUniqueGeneratorDataIdentifier@v1",
          data: {
            example: inputData.example,
          },
        },
      ],
    };
    return items;
  }
}
