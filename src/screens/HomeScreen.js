import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Alert } from 'react-native';
import { Card, SearchBar, ListItem, Icon, Button } from 'react-native-elements';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

import ListService from '../services/ListService';
import UserService from '../services/UserService';

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        // return {
        //     title: 'Home',
        // };
        const { params } = navigation.state;
        return params;
    };

    //add search bar
    state = {
        search: "",
    };


    updateSearch = search => {
        this.setState({ search });
    };

    // Declare all required variable for Firebase Firestore data inside the constructor
    constructor() {
        super();
        this.listService = new ListService();
        this.userService = new UserService();
        this.ref = this.listService.getLists();
        this.unsubscribe = null;
        this.state = {
            isLoading: true,
            lists: [],
            isVisible:false,
        };
    }

    // the function for extract Firebase response to the state
    onCollectionUpdate = (querySnapshot) => {
        const lists = [];
        querySnapshot.forEach((doc) => {
            const { name, number, campus, isArchive } = doc.data();
            if (!isArchive) {
                lists.push({
                    key: doc.id,
                    doc, // DocumentSnapshot
                    name,
                    number,
                    campus,
                    isArchive,
                });
            }
        });
        this.setState({
            lists,
            isLoading: false,
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

        // set welcome header
        let currentUsername = this.userService.getCurrentUsername();
        this.props.navigation.setParams({
            title: `Welcome, ${currentUsername}!`,
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <CustomActivityIndicator />
            )
        }
        const { search } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View>
                    <SearchBar
                        placeholder="Input your course name..."
                        // lightTheme="true"
                        platform="ios"
                        onChangeText={this.updateSearch}
                        value={search}
                        onSubmitEditing={
                            () => this.props.navigation.navigate(
                                'Search',
                                { keyword: `${JSON.stringify(this.state.search)}` },
                            )
                        }
                    />
                </View>

                <View style={styles.container}>
                    <Card title="My Curriculum">
                       <View>
                        <FlatList
                            data={this.state.lists}
                            renderItem={({ item }) =>
                                <ListItem
                                    key={item.key}
                                    title={item.name}
                                    subtitle={item.number}
                                    leftIcon={{ name: 'book', type: 'font-awesome' }}
                                    onPress={() => {
                                        this.props.navigation.navigate('ListDetails', {
                                            listKey: `${JSON.stringify(item.key)}`,
                                        });
                                    }}
                                    onLongPress={() => Alert.alert(
                                        'Notice',
                                        "This lecture is on " + item.campus +" campus"
                                    )}
                                ></ListItem>
                            }
                        />
                    </View>

                    <View>
                    <Button
                        title="Add a new course"
                        buttonStyle = {{backgroundColor:'#115737'}}
                        onPress={() => { this.props.navigation.navigate('Add'); }} />
                   </View>
                   </Card>
                   
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

export default HomeScreen;