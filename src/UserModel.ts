import { observable } from "mobx";
import { persist } from "mobx-persist";
import { apiDefineProperty } from "mobx/dist/internal";
import * as api from './services/api';

declare type LoginAction = 'success' | 'failure';

export interface LoginResult {
    action: LoginAction;
    error?: string;
}

export class UserModel {
    @observable
    @persist
    public authenticationToken: string | null = null;

    @observable
    @persist
    public lastUserEmail: string | null = null;

    @observable
    @persist
    public rememberMe: boolean = true;

    public async login(email: string, password: string): Promise<LoginResult> {
        const response = await api.login(email, password);

        if(response.status === 200){
            const body = response.body as api.LoginResponse;

            this.authenticationToken = body.auth_token;

            this.lastUserEmail = email;

            return {
                action: 'success',
            }
        }

        // else handle another status?

        return {
            action: 'failure',
            error: 'Oupsie Daisy. Please Try again.'
        };        
    }
}

export const User = new UserModel();