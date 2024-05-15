import HeaderAdmin from "@/app/components/headerAdmin";
import AdminPage from "../page";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
    return (
        <AdminPage>
            <HeaderAdmin title="Category" />
            <div className="text-right my-5">
                <Button >New</Button>
            </div>
            <div className="mt-5"><Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                    </TableRow>
                </TableBody>
            </Table></div>
        </AdminPage>
    );
};