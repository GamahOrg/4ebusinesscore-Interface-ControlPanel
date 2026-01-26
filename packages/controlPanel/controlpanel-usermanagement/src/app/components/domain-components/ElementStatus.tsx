import { FC } from "react";

type ElementStatusProps = {
  text: string;
  isActive?: boolean;
};

export const ElementStatus: FC<ElementStatusProps> = ({
  text,
  isActive = true,
}) => {
  let className = "bg-success text-success";
  if (isActive) {
    className = "bg-danger text-danger";
  }
  return (
    <span
      className={`${className} bg-opacity-10 py-1 d-inline-block text-center rounded w-100px fw-bolder`}
    >
      {text}
    </span>
  );
};
