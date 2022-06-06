import { useState } from 'react';
import { useAsync } from './useAsync';
import { useFetchAndLoad } from './useFetchAndLoad';

export const usePaginationRequest = (
  apiRequest,
  handleSuccess,
  handleDataEnded,
  additionalFetchParameters = {}
) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [recall, setRecall] = useState(0);
  const take = 10;
  const { loading, callEndpoint } = useFetchAndLoad();

  const request = async () =>
    await callEndpoint(
      apiRequest({ take, skip: page * take, ...additionalFetchParameters })
    );

  const handleSuccesRequest = (data) => {
    if (!data.length && page > 0) {
      setPage(page - 1);
      handleDataEnded('No more data');
    }
    setData(data);
    handleSuccess(data);
  };

  useAsync({ request, handleSuccesRequest });
  useAsync({ request, handleSuccesRequest, dependencies: [page, recall] });

  const handlePageChange = (newPage) => {
    if (newPage === page) return;
    if (newPage < 0) {
      return;
    }

    setPage(newPage);
  };

  const goBack = () => {
    handlePageChange(page - 1);
  };

  const goForward = () => handlePageChange(page + 1);

  const makeRecall = () => {
    setRecall(recall + 1);
  }

  return { loading, goBack, goForward, data, makeRecall };
};
