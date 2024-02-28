"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"; // Assuming Chevron icons for +/-

interface FixedRightBarItemProps {
  title: string;
  items: {
    symbol: string;
    price: string;
    change: string;
  }[];
}

const FixedRightBarItem: React.FC<FixedRightBarItemProps> = ({
  title,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(true); // Default to open

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col">
      <button
        onClick={toggleOpen}
        className="py-4 text-sm px-4 font-bold flex justify-between items-center w-full text-left"
      >
        {title}
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </button>
      <div
        className={`transition-max-height duration-300 ease-out overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {isOpen && (
          <>
            <Separator />
            <Table>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.symbol}>
                    <TableCell className="font-medium">{item.symbol}</TableCell>
                    <TableCell
                      className={`text-center ${
                        item.change.startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {item.price}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        item.change.startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {item.change}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator />
          </>
        )}
      </div>
    </div>
  );
};

export default FixedRightBarItem;
