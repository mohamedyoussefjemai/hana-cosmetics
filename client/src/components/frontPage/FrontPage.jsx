import React from 'react';

function FrontPage() {
  return (
    <div className=" col-span-2 min-h-[90vh] border-r border-gray-200 items-start justify-start flex flex-col w-full ">
      <div className="w-full items-start justify-start flex flex-col px-12 pt-12 pb-6">
        <h1 className="font-bold text-xl xl:text-2xl pb-2 "> My Card </h1>
        <p className="text-md text-gray-800">
          Find all of your investment information on a card
        </p>
      </div>
    </div>
  );
}

export default FrontPage;
