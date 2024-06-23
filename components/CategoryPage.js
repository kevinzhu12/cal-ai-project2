import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Markdown from "react-markdown";
import { Button } from "./ui/button";

const MyWrapper = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 5 }}>
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  );
};

const CategoryPage = ({ title, notes }) => {
  console.log(notes);
  const noteColors = [
    ["bg-rose-200", "bg-rose-400"],
    ["bg-sky-200", "bg-sky-400"],
    ["bg-violet-200", "bg-violet-400"],
    ["bg-pink-200", "bg-pink-400"],
    ["bg-emerald-200", "bg-emerald-400"],
    ["bg-yellow-200", "bg-yellow-400"],
  ];
  return (
    <div className="">
      <div className=" px-6 py-4 bg-slate-900 h-20 ">
        <p className="gradient-text text-5xl font-bold">{title}</p>
      </div>
      <div className="flex flex-col overflow-y-auto max-h-screen m-5">
        <MyWrapper>
          {notes.map((note, key) => (
            <Card
              key={key}
              className={`h-fit w-68 m-5 ${
                noteColors[key % noteColors.length][0]
              } ${
                "hover:" + noteColors[key % noteColors.length][1]
              } focus:ring focus:ring-yellow-500 flex justify-center rounded-md`}
            >
              <CardContent>
                <p className="p-2 markdown">
                  <Markdown>{note}</Markdown>
                </p>
              </CardContent>
            </Card>
          ))}
        </MyWrapper>
      </div>
    </div>
  );
};

export default CategoryPage;
