import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class AddButton extends Component {
    render() {
        return (
            <Button
                buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
                icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
                // onPress={() => { navigation.push('AddBoard') }}
                onPress={() => { this.props.navigation.navigate('AddList'); }}
            />
        );
    }
}

export default withNavigation(AddButton);