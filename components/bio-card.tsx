"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function BioCard() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleClick(e: React.FormEvent) {
    e.preventDefault();
    console.log(title, url);
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 items-center">
        <CardTitle>Create Bio</CardTitle>
        <CardDescription>Add your social media links</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label>Title</Label>
              <Input
                id="title"
                placeholder="Title of this link"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label>url</Label>
              </div>
              <Input
                id="url"
                placeholder="example.com"
                required
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button className="w-3/12" onClick={handleClick}>
                Save
              </Button>
            </div>
          </div>
        </form>
      </CardContent>

      {/* make this footer update the added link */}
      <CardFooter className="flex flex-col gap-2">
        <p>this is ur title: {title} </p>
        <p>This is ur link: {url}</p>
      </CardFooter>
    </Card>
  );
}

export default BioCard;
