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

const cmsProcess = spawn('php', [
  '-d', 'upload_max_filesize=50M', '-d', 'post_max_size=52M',
  '-S', '127.0.0.1:8000', path.resolve(__dirname, 'backend/vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php'),
], {
  cwd: path.join(__dirname, 'backend', 'public'),
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

cmsProcess.on('error', (error) => console.error(`Could not start Laravel: ${error.message}`));

const cleanup = () => {
  console.log('\nStopping servers...');
  serverProcess.kill();
  clientProcess.kill();
  cmsProcess.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
