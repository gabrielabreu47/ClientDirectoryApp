import { Box, CircularProgress, Fade } from '@mui/material';

const LoadingPage = ({ loading }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? '800ms' : '0ms',
        }}
        unmountOnExit
      >
        <CircularProgress size={80} />
      </Fade>
    </Box>
  );
};

export default LoadingPage;
