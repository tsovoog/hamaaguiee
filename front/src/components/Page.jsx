import Link from "next/link";
import React from "react";

export const Page = () => {
  return (
    <div>
      <Link href={"/sign-up"}>sign-up</Link>
      <Link href={"/login"}>login</Link>
    </div>
  );
};
