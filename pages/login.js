import Page from '../layouts/main'
import Link from 'next/prefetch'
import Head from 'next/head'

import LoginForm from '../components/loginForm'

export default () => (
      <Page>
    <Head>
      <title>Login</title>
    </Head>
  <div>
    <LoginForm />
  </div>
     <style jsx>{`
     .logo2 {
display: none !important;
      }
a[data-jsx="2751678996"] {
    display: none;
}
    `}</style>
    </Page>
)