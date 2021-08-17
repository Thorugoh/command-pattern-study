import { action } from "mobx";
import { Command } from "../../CommandInvoker";


export interface ForgotPasswordCommandParams {}

export class ForgotPasswordCommand implements Command {
    @action
    public async execute(): Promise<void>{
        // -> go to forgot password screen
    }

    @action
    public canExecute(): boolean {
        return true;
    }
}
