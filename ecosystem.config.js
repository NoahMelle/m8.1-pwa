module.exports = {
  apps : [
	          {
            name: "loveu_festival",
            script: "bun",
            args: "run start",
            env: {
                NODE_ENV: "production",
                PORT: 3003,
            },
        },
  ]
}
