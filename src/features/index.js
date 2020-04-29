import * as React from 'react';
import { Button, View, Text } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Page</Text>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Detail', { tvId: 7703 })}
      />
    </View>
  );
}

export {HomeScreen};