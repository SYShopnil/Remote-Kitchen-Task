import { IconEnums } from "..";
import { INormalButton } from "../Button";

export interface ICIconWithHandlerButton
  extends Pick<INormalButton, "clickHandler"> {
  icon: IconEnums;
}
