import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { currencies } from '../data/currencies';
import useSelectDynamic from '../hooks/useSelectDynamic';
import Error from './Error';

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: Capitalize;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3% ease;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setCurrencies }) => {
  const [error, setError] = useState(false);
  const [cyptos, setCryptos] = useState([]);
  const [currency, SelectCurrencies] = useSelectDynamic(
    'Choose your currency',
    currencies
  );

  const [cryptocurrency, SelectCryptocurrencies] = useSelectDynamic(
    'Choose your cryptocurrencies',
    cyptos
  );

  useEffect(() => {
    const fetchAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
      const response = await fetch(url);
      const result = await response.json();
      const data = result.Data.map((item) => {
        return {
          id: item.CoinInfo.Name,
          name: item.CoinInfo.FullName,
        };
      });
      setCryptos(data);
    };

    fetchAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([currencies, cryptocurrency].includes('')) {
      setError(true);
      return;
    }

    setError(false);
    setCurrencies({
      currency,
      cryptocurrency,
    });
  };

  return (
    <>
      {error && <Error>All fields are required</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCurrencies />
        <SelectCryptocurrencies />
        {/* <SelectCryptocurrencies /> */}
        <InputSubmit type="submit" value="Quote" />
      </form>
    </>
  );
};

export default Form;
