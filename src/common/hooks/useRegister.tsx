import { useEffect } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import useProfile from './useProfile';
import { isLoggedInVar } from '../../cache';


type Credentials = {
    password: string
    name: string
    email: string
}

const REGISTER_QUERY = gql`
  mutation (
    $email: String
    $password: String
    $name: String
  ) {
    Signup(
      email: $email
      password: $password
      name: $name
    )
  }
`;

export function useRegister() {
  const [Register, { data, error }] = useMutation(REGISTER_QUERY);
  const { refetch } = useProfile();
 


  useEffect(() => {
    if (data?.Signup) {
      localStorage.setItem('token', data.Signup);
      isLoggedInVar(true);
      refetch();
    }
  }, [data, refetch]);

  return {
    error,
    register: (credentials: Credentials) =>
      Register({ variables: { ...credentials} }),
  };
}