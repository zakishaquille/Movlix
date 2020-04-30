import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  padder: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  card: {
    fontFamily: "Roboto",
    borderRadius: 15,
  },
  cardItemTop: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  cardItemBottom: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  title: {
    fontFamily: "Roboto_Bold"
  },
  note: {
    fontFamily: "Roboto",
    fontSize: 12
  },
  searchInput: {
    paddingHorizontal: 15,
    backgroundColor: '#DFDFDF',
    opacity: 0.4,
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    fontFamily: "Roboto",
    fontSize: 13
  },
})

export {styles}