import React, { Component } from 'react';
import { FlatList, Image, TouchableWithoutFeedback, SafeAreaView, View } from 'react-native';
import { Text, Badge } from 'native-base';
import Axios from 'axios';
import { BASE_URL_IMG, API_KEY, TV } from '@api/constants';
import { styles } from '../components/indexStyle';

class Detail extends Component {
  tvId = 0;

  constructor(props) {
    super(props);

    this.tvId = props.route.params.id;
    this.state = {
      isLoading: true,
      data: {}
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Detail Page</Text>
        <Text>{this.tvId}</Text>
      </View>
    );
  }
}

export default Detail;