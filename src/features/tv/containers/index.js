import React, { Component } from 'react';
import { FlatList, Image, TouchableWithoutFeedback, SafeAreaView, View } from 'react-native';
import { Card, CardItem, Text, Body, Left, Right, Badge, Spinner, Item, Input, Icon } from 'native-base';
import Axios from 'axios';
import { BASE_URL_IMG, API_KEY, TV } from '@api/constants';
import { convertDate } from '@api/helpers';
import { styles } from '../components/indexStyle';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefreshing: false,
      isEndItem: false,
      page: 1,
      keyword: '',
      data: []
    };
  }

  componentDidMount() {
    this.getTvPopular();
  }

  getTvPopular = () => {
    let params = {
      api_key: API_KEY,
      page: this.state.page,
    };

    Axios.get(TV.POPULAR, {params: params}).then((response) => {
      this.setState({
        data: [...this.state.data, ...response.data.results],
        isLoading: false,
        isRefreshing: false
      });
    }).catch(err => {
      console.log(`GET TV POPULAR: ${JSON.stringify(err.response)}`)
      this.setState({ isLoading: false, isRefreshing: false, isEndItem: true });
    });
  }

  handleRefresh = () => {
    this.setState({
        page: 1,
        data: [],
        isRefreshing: true,
        isEndItem: false
    }, () => {
        this.getTvPopular();
    })
  }

  handleLoadMore = () => {
    if (this.state.isEndItem === false) {
      this.setState(prevState => ({
          page: prevState.page + 1,
          isLoading: true
        }),
        () => {
          this.getTvPopular();
        }
      );
    }
  };

  cardItem = item => {
    return (
      <TouchableWithoutFeedback style={styles.card} onPress={() => this.props.navigation.navigate('Detail', { id: item.id })}>
        <Card style={styles.card}>
          <CardItem cardBody style={styles.cardItemTop}>
            <Image source={{uri: `${BASE_URL_IMG}/w500${item.backdrop_path}`}} style={[styles.cardItemTop, {height: 160, flex: 1}]}/>
          </CardItem>
          <CardItem style={styles.cardItemBottom}>
            <Left>
              <Body>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.note} note>{convertDate(item.first_air_date)}</Text>
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

  renderFooter = () => {
    if (!this.state.isLoading) return null;

    return (
      <Spinner />
    );
  };

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={this.state.data}
          renderItem={({item}) => this.cardItem(item)}
          refreshing={this.state.isRefreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={() => (
            <Item rounded style={styles.searchInput}>
              <Input style={styles.input} placeholder='Search here...'/>
              <Icon name='search' />
            </Item>
          )}
          ListFooterComponent={this.renderFooter}
        />
      </SafeAreaView>
    );
  }
}

export default Home;