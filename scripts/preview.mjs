import { spawn } from 'node:child_process'

const HOST = process.env.HOST ?? '0.0.0.0'
const PORT = process.env.PORT ?? '3000'

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
      }
    })
  })

const main = async () => {
  await run('npx', ['next', 'build'])
  await run('npx', ['next', 'start', '--hostname', HOST, '--port', PORT])
}

main().catch((error) => {
  console.error('\nPreview failed:', error.message)
  process.exit(1)
})
