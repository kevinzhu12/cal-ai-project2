import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MyWrapper = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 7 }}>
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  );
};

const CategoryPage = ({ title, notes }) => {
  console.log(notes);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="m-4 px-6 py-4 border border-white">
        <p className="text-white text-5xl font-bold">{title}</p>
      </div>
      <MyWrapper>
        {notes.map((note, key) => (
          <Card
            key={key}
            className="h-fit w-48 m-4 bg-slate-50 hover:bg-slate-400 focus:ring focus:ring-yellow-500 flex justify-center rounded-md"
          >
            <CardContent>
              <p className="text-base text-xl">{note}</p>
            </CardContent>
          </Card>
        ))}
      </MyWrapper>
    </div>
  );
};

export default CategoryPage;
