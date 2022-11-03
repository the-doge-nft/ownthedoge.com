import { css } from "dsl/helpers/css";
import { Head, Html, Main, NextScript } from 'next/document';
import { isProd } from "../environment/vars";


export const toastifyPortalId = "react-toastify-portal"

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Bronze The Doge</title>
        <meta
          name="description"
          content="Help us raise funds to build Kabosu a statue in Japan."
          key="desc"
        />
        <meta property="og:site_name" content="Bronze The Doge"/>
        <meta property="og:title" content="Bronze The Doge"/>
        <meta property="og:description" content="Help us raise funds to build Kabosu a statue in Japan."/>
        <meta property="og:image" content="/images/twitter-card.png"/>
        <meta property="og:url" content={isProd() ? "https://bronzethedoge.xyz" : "https://dev.bronzethedoge.xyz"}/>
        <meta name="twitter:title" content="Bronze The Doge"/>
        <meta name="twitter:description" content="Help us raise funds to build Kabosu a statue in Japan."/>
        <meta name="twitter:image" content="/images/twitter-card.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@bronzethedoge"/>
      </Head>
      <body className={css("font-ComicNeue")} style={{
        backgroundImage: `url(/images/doge-tiled.png)`,
        }}>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}
