// NodeJS own process module to read from stdin
import process from 'process'
// Import a design (aaron is our go-to example but any will do)
import { Aaron } from '@freesewing/aaron'
// import the theme plugin, this will add styling to the SVG
// Create your own if you'd like to apply your own branding
import { pluginTheme as theme } from '@freesewing/plugin-theme'

// Create an array to push our input onto
const input = []

// Setup stdin
process.stdin.resume()
process.stdin.setEncoding('utf-8')

// Read data
process.stdin.on('data', chunk => input.push(chunk))

// Ready, now do something with it
process.stdin.on('end', () => {
  // Join chunks into a string and parse as JSON
  const settings = JSON.parse(input.join())

  // Create the pattern using the settings from STDIN
  const pattern = new Aaron(settings)
    .use(theme)
    .draft()

  const svg = pattern.render()

  // SVG holds a string, dump it to stdout
  console.log(svg)
})
