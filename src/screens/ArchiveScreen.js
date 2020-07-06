import React, { Component } from 'react';
import {Card} from 'react-native-elements';
import { StyleSheet, View, ScrollView,Text, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

import ListService from '../services/ListService'

class ArchiveScreen extends Component{
    static navigationOptions = {
        title: 'Archive',
    };

    constructor() {
        super();
        this.listService = new ListService();
        this.ref = this.listService.getLists();
        this.unsubscribe = null;
        this.state = {
            isLoading: true,
            lists: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const lists = [];
        querySnapshot.forEach((doc) => {
            const { name, number, isArchive } = doc.data();

            if (isArchive) {
                lists.push({
                    key: doc.id,
                    doc, // DocumentSnapshot
                    name,
                    number,
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
    }


    render(){
        if (this.state.isLoading) {
            return (
                <CustomActivityIndicator />
            )
        }
        return(
            <View style={styles.container}>
            <Card title = "Archived Curriculum">
            <FlatList
                data={this.state.lists}
                renderItem={({ item }) =>
                    <ListItem
                        key={item.key}
                        title={item.name}
                        subtitle={item.number}
                        leftIcon={{ name: 'book', type: 'font-awesome' }}
                        onPress={() => {
                            this.props.navigation.navigate('ArchiveDetail', {
                                listKey: `${JSON.stringify(item.key)}`,
                            });
                        }}
                    ></ListItem>
                }
            />
            </Card> 
         </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
})

export default ArchiveScreen