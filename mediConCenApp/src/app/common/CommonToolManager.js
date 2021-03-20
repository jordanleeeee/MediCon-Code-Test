import moment from 'moment';

const CommonToolsManager = {
  praseTime(time, format){
    return moment(time).format(format)
  }
}

export default CommonToolsManager