import { useRef, useEffect, useCallback } from "react"

export const useDebounce = (fn: Function, delay: number = 500, dep: any[] = []) => {

  const { current } = useRef({fn, timer: null} as {fn: Function, timer: any})
  useEffect(() => {
    current.fn = fn
  }, [fn, current.fn])

  return useCallback((params: any) => {
    if (current.timer) {
      clearTimeout(current.timer)
    }

    current.timer = setTimeout(() => {
      current.fn(params)
    }, delay);
  }, [delay, current])
}


export const useThrottle = (fn: Function, delay: number = 500, dep: any[] = []) => {

  const { current } = useRef({fn, flag: true} as {fn: Function, flag: boolean})
  useEffect(() => {
    current.fn = fn
  }, [fn, current.fn])

  return useCallback((params: any) => {
    if (!current.flag) return

    current.flag = true
    setTimeout(function (...args) {
      current.fn(params)
      current.flag = true
    }, delay)

  }, [delay, current])
}