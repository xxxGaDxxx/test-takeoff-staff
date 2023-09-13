import { LoginArgs } from '@/components/auth/schemaForms.ts';
import { instance } from '@/api/config.ts';
import { AuthArgs, AuthResponse } from '@/api/type.ts';
import { AxiosResponse } from 'axios';

const authApi = {
  register(params: AuthArgs) {
    return instance.post<AuthArgs, AxiosResponse<AuthResponse>>('/register', params);
  },
  login(params: LoginArgs) {
    return instance.post<AuthArgs, AxiosResponse<AuthResponse>>('/login', params);
  },
};

export default authApi;
