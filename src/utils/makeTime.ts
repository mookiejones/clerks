import moment from 'moment';
const makeTime = (value:any) => {
    const m = moment(value);

    const formatted= m.format('yyyy-MM-DDThh:mm')
   
    return formatted;
  }

  export default makeTime;