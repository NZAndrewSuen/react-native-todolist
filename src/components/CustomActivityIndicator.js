import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

class CustomActivityIndicator extends Component {
    render() {
        return (
            <View style={styles.activity}>
                <ActivityIndicator size="large" color="#4a86e8" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CustomActivityIndicator;