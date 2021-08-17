import React, { useState , useEffect, useCallback} from 'react';
import { ActivityIndicator, AsyncStorage, Button, Text } from 'react-native';
import { View } from 'react-native';
import { Switch, TextInput } from 'react-native-gesture-handler';
import { CommandInvoker, useCommand } from '../../CommandInvoker';
import { ForgotPasswordCommand } from './ForgotPasswordCommand';
import { LoginCommand } from './LoginCommand';

export interface ILoginScreenProps {}

export const LoginScreen: React.FC<ILoginScreenProps> = (props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    
    useEffect(() => {
        const getLastUsedEmail = async () => {
            const lastEmail = await AsyncStorage.getItem('last-user-email');
            if(lastEmail){
                setEmail(lastEmail);
            }
            const rememberMeSettings = await AsyncStorage.getItem('remember-me');
            if(rememberMeSettings) {
                setRememberMe(JSON.parse(rememberMeSettings));
            }
        };
        getLastUsedEmail();
    }, []);

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
                    value={rememberMe}
                    onValueChange={(value) => {
                        setRememberMe(value);
                        AsyncStorage.setItem('remember-me', JSON.stringify(value));
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