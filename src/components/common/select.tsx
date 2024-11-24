import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";

import arrowDownIcon from "../../assets/icons/arrow-down.svg";
import cancelIcon from "../../assets/icons/cancel.svg";
import tickIcon from "../../assets/icons/tick.svg";
import { AddProductForm } from "../../pages/app/products/addProduct";
import { EditProductForm } from "../../pages/app/products/editProduct";

interface SelectOption {
  label: string;
  value: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: string;
  control: Control<AddProductForm | EditProductForm | any>;
}

export function Select({
  name,
  options,
  placeholder = "Select an option",
  icon,
  control,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const values: Record<string, string> = options.reduce(
    (acc, curr) => {
      acc[curr.value] = curr.label;
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <div
              className={`flex cursor-pointer items-center gap-2 border-b-[1px] px-[2px] py-3.5
                ${value ? "border-gray-400 " : "border-gray-100 "}`}
              onClick={toggleOpen}
            >
              {icon && (
                <img src={icon} className="h-6 w-6 opacity-50" alt="Icon" />
              )}

              <span
                className={`body-md flex-1 
                    ${value ? "text-gray-400" : "text-gray-200"}`}
              >
                {values[value] || placeholder}
              </span>

              {value && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-shape">
                  <img
                    src={cancelIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange("");
                    }}
                    className="h-4 w-4"
                    alt="Cancel icon"
                  />
                </span>
              )}

              <img
                src={arrowDownIcon}
                alt="Arrow icon"
                className={`h-6 w-6
                    ${isOpen && "-scale-y-100 transform"}
                `}
              />
            </div>

            {isOpen && (
              <div className="absolute mt-1 flex w-full flex-col rounded-lg border border-shape bg-white shadow-lg">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex h-12 cursor-pointer items-center gap-2 px-4 hover:bg-gray-200"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    <p
                      className={`body-sm flex h-full w-full items-center 
                        ${
                          value === option.value
                            ? "text-orange-base"
                            : "text-gray-300 hover:text-orange-dark"
                        }
                        `}
                    >
                      {option.label}
                    </p>

                    {value === option.value && (
                      <img src={tickIcon} alt="Tick icon" className="h-6 w-6" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
