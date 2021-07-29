import React from "react";
import Link from "next/link";
import ActiveLink from "./ActiveLink";

interface PostProps {
  href: string;
  title: string;
  className?: string;
}

export const BsNavLink: React.FC<PostProps> = props => {
  const { href, title, className=""} = props;
  return (
    <ActiveLink activeClassName={'active'} href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  )
}

export const BsNavBrand = () =>
  <Link href="/">
    <a className="navbar-brand port-navbar-brand">Tumo Masire</a>
  </Link>

export default BsNavLink;
