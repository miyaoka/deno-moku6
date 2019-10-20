import { getConfig } from './config.ts'

const main = () => {
  const config = getConfig()
  if (config.isCapital) {
    console.log('HELLO WORLD')
    return
  }
  console.log('hello world')
}
main()
