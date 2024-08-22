import { PropsWithChildren } from "react";

export default function AppBackground({ children }: PropsWithChildren) {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-[url('/images/app-bg.png')] bg-no-repeat bg-contain bg-center"></div>
      <div className="relative z-[1]">{children}</div>
    </>
  );
}
