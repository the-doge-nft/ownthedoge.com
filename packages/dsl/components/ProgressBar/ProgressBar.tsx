import { css } from "../../helpers/css";
//@ts-ignore
import { useRef } from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  max: number;
  min: number;
  now: number;
  thumb?: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({min, max, now, thumb}) => {
  const conatinerRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement>()
  const thumbRef = useRef<HTMLDivElement>()
  return <div className={css("relative", "my-14")}>
    {/*<div>{min}</div>*/}
    <div ref={conatinerRef}
      className={css("h-[15px]", "bg-transparent", "w-full", "rounded-full", "border-2", "border-black", "relative")}>
      <div className={css("h-full", "w-1/2", "bg-meme-yellow", "rounded-full", styles.rainbow)}/>
      <div
        className={css("absolute", "w-[60px]", "h-[60px]", "top-1/2", "-translate-y-[50%]", "left-1/2", "-translate-x-[50%]", "flex", "justify-center", "items-center")}>
        {thumb ? thumb : <div className={css("text-3xl")}>🐕</div>}
      </div>
    </div>
    {/*<div>{max}</div>*/}
  </div>
}