import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {HelloWorld} from "dsl/src";
import Button, {ButtonType} from "dsl/src/Button/Button";
import {css} from "dsl/helpers/css";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Rainbow x The Doge NFT</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={css("mb-4")}>
                    <Button>🌈🌈🌈🌈</Button>
                </div>
              <div className={css("text-4xl", "mt-2", "text-pixels-yellow-200", "font-bold")}>
                Rainbow x The Doge NFT
              </div>
            </main>
        </div>
    )
}

export default Home
