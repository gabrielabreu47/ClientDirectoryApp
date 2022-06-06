import { useEffect } from 'react';

export const useAsync = ({
  request,
  handleSuccesRequest,
  returnFunction = () => [],
  dependencies = [],
}) => {
  useEffect(() => {
    let isActive = true;
    request()
      .then((result) => {
        if (isActive) handleSuccesRequest(result.data);
      })
      .catch((err) => {});

    return () => {
      returnFunction && returnFunction();
      isActive = false;
    };
  }, dependencies);
};
