import ProviderComponent from "@/store/Provider";
import ButtonClient from "./Client";
import { UserType } from "@/type/user";

export type ButtonType =
  | {
      name: string;
      index: number;
      icon: JSX.Element;
    }
  | {
      name: string;
      index: number;
      icon: string;
    };

function Button({ user, btn }: { user: UserType; btn: ButtonType }) {
  return (
    <ProviderComponent>
      <ButtonClient user={user} btn={btn} />
    </ProviderComponent>
  );
}

export default Button;
