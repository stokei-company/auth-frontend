import { AppServiceRest } from './services/app/app.service';
import { BaseServiceConfig } from './services/base-service';
import { MeServiceRest } from './services/me/me.service';
import { PasswordServiceRest } from './services/password/password.service';
import { UserServiceRest } from './services/user/user.service';

export interface ClientRestAPIInstance {
  readonly me: MeServiceRest;
  readonly apps: AppServiceRest;
  readonly passwords: PasswordServiceRest;
  readonly users: UserServiceRest;
}

export const clientRestApi = (
  config: BaseServiceConfig = {}
): ClientRestAPIInstance => {
  return {
    me: new MeServiceRest(config),
    apps: new AppServiceRest(config),
    passwords: new PasswordServiceRest(config),
    users: new UserServiceRest(config)
  };
};
