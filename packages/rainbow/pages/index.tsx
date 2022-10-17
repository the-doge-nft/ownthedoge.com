import type {NextPage} from 'next'
import Head from 'next/head'
import {css} from "dsl/helpers/css";
import Image from "next/image"
import Button from "dsl/src/Button/Button";
import {Divider} from "dsl/src/Divider/Divider";
import {PropsWithChildren, ReactNode} from "react";
import ColoredText from "dsl/src/ColoredText/ColoredText";
import {CampaignTab, Donar, useAppStore} from "../store/app.store";

const Home: NextPage = () => {
  const {swappers, donars, campaignTab} = useAppStore((state) => ({
    swappers: state.swappers,
    donars: state.donars,
    campaignTab: state.campaignTab
  }))
  return (
    <>
      <Head>
        <title>Rainbow x The Doge NFT</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={css("relative", "overflow-hidden", "p-5")}>
        <section className={css("flex", "justify-center", "items-center", "gap-6")}>
          <BirthdayStar/>
          <div className={css("text-center")}>
            <div className={css("text-4xl", "font-bold")}>
              Doge Turns 17!
            </div>
            <div className={css("mt-1")}>(yes {`that's`} right! - this Shiba Inu is turning 84 in human years)</div>
          </div>
          <BirthdayStar/>
        </section>

        <div className={css("flex", "justify-center")}>
          <div className={css("max-w-4xl", "w-full")}>
            <section className={css("text-center", "mt-4")}>
              <div>indicator here</div>
              <div className={css("mt-2")}>
                <Button>
                  <div className={css("text-2xl")}>
                    ✨ DONATE ✨
                  </div>
                </Button>
              </div>
            </section>

            <section
              className={css("text-center", "text-xl", "mt-14", "grid", "grid-cols-1", "lg:grid-cols-2", "gap-8")}>
              <div className={css("flex", "flex-col", "gap-5")}>
                <div className={css("font-bold", "text-3xl")}>
                  About this campaign
                </div>
                <div>
                  {`It's`} Kabosu, the Doge’s 17th Borkday and we- ownthedoge along with Atsuko Sato (Doges Momma),
                  Rainbow, doge
                  pound and NFD need you to help make it Bronze!
                </div>
                <div>
                  We take this initiative to build <ColoredText className={css("font-bold")}>AN IRL KABOSU BRONZE
                  STATUE</ColoredText> in Sakura Park,
                  Japan along with PleasrDAO,
                  Rainbow, Dogecoin Foundation and NFD. As the Doge friends unite for this iconic moment to come in meme
                  history, we call on you to donate to this cause and make Kabosu immortal.
                </div>
                <div>
                  <div>
                    You can donate two ways:
                  </div>
                  <ol>
                    <li>
                      1: Swap for $DOG on Rainbow
                    </li>
                    <li>
                      2: Donate to the cause directly
                    </li>
                  </ol>
                </div>
                <div>
                  Along the way, we’ll be giving out $DOG and many more surprises.
                  Cheers to 17 years of our beloved and many more to come!
                </div>
              </div>
              <div
                className={css("border-dashed", "border-pixels-yellow-200", "border-2", "items-center")}>
                <div className={css("text-start", "flex", "gap-4", "mb-2")}>
                  {Object.keys(CampaignTab).map(key => <span key={`2-${key}`}>{key}</span>)}
                </div>
                <div className={css("flex", "flex-col", "gap-5")}>{donars.map(donar => <DonateItem
                  key={`${donar.txHash}`}
                  item={donar}/>)}</div>
              </div>
            </section>

            <section className={css("flex", "flex-col", "items-center", "mt-14")}>
              <TitleDivider>Rewards</TitleDivider>
              <div className={css("flex", "justify-center", "w-full")}>
                <div className={css("flex", "flex-col", "w-full", "gap-12")}>
                  <div className={css("max-w-xl", "w-full")}>
                    <RewardButton title={"100 Doge Pixels"} description={"Swap for 42,069 $DOG on Rainbow"}/>
                  </div>
                  <div className={css("max-w-xl", "self-end", "w-full")}>
                    <RewardButton title={"60 Doge Pixels"}
                                  description={"Swap for 42,069 $DOG on Rainbow and mint a Doge Pixel"}/>
                  </div>
                  <div className={css("max-w-xl", "w-full")}>
                    <RewardButton title={"20 Doge Pixels"}
                                  description={"Swap for 42,069 $DOG on Rainbow, mints a Doge Pixel, and donates directly to the cause!"}/>
                  </div>
                </div>
              </div>
              <div className={css("font-bold", "mt-12", "text-2xl", "text-center")}>
                All holders of $DOG and Doge Pixels unlock a custom Doge icon on Rainbow!
              </div>
            </section>

            <section className={css("mt-14")}>
              <TitleDivider>Leaderboard</TitleDivider>
              <div>
                <div className={css("text-start", "flex", "gap-4", "mb-2")}>
                  {Object.keys(CampaignTab).map(key => <span key={`1-${key}`}>{key}</span>)}
                </div>
                <div className={css("flex", "flex-col", "gap-6")}>
                  {donars.map(donar => <DonateItem key={`${donar.txHash}`} item={donar}/>)}
                </div>
              </div>
            </section>

            <footer className={css("my-28")}>
              <Divider/>
              <div className={css("grid", "grid-cols-1", "md:grid-cols-2", "my-14")}>
                <div className={css("grid", "grid-cols-2")}>
                  <div className={css("flex", "flex-col")}>
                    <div className={css("font-bold")}>The Doge NFT</div>
                    <div>About</div>
                    <div>Mint Pixels</div>
                    <div>Pixel Perks</div>
                    <div>Aquire</div>
                  </div>
                  <div className={css("flex", "flex-col")}>
                    <div className={css("font-bold")}>Rainbow</div>
                    <div>Download</div>
                    <div>Twitter</div>
                  </div>
                </div>
                <div className={css("flex", "justify-center", "md:justify-end", "mt-8", "md:mt-0")}>
                  <Button>
                    <div className={css("p-2", "max-w-xs", "text-xl")}>Help us build {`Kabosu's`} statue in her
                      hometown.
                    </div>
                  </Button>
                </div>
              </div>
              <Divider/>
            </footer>
          </div>
        </div>

        <div className={css("flex", "justify-center")}>
          <div className={css("absolute", "-bottom-[140px]", "-left-[100px]", "rotate-[30deg]")}>
            <Image src={"/images/doge.png"} height={320.25} width={320.75} layout={"fixed"}/>
          </div>
          <div className={css("flex", "gap-4", "text-xl", "z-10")}>
            <span className={css("font-bold")}>The Doge NFT</span>
            <span>🤝</span>
            <span>
              <Image src={"/images/rainbow-logo.svg"} height={30} width={100}/>
            </span>
          </div>
          <div className={css("absolute", "-bottom-[75px]", "-right-[75px]", "rotate-[270deg]")}>
            <Image src={"/images/rainbow.svg"} width={225} height={225} layout={"fixed"}/>
          </div>
        </div>
      </main>
    </>
  )
}

const BirthdayStar = () => {
  return <div className={css("relative")}>
    <Image src={"/images/star.svg"} width={175} height={175}/>
    <div
      className={css("absolute", "w-full", "h-full", "flex", "justify-center", "items-center", "-top-[7px]", "-right-[6px]")}>
      <div className={css("text-5xl")}>🎂</div>
    </div>
  </div>
}

const RewardButton: React.FC<PropsWithChildren<{ title: string, description: string }>> = ({title, description}) => {
  return <Button block>
    <div className={css("p-1")}>
      <div className={css("text-left", "text-2xl")}>{title}</div>
      <div className={css("font-normal", "text-left", "text-lg")}>{description}</div>
    </div>
  </Button>
}

const TitleDivider: React.FC<PropsWithChildren<{ children: ReactNode }>> = ({children}) => {
  return <div className={css("w-full")}>
    <div className={css("text-2xl", "font-bold", "text-center")}>{children}</div>
    <div className={css("my-4", "w-full")}>
      <Divider/>
    </div>
  </div>
}

const DonateItem: React.FC<PropsWithChildren<{ item: Donar }>> = ({item}) => {
  return <Button block>
    <div className={css("w-full", "p-1")}>
      <div className={css("flex", "justify-between", "text-2xl")}>
        <div>{item.currency}</div>
        <div>+{item.amount}</div>
      </div>
      <div className={css("flex", "justify-between", "items-center", "mt-1")}>
        <div className={css("font-normal")}>{item.ens}</div>
        <Pill type={"donation"}/>
      </div>
    </div>
  </Button>
}

const donationStyle = css("bg-doge-orange")
const swapStyle = css("bg-doge-blue")

const Pill: React.FC<PropsWithChildren<{ type: "donation" | "swap" }>> = ({type}) => {
  return <span
    style={{borderWidth: "1px"}}
    className={css("inline-block", "font-normal", "text-sm", "border-black", "rounded-full", "px-2", "py-0.5", {
      [donationStyle]: type === "donation",
      [swapStyle]: type === "swap"
    })}>
    {type === "donation" ? "donation" : "🌈 swap"}
  </span>
}

export default Home
