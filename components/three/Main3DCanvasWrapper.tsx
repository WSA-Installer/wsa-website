"use client";

import dynamic from "next/dynamic";

const Main3DCanvas = dynamic(() => import("./Main3DCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Main3DCanvasWrapper() {
  return <Main3DCanvas />;
}
