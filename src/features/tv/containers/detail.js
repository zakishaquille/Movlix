import React, { Component } from 'react';
import { FlatList, Image, TouchableWithoutFeedback, SafeAreaView, View, ScrollView } from 'react-native';
import { Text, Badge, Spinner, Icon, List, ListItem, Left, Body, Thumbnail, H2, H3 } from 'native-base';
import Axios from 'axios';
import { BASE_URL_IMG, API_KEY, TV } from '@api/constants';
import { convertDate, getYear } from '@api/helpers';
import { styles } from '../components/indexStyle';

class Detail extends Component {
  tvId = 0;

  constructor(props) {
    super(props);

    this.tvId = props.route.params.id;
    this.state = {
      isLoading: true,
      data: null
    };
  }

  componentDidMount() {
    this.getDetailTv();
  }

  getDetailTv = () => {
    let params = {
      api_key: API_KEY
    };

    Axios.get(`${TV.DETAIL}/${this.tvId}`, {params: params}).then((response) => {
      this.setState({
        data: response.data,
        isLoading: false
      });
    }).catch(err => {
      console.log(`GET DETAIL TV: ${JSON.stringify(err)}`)
      this.setState({ isLoading: false });
    });
  }

  renderContent = () => {
    return (
      <View>
        <ScrollView>
        <Image source={{uri: `${BASE_URL_IMG}/w500${this.state.data.backdrop_path}`}} style={{height: 300}} />
        <View style={{ position: 'absolute', flexDirection: 'row' }}>
          <View size={50} style={{ left: 10, top: 20 }}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <Icon type="MaterialIcons" name="chevron-left" style={{ fontSize: 40, color: 'white' }} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{ fontFamily: 'Roboto', padding: 25 }}>
          <Text style={[styles.note, { marginTop: 10 }]}><Icon type="AntDesign" name="calendar" style={styles.note} /> {convertDate(this.state.data.first_air_date)}</Text>
          <H2 style={[styles.title, { marginTop: 5 }]}>{this.state.data.name}</H2>
          <View style={{ marginTop: 15 }}>
            <Text>{this.state.data.overview}</Text>
          </View>
        </View>

        { this.state.data.hasOwnProperty('seasons') ? this.renderSeasons(this.state.data.seasons) : null }
        </ScrollView>
      </View>
    )
  }

  renderSeasons = data => {
    return (
      <View style={{ fontFamily: 'Roboto', padding: 25 }}>
        <H3 style={styles.title}>Seasons</H3>
        <List>
        {
          data.map(item => { 
            return(this.renderItemSeason(item));
          })
        }
        </List>
      </View>
    )
  }

  renderItemSeason = itemData => {
    return (
      <ListItem style={{flex:1}}>
        <Left style={{flex:1}}>
          {itemData.poster_path !== null ? 
            <Image style={{flex: 1, height: 170}} source={{uri: `${BASE_URL_IMG}/w300${itemData.poster_path}`}} /> 
            : <Thumbnail square source={require('@assets/default-tv-show.png')} />
          }
        </Left>
        <Body style={{flex:2}}>
          <Text style={styles.title}>{itemData.name}</Text>
          <Text note style={styles.note}>{getYear(itemData.air_date)} | {itemData.episode_count} episodes</Text>
          <Text style={styles.note}>{itemData.overview}</Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading ? <Spinner /> : this.renderContent()}
      </SafeAreaView>
    );
  }
}

export default Detail;