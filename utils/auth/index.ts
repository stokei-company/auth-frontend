import { addHours } from 'date-fns';
import nookies, { parseCookies } from 'nookies';
import { isProduction } from '~/environments';

const TOKEN = "stk-token";
const cookieDomain: string = isProduction ? "stokei.com" : undefined;

export const getToken = (ctx?: any) => {
    const cookies = parseCookies(ctx);
    return cookies[TOKEN];
}
export const removeToken = (ctx?: any) => nookies.destroy(ctx, TOKEN, {
    domain: cookieDomain,
});

export const setToken = (value: string, ctx?: any) => nookies.set(ctx, TOKEN, value, {
    expires: addHours(Date.now(), 12),
    secure: isProduction,
    domain: cookieDomain,
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