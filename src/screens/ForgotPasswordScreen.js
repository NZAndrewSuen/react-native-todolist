import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

import GlobalStyles from '../styles/GlobalStyles';
import UserService from '../services/UserService';

class ForgotPasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Reset your password',
    };

    constructor() {
        super();
        this.userService = new UserService();
        this.state = { email: '', password: '', errorMessage: null };
    }

    handleResetPassword = () => {
        this.userService
            .resetPassword(this.state.email)
            .then(() => {
                Alert.alert(
                    'Message',
                    'Please check your email for a password reset link.',
                    [
                        { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
                    ],
                    { cancelable: false },
                );
                
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

render() {
    return (
        <View style={styles.container}>
            <Text style={[GlobalStyles.normalText, GlobalStyles.greyText]}>Don't worry, it happens to all of us :)</Text>
            <Text style={[GlobalStyles.normalText]}>Just type your email here and we will send you a link to reset your password.</Text>
            {this.state.errorMessage &&
                <Text style={GlobalStyles.errorText}>
                    {this.state.errorMessage}
                </Text>}
            <TextInput
                style={GlobalStyles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
            />
            <Button title="Reset" color='#115737' onPress={this.handleResetPassword} />
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
})

export default ForgotPasswordScreen;