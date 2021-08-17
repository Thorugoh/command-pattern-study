import React, { useState , useEffect, useCallback} from 'react';
import { ActivityIndicator, AsyncStorage, Button, Text } from 'react-native';
import { View } from 'react-native';
import { Switch, TextInput } from 'react-native-gesture-handler';
import { CommandInvoker, useCommand } from '../../CommandInvoker';
import { User } from '../../UserModel';
import { RememberMeCommand } from '../RememberMeCommand';
import { ForgotPasswordCommand } from './ForgotPasswordCommand';
import { LoginCommand } from './LoginCommand';

export interface ILoginScreenProps {}

export const LoginScreen: React.FC<ILoginScreenProps> = (props) => {
    const [email, setEmail] = useState<string>(User.lastUserEmail ?? "");
    const [password, setPassword] = useState<string>("");

    const rememberMeCommand = useCommand(() => new RememberMeCommand());
    const forgotPasswordCommand = useCommand(() => new ForgotPasswordCommand());
    const loginCommand = useCommand(() => new LoginCommand());

    return(
        <View>
            <Text>Welcome :)</Text>
            <Text>Please sign in...</Text>

            <View>
                <Text>Email</Text>
                <TextInput onChangeText={setEmail} value={email} />
            </View>

            <View>
                <Text>Password</Text>
                <TextInput onChangeText={setPassword} value={password} />
            </View>

            <View>
                <Text>Remember Me</Text>
                <Switch 
                    value={User.rememberMe}
                    onValueChange={(value) => {
                        CommandInvoker(rememberMeCommand, {rememberMe: value})
                    }}
                />
            </View>
            <View>
                <Text onPress={CommandInvoker(forgotPasswordCommand)}>Forgot Password</Text>
            </View>

            <ActivityIndicator animating={loginCommand.pending} size="large" />

            {loginCommand.error ? (
                <View>
                    <Text>{loginCommand.error}</Text>
                </View> 
            ): null}

            <Button
                disabled={!loginCommand.canExecute({
                    email,
                    password,
                })}
                title="Submit"
                onPress={CommandInvoker(loginCommand, {email, password})}
            />

        </View>
    )
}