import moment from "moment";

const convertDate = (stringDate) => {
  const date = new Date(stringDate)
  return moment(date).format('ll');
}

export { convertDate }