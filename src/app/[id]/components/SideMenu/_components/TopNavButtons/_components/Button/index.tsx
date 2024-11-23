import ProviderComponent from "@/store/Provider";
import { UserType } from "@/type/user";
import ButtonClient from "./Client";

export type ButtonType = {
  name: string;
  index: number;
  icon: JSX.Element;
};

function Button({ user, btn }: { user: UserType; btn: ButtonType }) {
  return (
    <ProviderComponent>
      <ButtonClient user={user} btn={btn} />
    </ProviderComponent>
  );
}

export default Button;
