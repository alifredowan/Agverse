const { spawn } = require('child_process');
const path = require('path');

console.log('====================================================');
console.log('🌱 Starting AGverse Full-Stack on Port 5050');
console.log('====================================================\n');

// 1. Start Server on internal port 5001
const serverProcess = spawn('npm', ['run', 'dev', '--prefix', 'server'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: '5001' }
});

// 2. Start Vite Client on user port 5050 (proxying /api to 5001)
const clientProcess = spawn('npm', ['run', 'dev', '--prefix', 'client'], {
  stdio: 'inherit',
  shell: true
});

const cleanup = () => {
  console.log('\nStopping servers...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
