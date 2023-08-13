"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Embed from "react-embed";
import "./TimelineFeed.css";
import { Tweet } from "react-tweet";
import { useSupabase } from "../providers/supabase-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EntriesSearch from "@/app/(vaults)/v/[vault_id]/components/EntriesSearch";
import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const getTweetIdFromURL = (url: string): string | null => {
  const twitterRegex =
    /(https?:\/\/(www\.)?twitter\.com\/[^\/]+\/status\/)(\d+)/;
  const match = url.match(twitterRegex);

  return match ? match[3] : null;
};

const isValidURL = (string: string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

const getDateString = (created_at: Date, related_date?: Date) => {
  let base = `Added: ${new Date(created_at).toLocaleDateString()} ${new Date(
    created_at
  ).toLocaleTimeString()}`;
  if (related_date) {
    base += ` | Date: ${new Date(related_date).toLocaleDateString()} ${new Date(
      related_date
    ).toLocaleTimeString()}`;
  }
  return base;
};

export function TimelineEntryCard({ entry }: { entry: any }) {
  const router = useRouter();
  const { supabase } = useSupabase();
  const channel = supabase
    .channel("changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "entries",
        filter: "vault_id=eq." + entry.vault_id,
      },
      (payload) => router.refresh()
    )
    .subscribe();
  const isURL = isValidURL(entry.text);
  const tweetId = isURL && getTweetIdFromURL(entry.text);
  return (
    <VerticalTimelineElement
      className={"vertical-timeline-element--work"}
      date={getDateString(entry.created_at, entry.related_date)}
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
        <div className={entry.description ? "-mt-1" : "-mt-4"}>
          <Tweet id={tweetId} />
        </div>
      )}
      {isURL && !tweetId && (
        <div>
          <Embed url={entry.text} />
        </div>
      )}
      {entry.text && (
        <div
          className={cn({
            "mt-2": entry.name || entry.description || (isURL && !tweetId),
            "text-xs": tweetId,
          })}
        >
          <a
            target="_blank"
            className={cn({
              "text-blue-600 dark:text-blue-400": isURL,
            })}
            href={isURL && entry.text}
          >
            <span className="m-0 opacity-75">{entry.text}</span>
          </a>
        </div>
      )}
    </VerticalTimelineElement>
  );
}

export function TimelineFeed({
  entries,
  vault,
}: {
  entries?: any[] | null;
  vault: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const [filterIds, setFilterIds] = useState<string[] | null>(null);
  console.log("filterIds", filterIds);
  const filteredEntries = useMemo(
    () =>
      filterIds
        ? entries?.filter((entry) => filterIds.includes(entry.id))
        : entries,
    [entries, filterIds]
  );
  console.log("filteredEntries", filteredEntries);
  const handleFilterChange = (value: string) => {
    router.push(`/v/${vault.short_id}?view=${value}`);
  };
  return (
    <>
      <div className="flex gap-5 flex-col-reverse md:flex-row items-center justify-between md:-mb-1">
        <div className="flex w-full">
          <Select
            onValueChange={handleFilterChange}
            defaultValue={view || "latest"}
          >
            <SelectTrigger className="w-[140px] h-8 rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="chron">Chronological</SelectItem>
              {/* <SelectItem value="images">Images</SelectItem> */}
              {/* <SelectItem value="links">Links</SelectItem> */}
              {/* <SelectItem value="files">Files</SelectItem> */}
              <SelectItem value="map">Map</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <EntriesSearch
          vault_id={vault.id}
          onResult={(ids) => setFilterIds(ids)}
        />
      </div>
      <VerticalTimeline layout="1-column-left">
        {filteredEntries?.map((entry) => (
          <TimelineEntryCard entry={entry} />
        ))}
        {filteredEntries?.length === 0 && entries?.length! > 0 && (
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
              ⚠️{" "}
              <span className="ml-1 text-sm">
                Nothing found. Try a different search.
              </span>
            </h4>
          </VerticalTimelineElement>
        )}
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
