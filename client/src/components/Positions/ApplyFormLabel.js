import React from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { royalBlue } = theme.colors;

const StyledLabel = styled.label`
  font-size: 2.2rem;
  font-weight: 400;
  line-height: 3.3rem;
  /* letter-spacing: .04rem; */
  color: theme.colors.black;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

const LabelIcon = styled.img`
  margin-right: 1rem;
`;

const Label = ({ htmlFor, icon, label, style, className }) => (
  <StyledLabel htmlFor={htmlFor} style={style} className={className}>
    {icon && <LabelIcon src={icon} />}
    {label}
  </StyledLabel>
);

export default Label;
