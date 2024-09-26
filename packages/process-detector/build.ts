await Bun.build({
	entrypoints: ["./src/index.ts", "./src/detector.ts"],
	outdir: "./dist",
})
