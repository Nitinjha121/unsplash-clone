import React from "react";

function ArrowIcon({ id }: { id: string }) {
  return (
    <svg
      height="32"
      width="32"
      id="Layer_1"
      className={id}
      version="1.1"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
    </svg>
  );
}

export default ArrowIcon;
