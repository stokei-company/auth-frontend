import { BaseService, BaseServiceConfig } from '../base-service';

export interface PasswordServiceConfig extends BaseServiceConfig {}

export class PasswordServiceRest extends BaseService {
  constructor(data: PasswordServiceConfig) {
    super(data);
  }

  async change(data: {
    email: string;
    password: string;
    code: string;
  }): Promise<boolean> {
    try {
      const response = await this.client.post<{ ok: boolean }>(
        `/passwords/change`,
        data
      );
      if (response?.data?.ok) {
        return response.data.ok;
      }
    } catch (error) {}
    return false;
  }

  async forgot(data: { email: string }): Promise<boolean> {
    try {
      const response = await this.client.post<{ ok: boolean }>(
        `/passwords/forgot`,
        data
      );
      if (response?.data?.ok) {
        return response.data.ok;
      }
    } catch (error) {}
    return false;
  }
}
