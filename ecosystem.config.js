module.exports = {
  apps : [
	          {
            name: "LoveU Festival",
            script: "bun",
            args: "run start",
            env: {
                NODE_ENV: "production",
                PORT: 3003,
            },
        },
  ]
}
