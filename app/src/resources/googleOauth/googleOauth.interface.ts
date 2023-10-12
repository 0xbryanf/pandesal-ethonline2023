export interface IGoogleUser {
    id: string;
    email: string;
    verified_email: boolean;
}

export interface IGoogleToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export interface ISessions {
    user: string;
    valid: boolean;
    userAgent: string;
}

export interface InitConfig {
    email: string;
    wallet: string;
    contract: string;
}