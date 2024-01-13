'use client';

import { SimpleLoginForm } from './components/SimpleLoginForm';
import styles from './login.module.css';

export default function Login() {
  return (
    <main className={styles.main}>
      <SimpleLoginForm />
    </main>
  );
}
