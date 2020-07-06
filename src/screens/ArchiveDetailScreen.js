import React, { Component } from 'react';
import {View,FlatList} from 'react-native';
import { Text, Card, Button,ListItem } from 'react-native-elements';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import ListService from '../services/ListService';

class ArchiveDetailScreen extends Component{
    static navigationOptions = {
        title: 'Archived Details',
    };

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        let listkey = JSON.parse(navigation.getParam('listKey'));
        
        this.listService = new ListService();
        this.state = {
            isLoading: true,
            tasks: {},
            name:'',
            duetime:'',
            description:'',
            listkey: listkey
        };
    }

      //task part
      onCollectionUpdate = (querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
        const { name, duetime,description } = doc.data();
          tasks.push({
          key: doc.id,
          doc, // DocumentSnapshot
          name,
          duetime,
          description
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

      render(){
        if (this.state.isLoading) {
            return (
                <CustomActivityIndicator />
            )
        }
        return (
            <View>
            <Card title="Tasks">    
                 <View>
                 <FlatList 
                    data={this.state.tasks} 
                    renderItem = {({item}) =>
                    <ListItem 
                       key={item.key}
                       title ={ item.name }
                    />
                    } />
                 </View>
            </Card>
            </View>
        ) 
      }
}

export default ArchiveDetailScreen;