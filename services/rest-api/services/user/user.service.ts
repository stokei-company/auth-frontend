import { BaseService, BaseServiceConfig } from '../base-service';

export interface IAuthPayload {
  readonly accessToken: string;
  readonly redirectUri: string;
  readonly errors?: any;
}

export interface UserServiceConfig extends BaseServiceConfig {}

export class UserServiceRest extends BaseService {
  constructor(data: UserServiceConfig) {
    super(data);
  }

  async login(data: {
    account: {
      email: string;
      password: string;
    };
    device: any;
    redirectUri: string;
  }): Promise<IAuthPayload> {
    try {
      const response = await this.client.post<IAuthPayload>(
        `/default/login`,
        data
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async signup(data: {
    account: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    };
    device: any;
    redirectUri: string;
  }): Promise<IAuthPayload> {
    try {
      const response = await this.client.post<IAuthPayload>(
        `/default/signup`,
        data
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}
