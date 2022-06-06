import { PropTypes } from 'prop-types';
import { addressShape } from './propTypeModels';
import AddressCard from './AddressCard';
import { Stack } from '@mui/material';

const AddressList = ({ addresses, onDeleteAddress }) => {
  return (
    <Stack direction="row" spacing={2}>
      {addresses.map((address, idx) => (
        <AddressCard key={idx} address={address} onDeleteAddress={onDeleteAddress} />
      ))}
    </Stack>
  );
};

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.exact(addressShape)),
};

export default AddressList;
