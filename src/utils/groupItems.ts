import _ from 'lodash';

interface props {
    data:any;
    key:string;
}

const groupItems = (value:props) =>

{
    const items = value.data;
 
    const key = value.key;
    return _.groupBy(items,key);
}
  
export default groupItems;