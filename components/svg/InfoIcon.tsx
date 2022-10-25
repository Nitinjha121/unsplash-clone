import React from "react";

function InfoIcon({ id }: { id: string }) {
  return (
    <svg
      width="18"
      height="18"
      className={`_1rYbs ${id}`}
      version="1.1"
      viewBox="0 0 32 32"
      aria-hidden="false"
    >
      <path d="M16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm2 25c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-12c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v12zm0-16c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v2z"></path>
    </svg>
  );
}

export default InfoIcon;
