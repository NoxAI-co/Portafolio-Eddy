"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DribbleResponse, Images } from "@/data/interfaces/dribbe-project";
import { Icons } from "./icons";

export function DesignCard() {
  const [designs, setDesigns] = useState<DribbleResponse[]>([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch(
          `https://api.dribbble.com/v2/user/shots?access_token=3e1ffc65c5dd8f719b8821fea9da09adedc10aba587e456ea10f9f64903e4331&per_page=4`
        );
        if (!response.ok) throw new Error("Error al obtener los diseños");
        const data: DribbleResponse[] = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };

    fetchDesigns();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
      {designs.map((design) => (
        <Card
          key={design.id}
          className="flex flex-col overflow-hidden border hover:shadow-2xl transition-all duration-300 ease-out h-full"
        >
          <Link
            href={design.html_url || "#"}
            target="_blank"
            className="block cursor-pointer"
          >
            <Image
              src={design.images.hidpi || design.images.normal}
              alt={design.title}
              width={500}
              height={300}
              className="h-40 w-full object-cover object-top"
            />
          </Link>
          <CardHeader className="px-2">
            <div className="space-y-1">
              <CardTitle className="mt-1 text-base">{design.title}</CardTitle>
              <time className="font-sans text-xs text-gray-500">
                {new Date(design.published_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </CardHeader>
          <CardFooter className="px-2 pb-2">
            <Link href={design.html_url} target="_blank">
              <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                <Icons.dribble className="size-3 text-muted-foreground shrink-0" />
                Dribbble
              </Badge>
            </Link>
          </CardFooter>
        </Card>
      ))}
      <span className="text-xs flex items-center gap-1">Powered by Dribble <Icons.dribble className="size-4" /> </span>
    </div>
  );
}
