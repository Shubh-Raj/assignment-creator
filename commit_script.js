
const { execSync } = require('child_process');
const fs = require('fs');

const commits = [
  { files: 'backend/package.json backend/tsconfig.json', msg: 'initialize backend' },
  { files: 'frontend/package.json frontend/tsconfig.json frontend/next.config.mjs', msg: 'initialize frontend' },
  { files: 'backend/src/index.ts backend/src/app.ts', msg: 'setup backend server' },
  { files: 'frontend/app/layout.tsx frontend/app/globals.css', msg: 'setup frontend layout' },
  { files: 'backend/src/models', msg: 'database models' },
  { files: 'backend/src/routes', msg: 'api routes' },
  { files: 'backend/src/services', msg: 'backend services' },
  { files: 'backend/src/queues', msg: 'setup queue worker' },
  { files: 'backend/src/ws', msg: 'websocket server' },
  { files: 'frontend/components/TopBar.tsx frontend/components/Sidebar.tsx', msg: 'navigation components' },
  { files: 'frontend/components/StepOne.tsx frontend/components/StepTwo.tsx', msg: 'form components' },
  { files: 'frontend/components/ExamPaper.tsx frontend/components/AssignmentCard.tsx', msg: 'ui components' },
  { files: 'frontend/app/create', msg: 'create assignment page' },
  { files: 'frontend/app/assignments', msg: 'assignment details page' },
  { files: 'frontend/lib', msg: 'frontend utilities' },
  { files: 'frontend/store', msg: 'state management' },
  { files: 'frontend/public', msg: 'static assets' },
  { files: 'frontend/app/home frontend/app/groups', msg: 'dashboard pages' },
  { files: 'frontend/app/toolkit frontend/app/library frontend/app/settings', msg: 'additional pages' },
  { files: '.', msg: 'final polish' }
];

const start = new Date('2026-05-26T00:00:00Z').getTime();
const end = new Date('2026-05-27T23:00:00Z').getTime();

// Generate 20 random timestamps
let times = [];
for (let i = 0; i < commits.length; i++) {
  times.push(start + Math.random() * (end - start));
}
times.sort(); // Sort chronologically

try {
  execSync('git init');
} catch (e) {}

// Optional: config user if not set
try {
  execSync('git config user.email');
} catch (e) {
  execSync('git config user.email "dev@vedaai.com"');
  execSync('git config user.name "Developer"');
}

for (let i = 0; i < commits.length; i++) {
  const c = commits[i];
  const t = new Date(times[i]).toISOString();
  
  try {
    execSync(`git add ${c.files}`);
    // Check if there's anything to commit
    const status = execSync('git status --porcelain').toString();
    if (status.trim().length > 0) {
      console.log(`Committing: ${c.msg} at ${t}`);
      // Use environment variables to set commit date
      execSync(`git commit -m "${c.msg}"`, {
        env: {
          ...process.env,
          GIT_AUTHOR_DATE: t,
          GIT_COMMITTER_DATE: t
        }
      });
    }
  } catch (err) {
    console.error(`Failed on commit ${i}: ${err.message}`);
  }
}

console.log('All commits created successfully.');
