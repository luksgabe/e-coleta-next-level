import React from "react";
import { HeaderProps } from "../../../../core/interfaces/shared/header.interface";

const Header: React.FC<HeaderProps> = props => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};

export default Header;
