import {DECREMENT, DECREMENT_TYPE, INCREMENT, INCREMENT_TYPE} from '../const'

export interface IINCREMENTAction {
  type: INCREMENT_TYPE;
}

export interface IDECREMENTAction {
  type: DECREMENT_TYPE;
}

// 定义 modifyAction 类型，包含 IINCREMENTAction 和 IDECREMENTAction 接口类型
export type ModifyAction = IINCREMENTAction | IDECREMENTAction;


// 增加 state 次数的方法
export const increment = (): IINCREMENTAction => ({
  type: INCREMENT,
})

// 减少 state 次数的方法
export const decrement = (): IDECREMENTAction => ({
  type: DECREMENT
})