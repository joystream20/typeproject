
import { defineNuxtPlugin } from "#app"
import dayjs from "dayjs"


export default defineNuxtPlugin((nuxtApp) => {
  const formatDate = (date:string | Date, format:string):string => {
    return dayjs(date).format(format)
  }

  nuxtApp.provide("formatDate", formatDate)
})
