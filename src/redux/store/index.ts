import { createStore } from 'redux'

const tiger = 1000;
const reducer = (state = tiger, action: any) => {
  switch (action.type){
    case '涨工资': 
      return state += 100;
    case '扣工资': 
      return state -= 100;
    default: 
      return state;
  }
}

const store = createStore(reducer)
export default store