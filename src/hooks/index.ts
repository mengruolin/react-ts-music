import { useRef, useEffect, useCallback } from "react"

export const useDebounce = (fn: Function, delay: number = 500, dep: [] = []) => {

  const { current } = useRef({fn, timer: null} as {fn: Function, timer: any})
  useEffect(() => {
    current.fn = fn
  }, [fn])

  return useCallback(() => {
    if (current.timer) {
      clearTimeout(current.timer)
    }

    current.timer = setTimeout((...args: any[]) => {
      current.fn.call(null, ...args)
    }, delay);
  }, dep)
}


export const useThrottle = (fn: Function, delay: number = 500, dep: [] = []) => {

  const { current } = useRef({fn, flag: true} as {fn: Function, flag: boolean})
  useEffect(() => {
    current.fn = fn
  }, [fn])

  return useCallback((...args: any[]) => {
    if (!current.flag) return

    current.flag = true
    setTimeout(function (...args) {
      current.fn.call(null, args)
      current.flag = true
    }, delay)

  }, dep)
}