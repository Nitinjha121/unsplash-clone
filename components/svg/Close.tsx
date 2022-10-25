import React from "react";

function Close({ id }: { id: string }) {
  return (
    <svg
      width="32"
      height="32"
      className={`_3p8U1 ${id}`}
      version="1.1"
      viewBox="0 0 32 32"
      aria-hidden="false"
    >
      <path
        className={id}
        d="M25.33 8.55l-1.88-1.88-7.45 7.45-7.45-7.45-1.88 1.88 7.45 7.45-7.45 7.45 1.88 1.88 7.45-7.45 7.45 7.45 1.88-1.88-7.45-7.45z"
      ></path>
    </svg>
  );
}

export default Close;
