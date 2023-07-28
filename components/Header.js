import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Link href="/">
        <Image src="/logotransparent.png" width={350} height={270} alt="logo" />
      </Link>
    </div>
  );
}
