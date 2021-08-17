import { action } from "mobx";
import { Command } from "../CommandInvoker";
import { User } from "../UserModel";

export interface RememberMeCommandParams {
    rememberMe: boolean;
}

export class RememberMeCommand implements Command {
    
    @action
    public async execute(params?: RememberMeCommandParams): Promise<void> {
        if(params){
            User.rememberMe = params.rememberMe;
        }
    }

    @action
    canExecute(params?: RememberMeCommandParams): boolean {
        if(params){
            return true;
        }
        return false;
    }
   
}