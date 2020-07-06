import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { StyleSheet, View, ScrollView, Text, FlatList } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

import SearchService from '../services/SearchService'

class AboutScreen extends Component {
    static navigationOptions = {
        title: 'About',
    };

    constructor(props) {
        super(props);

        this.state = {
            // isLoading: true,
        };
    }

    componentDidMount() {

    }

    render() {
        // if (this.state.isLoading) {
        //     return (
        //         <CustomActivityIndicator />
        //     )
        // }
        return (
            <View>
                <View>
                    <Card
                        title='My to-do'
                    // image={require('../images/pic2.jpg')}
                    >
                        <Text style={styles.textInfo}>
                            Ver 0.9.0
                        </Text>
                        <Text style={styles.textInfo}>
                            A simple and convenient course management app.
                        </Text>
                    </Card>
                    <Card title='Support'>
                        <Text style={styles.textInfo}>
                            If you need any support or have any feedback when using this app, please feel free to contact us.
                        </Text>
                    </Card>
                    <Card containerStyle={{ padding: 0 }} >
                        <ListItem
                            roundAvatar
                            title="Tobias (Tuan)"
                            subtitle="hatuan@myvuw.ac.nz"
                            leftAvatar={{source:require('../assets/img/tobias.jpg')}}
                        />
                        <ListItem
                            roundAvatar
                            title="Andrew (Lutian)"
                            subtitle="sunluti@myvuw.ac.nz"
                            leftAvatar={{source:require('../assets/img/andrew.jpg')}}
                        />
                    </Card>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInfo: {
        marginBottom: 10,
    },
})

export default AboutScreen