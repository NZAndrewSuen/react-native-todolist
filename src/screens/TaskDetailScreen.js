import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, DatePickerAndroid, Alert } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

import CustomActivityIndicator from '../components/CustomActivityIndicator';
import GlobalStyles from '../styles/GlobalStyles';
import ListService from '../services/ListService';

class TaskDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            // update title based on page mode (create or update)
            title: JSON.parse(navigation.getParam('taskKey')) == -1
                ? "Create a task"
                : "Task detail",
        };
    };

    constructor(props) {
        super(props);

        this.listService = new ListService();
        let taskKey = JSON.parse(props.navigation.getParam('taskKey'));
        let listKey = JSON.parse(props.navigation.getParam('listKey'));

        this.state = {
            taskKey: taskKey,
            name: '',
            duetime: new Date(),
            description: '',
            listKey: listKey,
            isLoading: false,
            isCreateMode: taskKey == -1 ? true : false,
            dateText: 'Due time',
        };

        // date picker
        this.showDatePicker.bind(this);
    }

    componentDidMount() {
        if (this.state.isCreateMode) {
            // create mode
        }
        else {
            // update mode
            // get detail
            this.listService
                .getTask(this.state.taskKey, this.state.listKey)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const task = doc.data();
                        duetime = task.duetime != "" ? task.duetime.toDate() : new Date();
                        this.setState({
                            key: doc.id,
                            name: task.name,
                            duetime: duetime,
                            dateText: duetime.toLocaleDateString("en-US"),
                            description: task.description,
                            isCompleted: task.isCompleted,
                        })
                    }
                })
        }
    }

    // call whenever text input changed
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    // call whenever check box changed
    updateCheckBox = (field) => {
        const state = this.state
        state[field] = !state[field];
        this.setState(state);
    }

    // call once button calendar clicked
    showDatePicker = async (options) => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(options);
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = new Date(year, month, day);
                let newState = {};
                newState['duetime'] = date;
                newState['dateText'] = date.toLocaleDateString("en-US");
                this.setState(newState);
            }
        } catch ({ code, message }) {
            console.warn(`error `, code, message);
        }
    };

    // call once button Save clicked
    saveTask() {
        this.setState({
            isLoading: true,
        });

        if (this.state.isCreateMode) {
            // create mode
            this.listService
                .addTask(
                    this.state.listKey,
                    this.state.name,
                    this.state.duetime,
                    this.state.description,
                )
                .then((docRef) => {
                    // reset form
                    this.setState({
                        name: '',
                        duetime: new Date(),
                        description: '',
                        isLoading: false,
                    });

                    // navigate to ListDetails screen
                    this.props.navigation.navigate(
                        'ListDetails',
                        { listKey: this.state.listKey }
                    );
                })
                .catch((error) => {
                    console.log("Error adding document: ", error);
                    this.setState({
                        isLoading: false,
                    });
                });
        }
        else {
            // update mode
            this.listService
                .updateTask(
                    this.state.key,
                    this.state.listKey,
                    this.state.name,
                    this.state.duetime,
                    this.state.description,
                    this.state.isCompleted,
                )
                .then((docRef) => {
                    // reset form
                    this.setState({
                        name: '',
                        duetime: new Date(),
                        description: '',
                        isLoading: false,
                    });

                    // navigate to ListDetails screen
                    this.props.navigation.navigate(
                        'ListDetails',
                        { listKey: this.state.listKey }
                    );
                })
                .catch((error) => {
                    console.log("Error updating document: ", error);
                    this.setState({
                        isLoading: false,
                    });
                });
        }
    }

    // call once button Delete clicked
    deleteTask() {
        Alert.alert(
            'Message',
            'Are you sure you want to delete this task?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.listService
                            .deleteTask(
                                this.state.key,
                                this.state.listKey,
                            )
                            .then(() => {
                                // navigate to ListDetails screen
                                this.props.navigation.navigate(
                                    'ListDetails',
                                    { listKey: this.state.listKey }
                                );
                            })
                            .catch((error) => {
                                console.log("Error deleting document: ", error);
                                this.setState({
                                    isLoading: false,
                                });
                            });
                    }
                },
            ],
            { cancelable: false },
        );
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
                    <TextInput
                        style={GlobalStyles.textInput}
                        placeholder={'Task name'}
                        value={this.state.name}
                        onChangeText={(text) => this.updateTextInput(text, 'name')}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={GlobalStyles.textInput}
                        placeholder={'Due time'}
                        value={this.state.dateText}
                        style={{ flex: 4 }}
                    />
                    <Button
                        icon={{ name: 'calendar', type: 'font-awesome', color: "#fff" }}
                        onPress={() => this.showDatePicker({ date: this.state.duetime })}
                        style={{ flex: 1 }}
                        buttonStyle={{backgroundColor: '#115737'}}
                    />
                </View>
                <View>
                    <TextInput
                        style={GlobalStyles.textArea}
                        placeholder={'Description'}
                        value={this.state.description}
                        onChangeText={(text) => this.updateTextInput(text, 'description')}
                        multiline={true}
                    />
                </View>
                {!this.state.isCreateMode &&
                    <View style={{ marginBottom: 10 }}>
                        <CheckBox
                            title='Is completed'
                            checked={this.state.isCompleted}
                            onPress={() => this.updateCheckBox("isCompleted")}
                        />
                    </View>
                }
                <View>
                    <Button
                        large
                        title='Save'
                        onPress={() => this.saveTask()}
                        buttonStyle={{backgroundColor: '#115737'}}
                    />
                </View>
                {!this.state.isCreateMode &&
                    <View>
                        <Button
                            large
                            title='Delete'
                            onPress={() => this.deleteTask()}
                            type="Outline"
                            titleStyle={{ color: 'red' }}
                        />
                    </View>
                }
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
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    }
})

export default TaskDetailScreen;