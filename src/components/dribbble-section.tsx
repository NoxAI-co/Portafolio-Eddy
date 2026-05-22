"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Image from "next/image";
import { DribbleResponse } from "@/data/interfaces/dribbe-project";

const ACCESS_TOKEN =
  "3e1ffc65c5dd8f719b8821fea9da09adedc10aba587e456ea10f9f64903e4331";

interface DribbbleBucket {
  id: number;
  name: string;
  description: string | null;
  shots_count: number;
}

const TABS = ["Work", "Collections", "About"] as const;
type Tab = (typeof TABS)[number];

export function DribbbleSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Work");
  const [shots, setShots] = useState<DribbleResponse[]>([]);
  const [buckets, setBuckets] = useState<DribbbleBucket[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "Work" && shots.length === 0) {
      setLoading(true);
      fetch(
        `https://api.dribbble.com/v2/user/shots?access_token=${ACCESS_TOKEN}&per_page=4`
      )
        .then((r) => r.json())
        .then((data) => {
          setShots(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
    if (activeTab === "Collections" && buckets.length === 0) {
      setLoading(true);
      fetch(
        `https://api.dribbble.com/v2/user/buckets?access_token=${ACCESS_TOKEN}`
      )
        .then((r) => r.json())
        .then((data) => {
          setBuckets(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-3">
      {/* Profile card */}
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/25 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transition-opacity duration-500 group-hover:via-white/70" />
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-12 pointer-events-none" />
        <div className="relative flex items-center gap-3 px-4 py-3">
          <Avatar className="size-8 shrink-0">
            <AvatarImage
              alt={DATA.name}
              src={DATA.avatarUrl}
              className="object-cover"
            />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="text-sm font-medium text-foreground truncate">
              {DATA.name}
            </span>
            <Icons.dribble className="size-3.5 text-muted-foreground shrink-0" />
          </div>
          <Link
            href="https://dribbble.com/eddysantiago"
            target="_blank"
            className="shrink-0"
          >
            <Button size="sm" className="h-7 text-xs px-3">
              Follow +
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex items-center gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-foreground/10 text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-2 h-px bg-border" />
      </div>

      {/* Content */}
      {activeTab === "Work" && (
        <WorkContent shots={shots} loading={loading} />
      )}
      {activeTab === "Collections" && (
        <CollectionsContent buckets={buckets} loading={loading} />
      )}
      {activeTab === "About" && <AboutContent />}
    </div>
  );
}

function WorkContent({
  shots,
  loading,
}: {
  shots: DribbleResponse[];
  loading: boolean;
}) {
  if (loading) return <LoadingSkeleton />;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {shots.map((shot) => (
        <Card
          key={shot.id}
          className="flex flex-col overflow-hidden border hover:shadow-2xl transition-all duration-300 ease-out h-full"
        >
          <Link
            href={shot.html_url}
            target="_blank"
            className="block cursor-pointer"
          >
            <Image
              src={shot.images.hidpi || shot.images.normal}
              alt={shot.title}
              width={500}
              height={300}
              className="h-40 w-full object-cover object-top"
            />
          </Link>
          <CardHeader className="px-2">
            <div className="space-y-1">
              <CardTitle className="mt-1 text-base">{shot.title}</CardTitle>
              <time className="font-sans text-xs text-muted-foreground">
                {new Date(shot.published_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </CardHeader>
          <CardFooter className="px-2 pb-2">
            <Link href={shot.html_url} target="_blank">
              <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                <Icons.globe className="size-3" />
                Dribbble
              </Badge>
            </Link>
          </CardFooter>
        </Card>
      ))}
      <span className="text-xs flex items-center gap-1 col-span-full text-muted-foreground">
        Powered by Dribbble <Icons.dribble className="size-4" />
      </span>
    </div>
  );
}

function CollectionsContent({
  buckets,
  loading,
}: {
  buckets: DribbbleBucket[];
  loading: boolean;
}) {
  if (loading) return <LoadingSkeleton count={2} />;

  if (buckets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
        <Icons.dribble className="size-7 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">Sin colecciones aún</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {buckets.map((bucket) => (
        <Link
          key={bucket.id}
          href={`https://dribbble.com/eddysantiago/buckets/${bucket.id}`}
          target="_blank"
        >
          <div className="group/card relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 p-4 h-full">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {bucket.name}
                </p>
                {bucket.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {bucket.description}
                  </p>
                )}
              </div>
              <Badge variant="secondary" className="shrink-0 text-xs tabular-nums">
                {bucket.shots_count} shots
              </Badge>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function AboutContent() {
  const stats = [
    { label: "Años exp.", value: "3+" },
    { label: "Proyectos", value: "10+" },
    { label: "Tecnologías", value: "10+" },
  ];

  const socials = Object.values(DATA.contact.social).filter((s) => s.navbar);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 flex flex-col gap-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-3 gap-0.5">
            <span className="text-xl font-bold text-foreground">{stat.value}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {DATA.skills.map((skill) => (
          <Badge
            key={skill.name}
            variant="secondary"
            className="flex items-center gap-1.5 text-xs"
          >
            {skill.icon}
            {skill.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-44 rounded-xl bg-white/[0.03] animate-pulse"
        />
      ))}
    </div>
  );
}
