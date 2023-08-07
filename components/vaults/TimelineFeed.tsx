"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export function TimelineEntryCard({ entry }: { entry: any }) {
  const { theme } = useTheme();
  return (
    <VerticalTimelineElement
      className={"vertical-timeline-element--work"}
      contentStyle={{
        borderWidth: 1,
        background:
          theme === "light" ? "rgba(250, 250, 250, .1)" : "rgba(10, 10, 10, 1)",
        color: "#fff",
        boxShadow: "none",
        borderRadius: 14,
      }}
      contentArrowStyle={{
        borderRight:
          "7px solid " + (theme === "light" ? "rgb(250, 250, 250)" : "#2f2f2f"),
      }}
      date="2011 - present"
      iconStyle={{
        background: theme === "light" ? "#eee" : "#111",
        color: "#fff",
        borderWidth: 2,
        borderColor: theme === "light" ? "rgb(221, 221, 221)" : "#222",
        boxShadow: "none",
        height: 30,
        width: 30,
        marginLeft: 5,
      }}
    >
      {entry.name && (
        <h3 className="vertical-timeline-element-title font-bold">
          {entry.name}
        </h3>
      )}
      {entry.description && (
        <h4 className="vertical-timeline-element-subtitle">
          {entry.description}
        </h4>
      )}
      {entry.text && (
        <div
          className={cn({
            "mt-2": entry.name || entry.description,
          })}
        >
          <span className="m-0 opacity-75">{entry.text}</span>
        </div>
      )}
    </VerticalTimelineElement>
  );
}

export function TimelineFeed({ entries }: { entries?: any[] | null }) {
  const { theme } = useTheme();
  return (
    <VerticalTimeline
      lineColor={theme === "light" ? "rgb(232, 232, 232)" : "#222"}
      layout="1-column-left"
    >
      {entries?.map((entry) => (
        <TimelineEntryCard entry={entry} />
      ))}
    </VerticalTimeline>
  );
}
