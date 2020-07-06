import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import ProfileService from '../services/ProfileService'
import GlobalStyles from '../styles/GlobalStyles';

class AddPro extends Component{

    constructor(){
        super();
        this.ProfileService = new ProfileService();
        this.ref = this.ProfileService.getProfile();
        this.unsubscribe = null;
        this.test =1;
        this.state = {
            isLoading: true,
            studentId:'',
            name:'',
            major:'',
        };
    }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    saveProfile(){
        this.setState({
           isLoading:true,
        });

        this.ProfileService
        .addProfile(this.state.studentId, this.state.name,this.state.major)
        .then((docRef) => {
            this.setState({
                studentId: '',
                name:'',
                major:'',
            });

        window.location.reload();
        })
    }

    render(){      
        return(
         <ScrollView>
           <View style={styles.container}>
           <Text style={GlobalStyles.heading1}>You information</Text>
                <TextInput
                        placeholder={'Student Id'}
                        style={GlobalStyles.textInput}
                        value={this.state.studentId}
                        onChangeText={(text) => this.updateTextInput(text, 'studentId')}
                />

                <TextInput
                        placeholder={'Name'}
                        style={GlobalStyles.textInput}
                        value={this.state.name}
                        onChangeText={(text) => this.updateTextInput(text, 'name')}
                />     

                <TextInput
                        placeholder={'Major'}
                        style={GlobalStyles.textInput}
                        value={this.state.major}
                        onChangeText={(text) => this.updateTextInput(text, 'major')}
                />                    
           </View>

          <View style={styles.container}>
              <Button
                 large
                 buttonStyle = {{backgroundColor:'#115737'}}
                 title='Save'
                 onPress={() => this.saveProfile()} />
          </View>
        </ScrollView>
        )}
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
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    }
})

export default withNavigation(AddPro);