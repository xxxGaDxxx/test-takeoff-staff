import { LoginArgs } from '@/components/auth/schemaForms.ts';
import { instance } from '@/api/config.ts';
import { AuthArgs, AuthResponse, MeArgs, UserType } from '@/api/type.ts';
import { AxiosResponse } from 'axios';

const authApi = {
  register(params: AuthArgs) {
    return instance.post<AuthArgs, AxiosResponse<AuthResponse>>('/register', params);
  },
  login(params: LoginArgs) {
    return instance.post<AuthArgs, AxiosResponse<AuthResponse>>('/login', params);
  },
  me(params: MeArgs) {
    return instance.get<UserType>(`/users/${params.userId}`, {
      headers: { Authorization: `Bearer ${params.accessToken}` },
    });
  },
};

export default authApi;
