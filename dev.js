const { spawn } = require('child_process');
const path = require('path');

console.log('====================================================');
console.log('🌱 Starting AGverse Full-Stack (Vite + Laravel)');
console.log('====================================================\n');

// 1. Start Vite Client on user port 5050 (proxying /api, /admin, /cms-media to Laravel 8000)
const clientProcess = spawn('npm', ['run', 'dev', '--prefix', 'client'], {
  stdio: 'inherit',
  shell: true
});

// 2. Start Laravel Backend on internal port 8000
const backendProcess = spawn('php', [
  '-d', 'upload_max_filesize=50M', '-d', 'post_max_size=52M',
  '-S', '127.0.0.1:8000', path.resolve(__dirname, 'backend/vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php'),
], {
  cwd: path.join(__dirname, 'backend', 'public'),
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

backendProcess.on('error', (error) => console.error(`Could not start Laravel: ${error.message}`));

const cleanup = () => {
  console.log('\nStopping servers...');
  clientProcess.kill();
  backendProcess.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
