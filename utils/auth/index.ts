import Cookie from 'js-cookie';
import { addHours } from 'date-fns';
import { isProduction } from '~/environments';

const TOKEN = "stk-token";

export const getToken = () => Cookie.get(TOKEN);
export const removeToken = () => Cookie.remove(TOKEN);
export const setToken = (value: string) => Cookie.set(TOKEN, value, {
    expires: addHours(Date.now(), 12).getTime(),
    secure: isProduction
});

export const authHeader = (): object => {
    const accessToken = getToken();
    if (accessToken) {
        return {
            'authorization': `Bearer ${accessToken}`,
        };
    }
    return {};
}