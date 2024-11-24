export const ProductStatusButton = ({
  onClick,
  icon,
  label,
  disabled,
}: {
  onClick?: () => void;
  icon: string;
  label: string;
  disabled: boolean;
}) => (
  <button
    className={`action-sm flex items-end gap-2 p-0.5 ${
      disabled ? "opacity-55" : "hover:text-orange-dark"
    }`}
    disabled={disabled}
    onClick={onClick}
  >
    <img src={icon} className="h-5 w-5" alt={`${label} icon`} />
    {label}
  </button>
);
