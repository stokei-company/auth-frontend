import Cookie from 'js-cookie';

const TOKEN = "stk-token";

export const getToken = () => Cookie.get(TOKEN);
export const setToken = (value: string) => Cookie.set(TOKEN, value);

export const authHeader = (): object => {
    const accessToken = getToken();
    if(accessToken){
        return {
            'authorization': `Bearer ${accessToken}`,
        };
    }
    return {};
}