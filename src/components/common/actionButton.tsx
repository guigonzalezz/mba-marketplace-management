import { Link } from "react-router-dom";

export const ActionButton = ({
  to,
  label,
  isPrimary,
  disabled,
}: {
  to?: string;
  label: string;
  isPrimary?: boolean;
  disabled?: boolean;
}) => {
  const baseClass =
    "action-md flex w-full items-center justify-center rounded-[.625rem] px-4 transition-colors duration-200";
  const primaryClass =
    "bg-orange-base text-white opacity-55 cursor-not-allowed";
  const secondaryClass =
    "border border-orange-base bg-white text-orange-base hover:border-orange-dark hover:text-orange-dark";

  if (to) {
    return (
      <Link to={to} className="flex h-full w-full">
        <button className={`${baseClass} ${secondaryClass}`}>{label}</button>
      </Link>
    );
  }

  return (
    <button
      className={`${baseClass} ${isPrimary ? primaryClass : secondaryClass}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
