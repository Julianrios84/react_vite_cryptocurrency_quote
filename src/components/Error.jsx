import styled from '@emotion/styled';

const Text = styled.div`
  background-color: #b7322c;
  color: #fff;
  padding: 15px;
  font-size: 22px;
  text-transform: Capitalize;
  font-family: 'Noto Sans', sans-serif;
  letter-spacing: -2px;
  font-weight: 700;
  text-align: center;
`;

const Error = ({ children }) => {
  return <Text>{children}</Text>;
};

export default Error;
