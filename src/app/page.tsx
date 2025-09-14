import { Card, CardContent } from "@/components/ui/card";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Bloom With Haru",
  description: "Build better habits with your AI companion",
};

export default async function Home() {
  return (
    <Card>
      <CardContent>hi</CardContent>
    </Card>
  );
}
