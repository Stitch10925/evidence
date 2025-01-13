import {describe, it, expect} from 'vitest';
import child_process from "child_process";

const allowedTimeout = process.env.GITHUB_ACTIONS ? 10000 : 5000

if (process.env.GITHUB_ACTIONS) {
	console.log("Running on GitHub Actions")
}

describe("Dev Server Startup", () => {
	it("Should start the dev server", async () => {
		const proc = child_process.spawn('npm', ['run', 'dev'], { stdio: 'pipe' })
		const done = new Promise((resolve) => {
			proc.on('close', resolve)
			proc.on('exit', resolve)
		})

		proc.stdout.on('data', (data) => {
			const message = data.toString()
			console.log(message)
			
			const regex = /VITE v[0-9]+\.[0-9]+\.[0-9]+\s+ready in [\d]+ ms/g
			// console.log(regex.exec("VITE v5.4.11  ready in 1381 ms"))
			if (regex.exec(message)) {
				proc.kill()
				expect(true).toBe(true)
				console.log("End state reached")
			}
		})

		await done
		// dev server should start within 5 seconds
	}, { timeout: allowedTimeout })
})