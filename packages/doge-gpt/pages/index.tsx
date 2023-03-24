import { css } from "dsl/helpers/css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { PropsWithChildren, useState } from "react";
import { create } from "zustand";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [value, setValue] = useState("");
  const store = useStore();
  return (
    <>
      <Head>
        <title>Doge GPT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={css(
          "p-4",
          "flex",
          "justify-center",
          "grow",
          "bg-pixels-yellow-100"
        )}
      >
        <div className={css("max-w-3xl", "w-full", "flex", "flex-col")}>
          <div
            className={css("flex", "gap-2", "items-center", "justify-center")}
          >
            <BlockText className="bg-doge-red">doge</BlockText>
            <span>--</span>
            <BlockText className="bg-doge-magenta">gpt</BlockText>
            <span>--</span>
            <BlockText className="bg-doge-green">much</BlockText>
            <span>--</span>
            <BlockText className="bg-doge-orange">wow</BlockText>
          </div>
          <div className={css("grow", "mt-4", "flex", "flex-col")}>
            <div
              className={css(
                "grow",
                "border-[1px]",
                "border-black",
                "flex",
                "flex-col",
                "gap-1",
                "p-2"
              )}
            >
              {store.prompts.map((item, index) => (
                <div key={`${item.prompt}-${index}`}>
                  <div>{item.prompt}</div>
                  <div>{item.response}</div>
                  <div>{item.date.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className={css("mt-2")}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (value !== "") {
                    console.log("submit values", value);
                    store.post(value);
                    setValue("");
                  }
                }}
              >
                <input
                  name={"search"}
                  className={css(
                    "w-full",
                    "border-[1px]",
                    "border-black",
                    "px-2",
                    "py-1"
                  )}
                  placeholder={"wow..."}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const BlockText: React.FC<PropsWithChildren<{ className: string }>> = ({
  className,
  children,
}) => {
  return (
    <span className={css("p-1", "border-[1px]", "border-black", className)}>
      {children}
    </span>
  );
};

interface Store {
  prompts: { prompt: string; response: string; date: Date }[];
  post: (prompt: string) => void;
}

const useStore = create<Store>((set) => ({
  prompts: [],
  post: async (prompt: string) => {
    try {
      const res = await fetch("http://localhost:5000/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const { data } = await res.json();
      set((prev) => ({
        prompts: [
          ...prev.prompts,
          { prompt, response: data, date: new Date() },
        ],
      }));
      console.log("debug:: json", data);
    } catch (e) {}
  },
}));
