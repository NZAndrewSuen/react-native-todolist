import React, { Component, Profiler } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import UserService from '../services/UserService';

import GlobalStyles from "../styles/GlobalStyles";

class SettingScreen extends Component {
    static navigationOptions = {
        title: 'Setting',
    };

    constructor() {
        super();
        this.userService = new UserService();
        let username = this.userService.getCurrentUsername();
        let firstLetter = username.charAt(0).toUpperCase();

        this.state = {
            username,
            firstLetter,
        };
    }

    logOut() {
        this.userService
            .logoutUser()
            .then(() => {
                this.props.navigation.navigate("Login");
            });
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Avatar
                        size="xlarge"
                        rounded
                        title={this.state.firstLetter}
                        containerStyle={{ flex: 2, marginLeft: 120, marginTop: 20 }} />
                    <Text style={[GlobalStyles.greenText, styles.welcomeText]}>
                        Welcome, {this.state.username}!
                        </Text>
                </View>

                <View>
                    <Card>
                        <ListItem
                            leftIcon={{ name: 'user', type: 'font-awesome', containerStyle: styles.leftIconContainer}}
                            title="Profile"
                            onPress={() => this.props.navigation.navigate('User')}
                            bottomDivider
                            chevron>
                        </ListItem>
                        <ListItem
                            leftIcon={{ name: 'envelope-o', type: 'font-awesome', containerStyle: styles.leftIconContainer}}
                            title="Notification"
                            bottomDivider
                            chevron>
                        </ListItem>
                        <ListItem
                            leftIcon={{ name: 'power-off', type: 'font-awesome', containerStyle: styles.leftIconContainer}}
                            title="Sign out"
                            bottomDivider
                            chevron
                            onPress={() => { this.logOut(); }}>
                        </ListItem>
                        <ListItem
                            leftIcon={{ name: 'info', type: 'font-awesome', containerStyle: styles.leftIconContainer}}
                            title="About"
                            onPress={() => this.props.navigation.navigate('About')}
                            chevron>
                        </ListItem>
                    </Card>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    welcomeText: {
        padding: 10,
        textAlign: "center",
        fontSize: 20,
    },
    leftIconContainer: {
        width: 25,
        marginRight: 5,
    },
})

export default SettingScreen