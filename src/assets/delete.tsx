import * as React from "react"
const SvgComponent = (props) => (
  <svg
    width={24}
    height={24}
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M592 224H432a32 32 0 0 1 0-64h160a32 32 0 0 1 0 64zm208 64H224a32 32 0 0 0 0 64h32v416a96 96 0 0 0 96 96h320a96 96 0 0 0 96-96V352h32a32 32 0 0 0 0-64zm-96 480a32 32 0 0 1-32 32H352a32 32 0 0 1-32-32V352h384z" fill="currentColor" />
    <path d="M448 736a32 32 0 0 1-32-32V448a32 32 0 0 1 64 0v256a32 32 0 0 1-32 32zm128 0a32 32 0 0 1-32-32V448a32 32 0 0 1 64 0v256a32 32 0 0 1-32 32z" fill="currentColor" />
  </svg>
)
export default SvgComponent
