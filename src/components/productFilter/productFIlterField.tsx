import { InputWithIcon } from "../common/inputWithIcon";

export const ProductFilterField = ({
  id,
  placeholder,
  icon,
  register,
}: {
  id: string;
  placeholder: string;
  icon: string;
  register: any;
}) => (
  <InputWithIcon
    id={id}
    placeholder={placeholder}
    icon={icon}
    {...register(id)}
  />
);
