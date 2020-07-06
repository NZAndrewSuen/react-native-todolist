import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import {
    GoogleSigninButton,
} from 'react-native-google-signin';

import GlobalStyles from '../styles/GlobalStyles';
import UserService from '../services/UserService';

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login to My to-do',
        headerLeft: null,
    };

    constructor() {
        super();
        this.userService = new UserService();
        this.state = { email: '', password: '', errorMessage: null };
        // this.state = { email: 'hmtuan2101@gmail.com', password: '123123', errorMessage: null };
        // this.state = { email: 'lu@163.com', password: '123456', errorMessage: null };
    }

    handleLogin = () => {
        this.userService
            .loginUser(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Home'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    loginGoogle = async () => {
        this.userService
            .loginUserViaGoogle()
            .then(async (userCredential) => {
                //if user is new user, we also need to register them to the system
                if (userCredential.additionalUserInfo.isNewUser) {
                    await this.userService
                        .signUpUser(
                            userCredential.user.email,
                            null,
                            userCredential.user.uid,
                            ""
                        );
                }

                this.props.navigation.navigate('Home');
            })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={GlobalStyles.heading1}>Use your existing account to login</Text>
                {this.state.errorMessage &&
                    <View style={{flexDirection: "row", marginTop: 10}}>
                        <Icon style={styles.errorIcon} name="exclamation-circle" type="font-awesome" color="red"></Icon>
                        <Text style={[GlobalStyles.errorText, styles.errorText]}>
                            {this.state.errorMessage}
                        </Text>
                    </View>}
                <TextInput
                    style={GlobalStyles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={GlobalStyles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Login" color='#115737' onPress={this.handleLogin} />
                <GoogleSigninButton
                    style={styles.googleSigninButton}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this.loginGoogle}
                />
                <View style={styles.subContainer}>
                    <Text style={GlobalStyles.normalText}> No account? <Text onPress={() => this.props.navigation.navigate('SignUp')} style={GlobalStyles.textLink}> Create one! </Text></Text>
                    <Text style={[GlobalStyles.normalText, GlobalStyles.greenText]} onPress={() => this.props.navigation.navigate('ForgotPassword')}> Forgot your password? </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    subContainer: {
        flex: 1,
        marginBottom: 20,
        paddingTop: 10,
    },
    googleSigninButton: {
        marginTop: 15,
        height: 45,
    },
    errorIcon: {
        flex: 2,
    },
    errorText: {
        flex: 8,
        marginLeft: 10,
    },
})

export default LoginScreen;