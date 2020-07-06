import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, Button, ListItem } from 'react-native-elements';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import ListDetail from '../components/ListDetail';
import ListService from '../services/ListService';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

class ListDetailScreen extends Component {
    static navigationOptions = {
        title: 'Course detail',
    };

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        let listkey = JSON.parse(navigation.getParam('listKey'));

        this.listService = new ListService();
        this.state = {
            isLoading: true,
            tasks: {},
            name: '',
            duetime: '',
            description: '',
            listkey: listkey
        };
    }


    //task part
    onCollectionUpdate = (querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
            const { name, duetime, description, isCompleted } = doc.data();
            tasks.push({
                key: doc.id,
                doc, // DocumentSnapshot
                name,
                duetime,
                description,
                isCompleted,
            });
        });
        this.setState({
            tasks,
            isLoading: false,
        });
    }

    componentDidMount() {
        this.unsubscribe = this.listService.getTasks(this.state.listkey).onSnapshot(this.onCollectionUpdate);
    }

    updateTaskIsCompleted(
        key,
        listKey,
        isCompleted,
    ) {
        this.listService
            .updateTaskIsCompleted(
                key,
                listKey,
                !isCompleted,
            );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <CustomActivityIndicator />
            )
        }
        return (
            <View>
                <ListDetail
                    data={{ key: this.state.listkey }}
                />

                <View>
                    <Card title="Tasks">
                        <View>
                            <SwipeListView
                                data={this.state.tasks}
                                renderItem={(data, rowMap) => (
                                    <View style={styles.rowFront}>
                                        <Text
                                            style={data.item.isCompleted ? styles.taskCompleted : styles.taskNormal}
                                            onPress={() => {
                                                this.props.navigation.navigate(
                                                    'TaskDetail',
                                                    {
                                                        taskKey: `${JSON.stringify(data.item.key)}`,
                                                        listKey: `${JSON.stringify(this.state.listkey)}`,
                                                    }
                                                )
                                            }}
                                        >
                                            {data.item.name}
                                        </Text>
                                    </View>
                                )}
                                renderHiddenItem={(data, rowMap) => (
                                    <View style={[styles.rowBack, data.item.isCompleted ? styles.rowBackUndone : styles.rowBackDone]}>
                                        <Text style={[styles.rowBackText, data.item.isCompleted ? styles.rowBackTextUndone : styles.rowBackTextDone]}
                                            onPress={() => {
                                                this.updateTaskIsCompleted(
                                                    data.item.key,
                                                    this.state.listkey,
                                                    data.item.isCompleted,
                                                )
                                            }}
                                        >{data.item.isCompleted ? "Undone" : "Done"}</Text>
                                    </View>
                                )}
                                leftOpenValue={75}
                                // rightOpenValue={-75}
                            />
                        </View>

                        <View>
                            <Button
                                buttonStyle={{ backgroundColor: '#115737' }}
                                title="Create a task"
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'TaskDetail',
                                        {
                                            taskKey: `${JSON.stringify("-1")}`,
                                            listKey: `${JSON.stringify(this.state.listkey)}`,
                                        },
                                    );
                                }} />
                        </View>
                    </Card>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowFront: {
        backgroundColor: '#fff',
        marginBottom: 10,
        justifyContent: 'center',
        height: 30,
    },
    rowBack: {
        alignItems: 'center',
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        marginBottom: 10,
        paddingRight: 15,
    },
    rowBackDone: {
        backgroundColor: '#4a86e8',
        borderColor: '#4a86e8',
    },
    rowBackUndone: {
        backgroundColor: '#949494',
        borderColor: '#949494',
    },
    rowBackText: {
        fontSize:20,
        color: "#fff",
    },
    rowBackTextDone: {
        
    },
    rowBackTextUndone: {
        
    },
    taskCompleted: {
        textDecorationLine: "line-through",
        color: "#949494",
    },
    taskNormal: {

    },
})

export default ListDetailScreen;