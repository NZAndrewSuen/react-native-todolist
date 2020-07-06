import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';

import GlobalStyles from '../styles/GlobalStyles';
import UserService from '../services/UserService';

class SignUpScreen extends React.Component {
    static navigationOptions = {
        title: 'Sign up',
        headerLeft: null,
    };

    constructor() {
        super();
        this.userService = new UserService();
        this.state = { email: '', password: '', errorMessage: null };
    }

    handleSignUp = () => {
        this.userService
            .signUpUser(this.state.email, this.state.password, null)
            .then(
                () => {
                    //redirect user to home page in case of success
                    this.props.navigation.navigate('Home');
                },
                error => {
                    //show error
                    this.setState({ errorMessage: error.message });
                }
            );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={GlobalStyles.heading1}>Create an account</Text>
                {this.state.errorMessage &&
                    <Text style={GlobalStyles.errorText}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={GlobalStyles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={GlobalStyles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Create" onPress={this.handleSignUp} color='#115737' />
                <View style={styles.subContainer}>
                    <Text style={GlobalStyles.normalText}> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={GlobalStyles.textLink}> Login </Text></Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    subContainer: {
        flex: 1,
        marginBottom: 20,
        paddingTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    }
})

export default SignUpScreen;