import { AUTH_SERVER_URL } from "../../environments";
import { mountUri } from "../uri/mount-uri";

export const SITE_NAME = "Stokei";

export const logoUrl = "https://assets.stokei.com/logos/logo.png";

interface ParamsSocialMediaURI {
    readonly redirectUri?: string;
    readonly appId?: string;
}

const authURI = (baseURL: string, data: ParamsSocialMediaURI) => mountUri(baseURL, [
    data.redirectUri && {
        key: "redirectUri",
        value: data.redirectUri,
    },
    data.appId && {
        key: "appId",
        value: data.appId,
    },
]);

export const googleAuthURI = (data: ParamsSocialMediaURI) => authURI(AUTH_SERVER_URL + "/google", data);

export const facebookAuthURI = (data: ParamsSocialMediaURI) => authURI(AUTH_SERVER_URL + "/facebook", data);

export const colors = {
    primary: {
        dark: "green.600",
        light: "green.500",
    }
};