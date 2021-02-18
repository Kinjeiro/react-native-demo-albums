import { gql } from '@apollo/client';

import { GQLUser } from '../feat-graphql/graphqlTypes';

export const QUERY_LOAD_USER = gql`
    query loadUser($userId: ID!) {
        user(id: $userId) {
            id
            username
            name
            email
            phone
            website
            address {
                city
                street
                suite
                zipcode
            }
            company {
                bs
                catchPhrase
                name
            }
        }   
    }
`;
export type QueryLoadUserType = {
  user: GQLUser,
};
export type QueryLoadUserVariablesType = {
  userId: string,
};
