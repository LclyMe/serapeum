"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./TimelineFeed.css";
import { Tweet } from "react-tweet";

const getTweetIdFromURL = (url: string): string | null => {
  const twitterRegex =
    /(https?:\/\/(www\.)?twitter\.com\/[^\/]+\/status\/)(\d+)/;
  const match = url.match(twitterRegex);

  return match ? match[3] : null;
};

export function TimelineEntryCard({ entry }: { entry: any }) {
  const tweetId = getTweetIdFromURL(entry.text);
  return (
    <VerticalTimelineElement
      className={"vertical-timeline-element--work"}
      date={`Added: ${new Date(
        entry.created_at
      ).toLocaleDateString()} ${new Date(
        entry.created_at
      ).toLocaleTimeString()}`}
      dateClassName="text-xs text-gray-500 w-full"
      iconStyle={{
        color: "#fff",
        borderWidth: 2,
        boxShadow: "none",
        height: 30,
        width: 30,
        marginLeft: 5,
      }}
    >
      {entry.name && (
        <h3 className="vertical-timeline-element-title font-semibold">
          {entry.name}
        </h3>
      )}
      {entry.description && (
        <h4 className="vertical-timeline-element-subtitle">
          {entry.description}
        </h4>
      )}
      {tweetId && (
        <div className={entry.description ? "-mt-2" : "-mt-4"}>
          <Tweet id={tweetId} />
        </div>
      )}
      {entry.text && (
        <div
          className={cn({
            "mt-2": entry.name || entry.description,
            "text-xs": tweetId,
          })}
        >
          <a
            target="_blank"
            className={cn({
              "text-blue-600 dark:text-blue-400": tweetId,
            })}
            href={tweetId && entry.text}
          >
            <span className="m-0 opacity-75">{entry.text}</span>
          </a>
        </div>
      )}
    </VerticalTimelineElement>
  );
}

export function TimelineFeed({ entries }: { entries?: any[] | null }) {
  const { theme } = useTheme();
  return (
    <>
      <VerticalTimeline layout="1-column-left">
        {entries?.map((entry) => (
          <TimelineEntryCard entry={entry} />
        ))}
        {entries?.length === 0 && (
          <VerticalTimelineElement
            className={"vertical-timeline-element--work"}
            dateClassName="text-xs text-gray-500 w-full"
            iconStyle={{
              color: "#fff",
              borderWidth: 2,
              boxShadow: "none",
              height: 30,
              width: 30,
              marginLeft: 5,
            }}
          >
            <h4 className="opacity-85">
              👋{" "}
              <span className="ml-1 text-sm">
                Welcome! This vault is empty. Add the first entry to get
                started.
              </span>
            </h4>
          </VerticalTimelineElement>
        )}
      </VerticalTimeline>
    </>
  );
}
