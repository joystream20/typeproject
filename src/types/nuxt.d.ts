import { NuxtApp } from "#app"

declare module '#app' {
  interface NuxtApp {
    $formatDate: (date: string | Date, format: string) => string
  }
}
