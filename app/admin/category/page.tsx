"use client"

import HeaderAdmin from "@/app/components/headerAdmin";
import AdminPage from "../page";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Drawer } from "vaul";
import { useEffect, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CATEGORY } from "@/constains/api";
import { CREATED } from "@/constains/response";
import { useToast } from "@/components/ui/use-toast";

const CategoryPage = () => {
    //form setup
    const formSchema = z.object({
        content: z.string().nonempty('Field is required').min(2).max(50),
        description: z.string(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
            description: "",
        },
    });

    const { toast } = useToast();
    const [open, setOpen] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState<any[]>([]);

    const getCategories = () => {
        axios.get(CATEGORY).then(res => {
            setCategoryList(res.data.categories);
        });
    }

    useEffect(() => {
        getCategories();
    }, []);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        axios.post(CATEGORY, values).then(res => {
            if (res.status === CREATED) {
                toast({
                    variant: "default",
                    title: "Tobilog",
                    description: "Created success.",
                });
                setOpen(false);
                form.reset();
                getCategories();
            } else {
                toast({
                    variant: "destructive",
                    title: "Tobilog",
                    description: "There was a problem with your request.",
                })
            }
        })
    }

    return (
        <AdminPage>
            <HeaderAdmin title="Category" />
            <div className="text-right my-5">
                <Button onClick={() => setOpen(true)}>New</Button>
            </div>
            <div className="mt-5"><Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categoryList.map((item: any) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.content}</TableCell>
                                <TableCell>{item.description}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table></div>

            <Drawer.Root open={open} direction="right">
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
                        <div className="p-4 bg-white flex-1 h-full">
                            <div className="max-w-md mx-auto">
                                <Drawer.Title className="font-medium mb-4">
                                    Category
                                </Drawer.Title>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Content</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Category title" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Category description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex justify-end">
                                            <Button type="submit" className="mr-2">Submit</Button>
                                            <Button onClick={() => setOpen(false)}>Close</Button>
                                        </div>

                                    </form>
                                </Form>
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </AdminPage>
    );
};

export default CategoryPage;