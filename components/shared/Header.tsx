
import React, { useState } from 'react';
import Link from 'next/link';
import { useResizeDetector } from 'react-resize-detector';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {isAuthorized} from "../../utils/auth0";
import AdminMenu from "./AdminMenu";
import { BsNavLink, BsNavBrand  } from "./BsComponents";



const LoginLink = () => {
  // return <span className="nav-link port-navbar-link clickable">Login</span>
  return <BsNavLink href="/api/auth/login"title="Login"/>
}
const LogoutLink = () => {
  return <BsNavLink href="/api/auth/logout "title="Logout"/>
}

const Header = ({user=null, loading=false, className = "", linkColor="white"}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { user, error, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);
  const { width, height, ref } = useResizeDetector();
  return (
    <div ref={ref}>
      <Navbar
        className={`port-navbar port-default absolute ${className} ${linkColor}`}
        dark
        expand="md"
      >
        <BsNavBrand />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className={`mr-auto ${linkColor}`} navbar>

            <NavItem className="port-navbar-item">
              <BsNavLink href="/" title="Home"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/about" title="About"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/portfolios" title="Portfolio"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/works" title="Work History"/>
            </NavItem>
            {/* <NavItem className="port-navbar-item">
              <BsNavLink href="/blogs" title="Blogs"/>
            </NavItem> */}
            <NavItem className="port-navbar-item">
              <BsNavLink href="/cv" title="Cv"/>
            </NavItem>
          </Nav>
          <Nav navbar>
          { !loading &&
              <>
                { user && isAuthorized(user,'admin') &&
                  <>
                    <NavItem className="port-navbar-item">
                        <AdminMenu name={user.given_name || user.name}/>
                      {/*<BsNavLink href="/profile" title={user.given_name || user.name}/>*/}
                    </NavItem>
                  </>
                }
                { user &&
                <NavItem className="port-navbar-item">
                    <LogoutLink/>
                </NavItem>
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
