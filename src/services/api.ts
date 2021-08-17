export interface Response<T> {
    status: number;
    body?: T;
    message?: string;
}

export interface LoginResponse {
    auth_token: string;
}

export const login = async (email: string, password: string): Promise<Response<LoginResponse>> => {
    try{
        const response = await fetch('https://example.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const result: Response<LoginResponse> = {
            status: response.status,
        }

        if(response.ok) {
            result.body = (await response.json()) as LoginResponse;
        }

        return result;
    } catch(err){
        // correctly handle network errors
        return {
            status: 0,
        }
    }
}