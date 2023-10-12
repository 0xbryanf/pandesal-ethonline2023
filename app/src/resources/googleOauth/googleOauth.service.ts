import { IGoogleToken, IGoogleUser } from '@/resources/googleOauth/googleOauth.interface';
import HttpException from '@/utils/exceptions/http.exception';
import axios from 'axios';
import queryString from 'querystring';

class GoogleOAuthService {
    public async getGoogleOAuthTokens({ code }: { code: string }): Promise<IGoogleToken> {
        const url = 'https://oauth2.googleapis.com/token';

        const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } = process.env
        const values = {
            code,
            client_id: GOOGLE_CLIENT_ID as string,
            client_secret: GOOGLE_CLIENT_SECRET as string,
            redirect_uri: GOOGLE_REDIRECT_URL as string,
            grant_type: "authorization_code",
        };

        try {
            const res = await axios.post<IGoogleToken>(url, queryString.stringify(values), {
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                },
            });

            return res.data
        } catch (error: any) {
            console.error(error, 'Failed to fetch Google Oauth Tokens');
            throw new Error(error.message);
        }
    }

    public async getGoogleUser({id_token, access_token}: any): Promise<IGoogleUser> {
        try {
            const res = await axios.get<IGoogleUser>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
                headers: {
                    Authorization: `Bearer ${id_token}`
                }
            });

            return res.data;
        } catch (error: any) {
            console.error(error, 'Error fetching Google User');
            throw new HttpException(400, error.message);
        }
    }

    public async createSession(userId: string, userVerified: boolean, userAgent: string): Promise<string> {
        const session = {
            user: userId,
            verified: userVerified,
            userAgent
        }
        const sessionJSON = JSON.stringify(session);
        return sessionJSON;
    }
}

export default GoogleOAuthService;