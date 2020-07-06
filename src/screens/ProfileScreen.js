import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList, TextInput, Button } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import ProfileService from '../services/ProfileService'
import GlobalStyles from '../styles/GlobalStyles';
import AddPro from '../components/AddPro';
import Icon from 'react-native-vector-icons/Entypo';

class UserScreen extends Component {
    static navigationOptions = {
        title: 'Profile',
    };

    constructor() {
        super();
        this.ProfileService = new ProfileService();
        this.ref = this.ProfileService.getProfile();
        this.unsubscribe = null;
        // this.test = this.ProfileService.getProfileDoc();
        this.state = {
            isLoading: true,
            key: '',
            profile: [],
            profileExist: false,
        };
    }

    //part2
    onCollectionUpdate = async (querySnapshot) => {
        const profile = [];
        let profileExist = false;

        querySnapshot.forEach((doc) => {
            const { studentId, name, major } = doc.data();
            profile.push({
                key: doc.id,
                doc, // DocumentSnapshot
                studentId,
                name,
                major
            });

            profileExist = true;
        });

        this.setState({
            profile,
            isLoading: false,
            profileExist,
        });
    }


    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }


    render() {
           if(!this.state.profileExist){ 
               return(
               <View>             
                  <AddPro />
                </View>)}else{
                    return(
                    <View>
                    <Card title = "Your information">
                        <FlatList
                            data={this.state.profile}
                            renderItem={({ item }) =>
                                <View>
                                    <ListItem
                                        title={"Student Id : " + item.studentId}
                                        bottomDivider
                                    />

                                    <ListItem
                                        title={"Name : " + item.name}
                                        bottomDivider
                                    />

                                    <ListItem
                                        title={"Major : " + item.major}
                                    />
                                </View>
                            } />
                    </Card>
                    </View>)}
    }
}

export default UserScreen