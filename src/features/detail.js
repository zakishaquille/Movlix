import * as React from 'react';
import { View, Text } from 'react-native';

const DetailScreen = ({route}) => {
  const { tvId } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Page</Text>
      <Text>{tvId}</Text>
    </View>
  );
}

export {DetailScreen};