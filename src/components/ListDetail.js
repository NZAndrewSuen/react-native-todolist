import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import ListService from '../services/ListService';
import { isTSAnyKeyword } from '@babel/types';

class ListDetail extends Component {
    constructor() {
        super();
        this.listService = new ListService();
        this.state = {
            list: {},
            key: '',
            name: '',
            number: '',
            campus: '',
            isArchive: ''
        }
    }

    deleteList(key) {
        const { navigation } = this.props;
        this.listService
            .deleteList(key)
            .then(() => {
                console.log("Document successfully deleted!");
                this.props.navigation.navigate('Home')
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    componentDidMount() {
        const { navigation } = this.props;
        let key = JSON.parse(navigation.getParam('listKey'));

        this.listService
            .getList(key)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const list = doc.data();
                    this.setState({
                        key: doc.id,
                        name: list.name,
                        number: list.number,
                        campus: list.campus,
                        isArchive: list.isArchive,
                    })
                }
            })
    }

    updateArchive() {
        const { navigation } = this.props;

        this.listService
            .updateArchive(
                this.state.key,
                this.state.name,
                this.state.isArchive,
            )
            .then((docRef) => {
                this.setState({
                    key: '',
                    name: this.state.name,
                    isArchive: true,
                });
                this.props.navigation.navigate('Home')
            })
    }

    //alert
    archiveAlert = () => {
        Alert.alert(
            'Warn',
            'Are you sure to archive this course?',
            [
                { text: 'Yes', onPress: () => this.updateArchive() },
                { text: 'Cancel', onPress: () => console.log('Cancel') },]
        )
    }

    deleteAlert = () => {
        Alert.alert(
            'Warn',
            'Are you sure to delete this course?',
            [
                { text: 'Yes', onPress: () => this.deleteList(this.props.data.key) },
                { text: 'Cancel', onPress: () => console.log('Cancel') },]
        )
    }

    render() {
        return (
            <ScrollView>
                <Card style={styles.container}>

                    <View style={styles.subContainer}>
                        <View>
                            <Text h4 selectable={true}>{this.state.name}</Text>
                        </View>

                        <View>
                            <Text h5>Course number: {this.state.number}</Text>
                        </View>
                        <View>
                            <Text h5>Location: {this.state.campus}</Text>
                        </View>

                    </View>


                    <View style={styles.buttoncontainer}>
                        <View style={styles.detailButton}>
                            <Button
                                type="clear"
                                title='Archive'
                                titleStyle={{ color: '#949494' }}
                                onPress={() => this.archiveAlert()
                                } />
                        </View>

                        <View style={styles.detailButton}>
                            <Button
                                type="clear"
                                title='Delete'
                                titleStyle={{ color: 'red' }}
                                onPress={() => this.deleteAlert()}
                            />
                        </View>
                    </View>
                </Card>
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
        paddingBottom: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    buttoncontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    detailButton: {
        width: '40%'
    }
})

export default withNavigation(ListDetail);