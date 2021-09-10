import { MeModel } from '~/services/@types/me';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface MeServiceConfig extends BaseServiceConfig {}

export class MeServiceRest extends BaseService {
  constructor(data: MeServiceConfig) {
    super(data);
  }

  async load(): Promise<MeModel> {
    try {
      const response = await this.client.get<MeModel>(`/me`);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}
