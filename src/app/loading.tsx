import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        alt="Logo"
        className="animate-spin h-20 w-20"
        height="200"
        src="/trademinds-logo-system.png"
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width="200"
      />
    </div>
  );
};

export default Loading;
