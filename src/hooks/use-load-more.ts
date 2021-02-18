import { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { GQLPageMetadata, GQLPaginationLinks } from '../feats/feat-graphql/graphqlTypes';

// todo @ANKU @CRIT @MAIN @debugger - чисто для наглядности, что работает поставил 3
export const DEFAULT_LIMIT = 10;

export type VariablesType = {
  page: number,
  limit: number,
  [key: string]: any,
};

export type ExtractorResultType<RecordType> = {
  data?: Array<RecordType | null>;
  links?: GQLPaginationLinks;
  meta?: GQLPageMetadata;
};

export default function useLoadMore<QueryType, QueryVariablesType extends VariablesType, RecordType>(
  query: DocumentNode,
  variables: QueryVariablesType | undefined,
  dataExtractorFn: (data: QueryType) => ExtractorResultType<RecordType> | undefined,
  mergeFn: (prev: QueryType, next: QueryType) => QueryType,
) {
  const {
    page = 1,
    limit = DEFAULT_LIMIT,
  } = variables || {};

  // todo @ANKU @LOW - сгенерировать из схемы TS интерфейсы и прописать их тут
  const gqlResponse = useQuery<QueryType>(
    query,
    {
      // todo @ANKU @CRIT @MAIN @debugger - так как у нас сервер не изменяется после добавления, а страница полностью перезагружается ставим приоритет кеша
      /*
        standby - Uses the same logic as cache-first, except this query does not automatically update when underlying field values change. You can still manually update this query with refetch and updateQueries.
      */
      // todo @ANKU @LOW - при standby постоянный лоадинг внизу
      fetchPolicy: 'cache-first',
      //fetchPolicy: 'network-only',
      //fetchPolicy: 'cache-and-network',
      //fetchPolicy: 'standby',
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

  const records = (data && dataExtractorFn(data)?.data) || [];
  const totalCount = (data && dataExtractorFn(data)?.meta?.totalCount) || 0;

  const handleLoadMore = useCallback(async () => {
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
          const newRecords = fetchMoreResult && dataExtractorFn(fetchMoreResult)?.data;

          // Don't do anything if there weren't any new items
          if (!fetchMoreResult || !newRecords || newRecords.length === 0) {
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
  }, [loading, records, totalCount, gqlResponse]);

  return {
    loading,
    records,
    totalCount,
    gqlResponse,
    onLoadMore: handleLoadMore,
  };
}
