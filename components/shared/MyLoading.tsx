
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Spinner
} from 'reactstrap';

interface PostProps {
  href: string;
  title: string;
}

const MyLoading = ({className = "", spinColour=`primary`, size="4rem"}) => {

  return (
    <div className={`text-center ${className}`}>
      <Spinner color={spinColour} style={{width: size, height: size}} />
      <h3 >Loading Data...</h3> 
    </div>
  );
}

export default MyLoading;