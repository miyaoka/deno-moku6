import { parse } from 'https://deno.land/std@v0.20.0/flags/mod.ts'
import { resolve } from 'https://deno.land/std@v0.20.0/fs/path/mod.ts'

type Flags = {
  c?: boolean
  isCapital?: boolean
}
type Config = {
  isCapital?: boolean
}

const dec = new TextDecoder()

const defaultConfig: Config = {
  isCapital: false
}

const getConfigData = () => {
  const configPath = Deno.env()['CONFIG_PATH'] || './config.json'
  try {
    return Deno.readFileSync(resolve(configPath))
  } catch (e) {
    return undefined
  }
}

const getConfigFromCli = (): Config => {
  const f = parse(Deno.args) as Flags

  const config = {
    isCapital: f.c || f.isCapital
  }

  return Object.entries(config).reduce((acc, [key, value]) => {
    if (value === undefined) return acc
    return {
      ...acc,
      [key]: value
    }
  }, {})
}

const getConfigFromFile = () => {
  const configData = getConfigData()
  if (!configData) return null

  const configStr = dec.decode(configData)
  return JSON.parse(configStr) as Config
}

export const getConfig = () => {
  return {
    ...defaultConfig,
    ...getConfigFromFile(),
    ...getConfigFromCli()
  }
}
