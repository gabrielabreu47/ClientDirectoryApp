import { Stack, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { PropTypes } from 'prop-types';

const PaginationArrows = ({ onClickBack, onClickForward }) => {
  return (
    <Stack spacing={2} direction="row" justifyContent="center">
      <IconButton onClick={onClickBack}>
        <ArrowBack />
      </IconButton>
      <IconButton onClick={onClickForward}>
        <ArrowForward />
      </IconButton>
    </Stack>
  );
};

PaginationArrows.defaultProps = {
  onClickBack: () => {},
  onClickForward: () => {},
};

PaginationArrows.propTypes = {
  onClickBack: PropTypes.func,
  onClickForward: PropTypes.func,
};

export default PaginationArrows;
