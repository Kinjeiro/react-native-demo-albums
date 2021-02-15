import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';

// todo @ANKU @CRIT @MAIN @debugger - чисто для наглядности, что работает поставил 3
const DEFAULT_LIMIT = 15;

export type VariablesType = {
  page: number,
  limit: number,
  [key: string]: any,
};

// todo @ANKU @LOW - добавить TS тип
export default function useLoadMore(
  query: DocumentNode,
  variables: VariablesType,
  dataExtractorFn: (data: Object) => Object,
  mergeFn: (prev: Object, next: Object) => Object,
) {
  const {
    page = 1,
    limit = DEFAULT_LIMIT,
  } = variables;

  // todo @ANKU @LOW - сгенерировать из схемы TS интерфейсы и прописать их тут
  const gqlResponse = useQuery(
    query,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        ...variables,
        // todo @ANKU @CRIT @MAIN - идет двойной запрос, нужно вынести этот метод
        page,
        limit,
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
    onLoadMore: async () => {
      if (!loading && records.length < totalCount && gqlResponse && gqlResponse.fetchMore) {
        // todo @ANKU @CRIT @MAIN - идет несколько запросов
        /*
          // todo @ANKU @LOW - переделать на новые полиси - https://www.apollographql.com/docs/react/pagination/core-api/ -
          Please convert updateQuery functions to field policies with appropriate
          read and merge functions, or use/adapt a helper function (such as
          concatPagination, offsetLimitPagination, or relayStylePagination) from
          @apollo/client/utilities.
        */
        await gqlResponse.fetchMore({
          variables: {
            page: Math.ceil(records.length / DEFAULT_LIMIT) + 1,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newRecords = fetchMoreResult && dataExtractorFn(fetchMoreResult).data;

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
