import { GQLUser } from '../feat-graphql/graphqlTypes';

// todo @ANKU @CRIT @MAIN @debugger -
export type UserStub = Omit<GQLUser, 'id' | 'address' | 'company'> & {
  id: string,
  address: string,
  company: string,
  url: string,
};

const USER : UserStub = {
  id: '1',

  // custom
  username: '@ivan_ivanov',
  name: 'Ivan Ivanov',
  email: 'test@test.com',
  website: 'test.com',
  phone: '+7 926 *** *** 14',

  company: 'Google',
  address: 'United Stares',
  url: 'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
};

export default USER;
