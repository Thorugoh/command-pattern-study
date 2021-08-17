import React, { useState , useEffect, useCallback} from 'react';
import { ActivityIndicator, AsyncStorage, Button, Text } from 'react-native';
import { View } from 'react-native';
import { Switch, TextInput } from 'react-native-gesture-handler';

export interface ILoginScreenProps {}

export const LoginScreen: React.FC<ILoginScreenProps> = (props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
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


    const submit = useCallback(async () => {
        setPending(true);
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

            if(response.status === 200){
                // -> go to next screen
                await AsyncStorage.setItem('last-user-email', email);
                return;
            }

            setError('Oupside Daisy. Please try again');
        } catch(err){
            // correctly handle network errors
            setError('Oupside Daisy. Please try again');
        } finally {
            setPending(false);
        }
    }, []);

    const forgotPassword = useCallback(async () => {
        // -> go to forgot password
    },[]);

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
                <Text onPress={forgotPassword}>Forgot Password</Text>
            </View>

            <ActivityIndicator animating={pending} size="large" />

            {error ? (
                <View>
                    <Text>{error}</Text>
                </View> 
            ): null}

            <Button
                disabled={pending || !password || !email}
                title="Submit"
                onPress={submit}
            />

        </View>
    )
}