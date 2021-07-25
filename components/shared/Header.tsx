
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

interface PostProps {
  href: string;
  title: string;
}

const BsNavLink: React.FC<PostProps> = props => {
  const { href, title } = props;
  return (
    <Link href={href}>
      <a className="nav-link port-navbar-link ">{title}</a>
    </Link>
  )
}

const LoginLink = () => {
  // return <span className="nav-link port-navbar-link clickable">Login</span>
  return <BsNavLink href="/api/auth/login"title="Login"/>
}
const LogoutLink = () => {
  return <BsNavLink href="/api/auth/logout "title="Logout"/>
}

const Header = ({user, loading}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { user, error, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        className="port-navbar port-default absolute"
        color="transparent"
        dark
        expand="md">
        <div className='navbar-brand'>
          <Link href="/">
            <a className="port-navbar-brand">Tumo Masire</a>
          </Link>
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/" title="Home"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/about" title="About"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/portfolios" title="Portfolios"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/blogs" title="Blogs"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/cv" title="Cv"/>
            </NavItem>
          </Nav>
          <Nav navbar>
          { !loading &&
              <>
                { user &&
                  <>
                    <NavItem className="port-navbar-item">
                    <span className="nav-link port-navbar-link clickable">{user.given_name || user.name}</span>
                    </NavItem>
                    <NavItem className="port-navbar-item">
                      <LogoutLink/>
                    </NavItem>
                  </>
                }
                { !user &&
                  <NavItem className="port-navbar-item">
                    <LoginLink />
                  </NavItem>
                }
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;