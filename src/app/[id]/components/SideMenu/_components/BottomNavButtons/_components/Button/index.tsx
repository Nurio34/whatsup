import ProviderComponent from "@/store/Provider";
import ButtonClient from "./Client";

export type ButtonType = {
  name: string;
  index: number;
  icon: JSX.Element;
};

function Button({ btn }: { btn: ButtonType }) {
  return (
    <ProviderComponent>
      <ButtonClient btn={btn} />
    </ProviderComponent>
  );
}

export default Button;
