import styled from "styled-components";
import { theme } from "constants/theme";

const { darkerGray } = theme.colors;

const UnderLineDescription = styled.div`
  margin-left: ${(props) => props.marginLeft || ""};
  margin-top: ${(props) => props.marginTop || ""};
  color: ${darkerGray};
  font-size: 1rem;
  height: auto;
`;

export default UnderLineDescription;
