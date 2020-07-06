import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import firebase from '../config/Firebase';

import GlobalStyles from '../styles/GlobalStyles';

class WelcomeScreen extends React.Component {
    static navigationOptions = {
        title: 'My to-do',
        headerLeft: null,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Home' : 'Login');
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainImage}>
                    <Image source={require("../assets/img/welcome.jpg")} style={{width: 300}} resizeMode="contain" />
                </View>
                <View style={styles.subContainer}>
                    <Text style={[GlobalStyles.normalText, GlobalStyles.blueText, GlobalStyles.boldText]}>Manage your time</Text>
                    <ActivityIndicator color='#3980ff' size="large" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    mainImage: {
        flex: 5,
        justifyContent: 'center',
    },
    subContainer: {
        flex: 1,
    }
})

export default WelcomeScreen;