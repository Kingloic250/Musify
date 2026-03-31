const { execSync } = require('child_process');
const fs = require('fs');
try {
  execSync('npm run build', { encoding: 'utf8', stdio: 'pipe' });
  fs.writeFileSync('build_result.txt', 'Build succeeded');
} catch (e) {
  fs.writeFileSync('build_result.txt', e.stdout + '\n' + e.stderr);
}
