import { LayoutCard } from '../LayoutCard';
import { IconBitcoin } from '../icons/IconBitcoin';
import { IconEthereum } from '../icons/IconEthereum';

const CurrencySymbols = ({ coin }) => {
  return (
    <LayoutCard classNames="currency-symbols card--blanche">
      {coin === 'bitcoin' ? <IconBitcoin /> : <IconEthereum />}
    </LayoutCard>
  );
};

export { CurrencySymbols };
