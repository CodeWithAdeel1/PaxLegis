require('./load-env');

const readline = require('readline');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

function ask(question) {
  const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => terminal.question(question, (answer) => {
    terminal.close();
    resolve(answer);
  }));
}

function askHidden(question) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || !process.stdout.isTTY) {
      reject(new Error('Run this command in an interactive terminal so the password is not echoed.'));
      return;
    }

    process.stdout.write(question);
    let password = '';
    const input = process.stdin;
    input.setEncoding('utf8');

    const finish = (error) => {
      input.removeListener('data', onData);
      input.setRawMode(false);
      input.pause();
      process.stdout.write('\n');
      if (error) reject(error);
      else resolve(password);
    };

    const onData = (chunk) => {
      for (const key of chunk) {
        if (key === '\u0003') {
          finish(new Error('Password entry cancelled.'));
          return;
        }
        if (key === '\r' || key === '\n') {
          finish();
          return;
        }
        if (key === '\u007f' || key === '\b') {
          if (password.length) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          continue;
        }
        if (key >= ' ') {
          password += key;
          process.stdout.write('*');
        }
      }
    };

    try {
      input.setRawMode(true);
      input.resume();
      input.on('data', onData);
    } catch (error) {
      reject(new Error(`Could not read the password securely: ${error.message}`));
    }
  });
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
  const username = (process.argv[2] || await ask('Admin username: ')).trim().toLowerCase();
  if (!/^[a-z0-9._-]{3,80}$/.test(username)) {
    throw new Error('Use a username of 3-80 characters: letters, numbers, dot, underscore or hyphen.');
  }

  const password = await askHidden('Admin password (minimum 10 characters): ');
  if (password.length < 10) throw new Error('Password must be at least 10 characters.');
  const passwordHash = await bcrypt.hash(password, 12);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    await pool.query(
      `INSERT INTO admin_users (username, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      [username, passwordHash]
    );
    console.log(`Admin account "${username}" is ready.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(`Could not create admin account: ${error.message}`);
  process.exitCode = 1;
});
