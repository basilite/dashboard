/// <reference types="vite/client" />

// NOTE: import svgs as react components by appending `?react` to the import path
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}