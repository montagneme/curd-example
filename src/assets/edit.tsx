import * as React from "react"
const SvgComponent = (props) => (
  <svg
    width={24}
    height={24}
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="m762.48 262.16-.64-.64a128 128 0 0 0-181 0L289.52 552.84a32 32 0 0 0-6.08 8.48l-8 16.56a32 32 0 0 0-2.16 5.72l-48 176a32 32 0 0 0 39.28 39.28l176-48a32 32 0 0 0 5.72-2.16l16.56-8a32 32 0 0 0 8.48-6.08L762.6 443.36a128 128 0 0 0 0-181.04zM460 654.92 369.08 564 564 369.08 654.92 460zM330.64 616 408 693.36 301.6 722.4zM717.2 398 700 414.92 609.08 324l17.04-17.04a64 64 0 0 1 90.52 0l.64.64a64 64 0 0 1 0 90.52z" fill="currentColor" />
  </svg>
)
export default SvgComponent
