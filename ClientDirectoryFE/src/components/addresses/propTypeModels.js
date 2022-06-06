import { PropTypes } from 'prop-types';

export const addressShape = {
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
