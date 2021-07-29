import React from "react";
import Link from "next/link";

interface PostProps {
  href: string;
  title: string;
  className?: string;
}

const BsNavLink: React.FC<PostProps> = props => {
  const { href, title, className=""} = props;
  return (
    <Link href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </Link>
  )
}

export default BsNavLink;
