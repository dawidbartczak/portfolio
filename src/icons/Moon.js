import * as React from "react";

const SvgMoon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <path d="M20.98 14.51A8.5 8.5 0 0 1 9.49 3.02a7 7 0 1 0 11.49 11.49" />
  </svg>
);

export default SvgMoon;
