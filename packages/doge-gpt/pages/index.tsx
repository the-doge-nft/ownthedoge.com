import { Comic_Neue } from "@next/font/google";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import { css } from "dsl/helpers/css";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import { create } from "zustand";

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
});

export default function Home() {
  const [value, setValue] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const store = useStore();
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    query();
  };

  const query = () => {
    if (value !== "") {
      store.post(value).finally(() => {
        lastMessageRef.current?.scrollIntoView();
      });
      setValue("");
    }
  };

  useEffect(() => {
    const scrollToMostRecent = () => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToMostRecent();
  }, [store.prompts]);

  return (
    <>
      <Head>
        <title>DogeGPT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={css(
          "p-6",
          "flex",
          "justify-center",
          "grow",
          "bg-center",
          "bg-repeat",
          comicNeue.className
        )}
      >
        <div className={css("max-w-3xl", "w-full", "flex", "flex-col")}>
          <div
            className={css(
              "flex",
              "gap-2",
              "items-center",
              "justify-center",
              "p-4",
              "relative"
            )}
          >
            <ColoredText
              bold
              className={css("text-3xl", "md:text-5xl", "z-10")}
            >
              ✨ DogeGPT ✨
            </ColoredText>
            <OpactityBg />
          </div>
          <div className={css("grow", "mt-4", "flex", "flex-col")}>
            <div className={css("grow", "flex", "flex-col", "p-4", "relative")}>
              <div
                className={css(
                  "grow",
                  "rounded-2xl",
                  "flex",
                  "flex-col",
                  "z-10",
                  "gap-4",
                  "h-[1px]",
                  "overflow-y-auto"
                )}
              >
                {store.prompts.map((item, index, arr) => (
                  <div
                    key={`${item.prompt}-${index}`}
                    ref={arr.length - 1 === index ? lastMessageRef : undefined}
                  >
                    <div
                      className={css(
                        "p-3",
                        "bg-pixels-yellow-200",
                        "rounded-2xl",
                        "md:mr-24",
                        "mr-4"
                      )}
                    >
                      {item.prompt}
                    </div>
                    <div
                      className={css(
                        "p-3",
                        "bg-white",
                        "rounded-2xl",
                        "md:ml-24",
                        "ml-4",
                        "mt-4"
                      )}
                    >
                      {item.isLoading ? (
                        <PulseLoader size={6} color={"#d2cbbb"} />
                      ) : (
                        <div>
                          <div>{item.response}</div>
                          <div
                            className={css(
                              "text-xs",
                              "text-right",
                              "text-pixels-yellow-400",
                              "mt-0.5"
                            )}
                          >
                            {item.date.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {store.prompts.length === 0 && (
                  <div
                    className={css(
                      "w-full",
                      "h-full",
                      "flex",
                      "justify-center",
                      "items-center"
                    )}
                  >
                    <Link href={"https://ownthedoge.com"} target="_blank">
                      <div className={css("text-pixels-yellow-300", "text-xl")}>
                        ownthedoge.com
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <OpactityBg />
            </div>
            <div className={css("mt-2")}>
              <form onSubmit={handleFormSubmit}>
                <div
                  className={css(
                    "w-full",
                    "px-4",
                    "py-3",
                    "outline-none",
                    "bg-[#efe8d3]",
                    "rounded-2xl",
                    "font-bold",
                    "flex",
                    "items-center",
                    "gap-4"
                  )}
                >
                  <input
                    name={"search"}
                    className={css(
                      "grow",
                      "bg-[#efe8d3]",
                      "outline-none",
                      "placeholder:text-pixels-yellow-400"
                    )}
                    placeholder={"wow, you can ask me anything"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button
                    className={css(
                      "rounded-2xl",
                      "hover:bg-pixels-yellow-300",
                      "px-3",
                      "py-1.5"
                    )}
                    onClick={query}
                  >
                    doge
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const OpactityBg = () => {
  return (
    <div
      className={css(
        "absolute",
        "inset-0",
        "w-full",
        "h-full",
        "opacity-90",
        "rounded-2xl",
        "bg-pixels-yellow-100"
      )}
    />
  );
};

interface Store {
  prompts: {
    prompt: string;
    response?: string;
    date: Date;
    id: number;
    isLoading: boolean;
  }[];
  post: (prompt: string) => Promise<any>;
}

const useStore = create<Store>((set) => ({
  prompts: [],
  post: async (prompt: string) => {
    try {
      const id = Math.random();
      set((prev) => ({
        prompts: [
          ...prev.prompts,
          { prompt, date: new Date(), isLoading: true, id },
        ],
      }));

      const prodBaseUrl = "https://doge-gpt-cea4f69d8b2b.herokuapp.com";
      const res = await fetch(`${prodBaseUrl}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (res.ok) {
        const { data } = await res.json();
        set((prev) => {
          const prompts = [...prev.prompts];
          const index = prev.prompts.findIndex((item) => item.id === id);
          prompts[index].response = data;
          prompts[index].isLoading = false;
          return {
            prompts,
          };
        });
      } else {
        throw new Error("Response not ok");
      }
    } catch (e) {
      console.error(e);
    }
  },
}));

const demoData = [
  {
    prompt: "asdfasd",
    date: new Date(),
    isLoading: false,
    id: 0.13464677869326214,
    response:
      "\n\nWow, much doge, such style! Very amaze, asdfasd is so cool! Much fun, such amazing! Wow!",
  },
  {
    prompt: "aasdfasdf",
    date: new Date(),
    isLoading: false,
    id: 0.35395498326862485,
    response:
      "\n\nWow, such amaze! Very doge. Much style. Much in. Such asdfasdf. Very aasdfasdf. Wow!",
  },
  {
    prompt: "asdf",
    date: new Date(),
    isLoading: false,
    id: 0.011668142907067303,
    response:
      "\n\nWow, such asdf, very computer science, much programming, amaze algorithms.",
  },
  {
    prompt: "asdfasdfasdfasdf",
    date: new Date(),
    isLoading: false,
    id: 0.6037445976094804,
    response:
      "\n\nwow, such amaze, very doge. much style, so wow. very asdfasdfasdfasdf, much awesome. so much awesome, wow.",
  },
  {
    prompt: "asdfasdfasdf",
    date: new Date(),
    isLoading: false,
    id: 0.4877229747587162,
    response:
      "\n\nWow, such doge amaze! Much style, very words. So many wow, much amaze. Such doge, very cool. Much awesome, very fun. Wow!",
  },
  {
    prompt: "wow tell me something super sexy in 100words or less please",
    date: new Date(),
    isLoading: false,
    id: 0.6825256531414252,
    response:
      "\n\nWow, such sexy! Much desire! Very alluring! Such temptation! Such sensuality! Much enthralling! Very captivating! Amaze with beauty! Much pleasure! Such seduction! Very inviting! Much passion! Very inviting! Much arousal! Very stimulating! Much pleasure! Very exciting! Much anticipation! Very enthralling! Much pleasure! Very tantalizing!",
  },
  {
    prompt: "asdfasd",
    date: new Date(),
    isLoading: false,
    id: 0.13464677869326214,
    response:
      "\n\nWow, much doge, such style! Very amaze, asdfasd is so cool! Much fun, such amazing! Wow!",
  },
  {
    prompt: "aasdfasdf",
    date: new Date(),
    isLoading: false,
    id: 0.35395498326862485,
    response:
      "\n\nWow, such amaze! Very doge. Much style. Much in. Such asdfasdf. Very aasdfasdf. Wow!",
  },
  {
    prompt: "asdf",
    date: new Date(),
    isLoading: false,
    id: 0.011668142907067303,
    response:
      "\n\nWow, such asdf, very computer science, much programming, amaze algorithms.",
  },
  {
    prompt: "asdfasdfasdfasdf",
    date: new Date(),
    isLoading: false,
    id: 0.6037445976094804,
    response:
      "\n\nwow, such amaze, very doge. much style, so wow. very asdfasdfasdfasdf, much awesome. so much awesome, wow.",
  },
  {
    prompt: "asdfasdfasdf",
    date: new Date(),
    isLoading: false,
    id: 0.4877229747587162,
    response:
      "\n\nWow, such doge amaze! Much style, very words. So many wow, much amaze. Such doge, very cool. Much awesome, very fun. Wow!",
  },
  {
    prompt: "wow tell me something super sexy in 100words or less please",
    date: new Date(),
    isLoading: false,
    id: 0.6825256531414252,
    response:
      "\n\nWow, such sexy! Much desire! Very alluring! Such temptation! Such sensuality! Much enthralling! Very captivating! Amaze with beauty! Much pleasure! Such seduction! Very inviting! Much passion! Very inviting! Much arousal! Very stimulating! Much pleasure! Very exciting! Much anticipation! Very enthralling! Much pleasure! Very tantalizing!",
  },
];
