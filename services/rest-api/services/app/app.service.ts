import { AppModel } from '~/services/@types/app';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface AppServiceConfig extends BaseServiceConfig {}

export class AppServiceRest extends BaseService {
  constructor(data: AppServiceConfig) {
    super(data);
  }

  async findById(id: string): Promise<AppModel> {
    try {
      if (id) {
        const response = await this.client.get<AppModel>(`/apps/${id}`);
        if (response?.data) {
          return response.data;
        }
      }
    } catch (error) {}
    return null;
  }
}
