import React, { Component } from 'react';
import { FlatList, Image, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { Card, CardItem, Text, Body, Left, Right, Badge } from 'native-base';
import Axios from 'axios';
import { BASE_URL_IMG, API_KEY, TV } from '@api/constants';
import { styles } from '../components/indexStyle';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefreshing: false,
      page: 1,
      keyword: '',
      data: [
        // {id: 4213, name: 'Thieves of the Wood', first_air_date: '2020-01-02', vote_average: 5.3, poster_path: 'https://image.tmdb.org/t/p/w500/jQNOzoiaIQWxJAx8OUighnvnhRA.jpg'},
        // {id: 123, name: 'Of the Wood', first_air_date: '2020-05-02', vote_average: 5.1, poster_path: 'https://image.tmdb.org/t/p/w500/jQNOzoiaIQWxJAx8OUighnvnhRA.jpg'},
        // {id: 4212413, name: 'Thieves Wood', first_air_date: '2020-01-08', vote_average: 5.9, poster_path: 'https://image.tmdb.org/t/p/w500/jQNOzoiaIQWxJAx8OUighnvnhRA.jpg'},
        // {id: 4223413, name: 'Of the Wood', first_air_date: '2020-05-02', vote_average: 5.1, poster_path: 'https://image.tmdb.org/t/p/w500/jQNOzoiaIQWxJAx8OUighnvnhRA.jpg'},
        // {id: 4212313, name: 'Thieves Wood', first_air_date: '2020-01-08', vote_average: 5.9, poster_path: 'https://image.tmdb.org/t/p/w500/jQNOzoiaIQWxJAx8OUighnvnhRA.jpg'},
      ]
    };
  }

  componentDidMount() {
    this.getTvPopular();
  }

  getTvPopular() {
    let params = {
      api_key: API_KEY,
      page: this.state.page,
    };

    Axios.get(TV.POPULAR, {params: params}).then((response) => {
      if (response.status == 200 && response.data.hasOwnProperty('results')) {
        this.setState({ data: [...this.state.data, ...response.data.results] },
          () => {
            this.setState({ isLoading: false, isRefreshing: false })
          }
        );
      }
    }).catch(err => {
      console.log(`GET TV POPULAR: ${JSON.stringify(err.response)}`)
      this.setState({ isLoading: false, isRefreshing: false });
    });
  }

  _handleRefresh = () => {
    this.setState({
        page: 1,
        data: [],
        isRefreshing: true,
        isEndOfContent: false
    }, () => {
        this.getTvPopular();
    })
  }

  cardItem = item => {
    return (
      <TouchableWithoutFeedback style={styles.card} onPress={() => this.props.navigation.navigate('Detail', { id: item.id })}>
        <Card style={styles.card}>
          <CardItem cardBody style={styles.cardItemTop}>
            <Image source={{uri: `${BASE_URL_IMG}/w500${item.poster_path}`}} style={[styles.cardItemTop, {height: 150, flex: 1}]}/>
          </CardItem>
          <CardItem style={styles.cardItemBottom}>
            <Left>
              <Body>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.note} note>{item.first_air_date}</Text>
              </Body>
            </Left>
            <Right>
              <Badge style={{backgroundColor: '#5DAF01'}}>
                <Text style={styles.note}>{item.vote_average}</Text>
              </Badge>
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={this.state.data}
          renderItem={({item}) => this.cardItem(item)}
          refreshing={this.state.isRefreshing}
          onRefresh={() => this._handleRefresh()}
        />
      </SafeAreaView>
    );
  }
}

export default Home;