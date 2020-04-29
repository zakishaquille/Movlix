import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1
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
    fontFamily: "Roboto_Bold",
  },
  note: {
    fontFamily: "Roboto",
    fontSize: 12
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#DFDFDF',
    opacity: 0.4,
    marginBottom: 20
  },
})

export {styles}