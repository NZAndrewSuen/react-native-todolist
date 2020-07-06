import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { StyleSheet, View, ScrollView, Text, FlatList } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

import SearchService from '../services/SearchService'

class SearchScreen extends Component {
    static navigationOptions = {
        title: 'Search',
    };

    constructor(props) {
        super(props);
        this.searchService = new SearchService();
        let keyword = JSON.parse(props.navigation.getParam('keyword'));

        this.state = {
            keyword: keyword,
            lists: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        // initial search
        this.search();
    }

    updateSearch(keyword) {
        this.setState({ keyword });
    }

    search() {
        this.searchService
            .searchListsByKeyword(this.state.keyword)
            .then(querySnapshot => {
                lists = []; //reset the lists

                querySnapshot.forEach(doc => {
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
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <CustomActivityIndicator />
            )
        }
        return (
            <View>
                <View>
                    <SearchBar
                        placeholder="Input your course name..."
                        // lightTheme="true"
                        platform="ios"
                        onChangeText={this.updateSearch.bind(this)}
                        value={this.state.keyword}
                        onSubmitEditing={this.search.bind(this)}
                    />
                </View>
                <View>
                    <Card title="Your courses">
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
                                ></ListItem>
                            }
                        />
                    </Card>
                </View>
                {this.state.lists.length >= 0 &&
                    <View style={styles.results}>
                        <Text style={styles.textResults}>{this.state.lists.length} result(s) found.</Text>
                    </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    results: {
        padding: 20,
    },
    textResults: {
        fontSize: 16,
    }
})

export default SearchScreen