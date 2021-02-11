import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';

export default function useLoadMore(
  query: DocumentNode,
  variables: Object,
  dataExtractorFn: (data: Object) => Object,
  mergeFn: (prev: Object, next: Object) => Object,
) {
  const LIMIT = 3;

  // todo @ANKU @LOW - динамически получать пользователя
  // todo @ANKU @LOW - сгенерировать из схемы TS интерфейсы и прописать их тут
  const gqlResponse = useQuery(
    query,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        ...variables,
        // todo @ANKU @CRIT @MAIN - идет двойной запрос, нужно вынести этот метод
        page: 1,
        limit: LIMIT,
      },
    },
  );
  const {
    loading,
    data,
  } = gqlResponse;

  const records = data && dataExtractorFn(data).data;
  const totalCount = data && dataExtractorFn(data).meta.totalCount;

  return {
    loading,
    records,
    totalCount,
    gqlResponse,
    onLoadMore: () => {
      if (!loading && records.length < totalCount) {
        // todo @ANKU @CRIT @MAIN - идет несколько запросов
        gqlResponse.fetchMore({
          variables: {
            page: Math.ceil(records.length / LIMIT) + 1,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newRecords = dataExtractorFn(fetchMoreResult).data;

            // Don't do anything if there weren't any new items
            if (!fetchMoreResult || newRecords.length === 0) {
              return previousResult;
            }

            //return {
            //  ...previousResult,
            //  // Concatenate the new feed results after the old ones
            //  user: {
            //    ...previousResult.user,
            //    albums: {
            //      ...previousResult.user.albums,
            //      data: dataExtractorFn(previousResult).data.concat(newRecords),
            //    },
            //  },
            //};
            return mergeFn(previousResult, fetchMoreResult);
          },
        });
      }
    },
  };
}
