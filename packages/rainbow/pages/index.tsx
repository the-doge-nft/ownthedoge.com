import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {HelloWorld} from "dsl/src";
import Button from "dsl/src/Button/Button";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HelloWorld />
          <Button>Hello there!</Button>
          {/*<div className={css("text-meme-red", "text-3xl")}>test this out!</div>*/}
      </main>
    </div>
  )
}

export default Home
