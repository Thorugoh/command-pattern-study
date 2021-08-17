import { action, observable } from "mobx";
import { AsyncStorage } from "react-native";
import { Command } from "../../CommandInvoker";

export interface LoginCommandParams {
    email: string;
    password: string;
}

export class LoginCommand implements Command<LoginCommandParams> {
    @observable
    public pending: boolean = false;

    @observable
    public error: string | null = null;

    @action
    public async execute(params?: LoginCommandParams): Promise<void> {
        
        if(params){
        this.pending = true
        
        try{
            const response = await fetch('https://example.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: params.email,
                    password: params.password,
                }),
            });

            if(response.status === 200){
                // -> go to next screen
                await AsyncStorage.setItem('last-user-email', params.email);
                return;
            }

            this.error = 'Oupside Daisy. Please try again';
        } catch(err){
            // correctly handle network errors
            this.error = 'Oupside Daisy. Please try again';
        } finally {
            this.pending = false;
        }
        }
    }

    @action
    public canExecute(params?: LoginCommandParams): boolean {
        if(params){
            if(!params.email || !params.password){
                return false;
            }
        }
        return !this.pending;
    }
   
    
}