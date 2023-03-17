// node codegen-setup-token.ts {AUTH_TOKEN}
const { exec } = require('child_process');
const token = process.argv[2];
if (!token) {
    console.error('Missing auth token argument');
    process.exit(1);
}
process.env.AUTH_TOKEN = token;

const codegenCommand = 'npx graphql-codegen --config codegen.ts';
const options = {
    cwd: __dirname,
    env: process.env,
};
exec(codegenCommand, options, (err, stdout, stderr) => {
    if (err) {
        console.error('Failed to run codegen command:', err);
        process.exit(1);
    }

    console.log('Codegen command completed successfully');
});
