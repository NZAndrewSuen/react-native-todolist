import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';

import CustomActivityIndicator from '../components/CustomActivityIndicator'

import ListService from '../services/ListService';
import GlobalStyles from '../styles/GlobalStyles';

class AddListScreen extends Component {
    static navigationOptions = {
        title: 'Add List',
    };

    constructor() {
        super();
        this.listService = new ListService();
        this.state = {
            name: '',
            number: '',
            campus:'',
            isLoading: false,
        };
    }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    saveList() {
        this.setState({
            isLoading: true,
        });

        this.listService
            .addList(this.state.name, this.state.number,this.state.campus)
            .then((docRef) => {
                this.setState({
                    name: '',
                    number: '',
                    campus:'',
                    isLoading: false,
                });

            this.props.navigation.goBack();
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <CustomActivityIndicator />
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Input
                        placeholder={'Course name'}
                        style={GlobalStyles.textInput}
                        value={this.state.name}
                        onChangeText={(text) => this.updateTextInput(text, 'name')}
                    />
                </View>
                <View>
                    <Input
                        style={GlobalStyles.textInput}
                        placeholder={'Course number'}
                        value={this.state.number}
                        onChangeText={(text) => this.updateTextInput(text, 'number')}
                    />
                </View>
                <View>
                    <Input
                        style={GlobalStyles.textInput}
                        placeholder={'Location'}
                        value={this.state.campus}
                        onChangeText={(text) => this.updateTextInput(text, 'campus')}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Button
                        large
                        buttonStyle = {{backgroundColor:'#115737'}}
                        leftIcon={{ name: 'save' }}
                        title='Save'
                        onPress={() => this.saveList()} />
                </View>
            </ScrollView>
        );
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
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
})

export default AddListScreen;