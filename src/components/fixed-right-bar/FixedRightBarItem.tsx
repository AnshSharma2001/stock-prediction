import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface FixedRightBarItemProps {
    title: string;
    items: {
        symbol: string;
        price: string;
        change: string;
    }[];
}

const FixedRightBarItem: React.FC<FixedRightBarItemProps> = ({ title, items }) => {
    return (
        <div className="flex flex-col">
            <h2 className="py-4 text-sm px-4 font-bold ">{title}</h2>
            <Separator />
            <Table>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.symbol}>
                            <TableCell className={`font-medium`}>{item.symbol}</TableCell>
                            <TableCell className={`text-center ${item.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{item.price}</TableCell>
                            <TableCell className={`text-right ${item.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{item.change}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Separator />
        </div>
    );
};

export default FixedRightBarItem;
