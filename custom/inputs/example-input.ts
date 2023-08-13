import InputInterface, {
  InputInitPropsInterface,
} from "@hashlips-lab/art-engine/dist/common/inputs/input.interface";

interface ExampleCustomInterface {
  example: string;
}

export class ExampleInput implements InputInterface<ExampleCustomInterface> {
  public async init(props: InputInitPropsInterface): Promise<void> {}

  public async load(): Promise<ExampleCustomInterface> {
    return { example: "Hello World" };
  }
}
