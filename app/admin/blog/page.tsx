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
import { BLOG, CATEGORY } from "@/constains/api";
import { CREATED } from "@/constains/response";
import { useToast } from "@/components/ui/use-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"

export default function BlogPage() {
    //form setup
    const formSchema = z.object({
        title: z.string().nonempty('Field is required').min(2).max(200),
        content: z.string().nonempty('Field is required'),
        categoryId: z.string().nonempty('Field is required'),
        thumbnail: z.string().nonempty('Field is required'),
        description: z.string().nonempty('Field is required'),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
            title: "",
            categoryId: "",
            thumbnail: "",
            description: "",
        },
    });

    const { toast } = useToast();
    const [open, setOpen] = useState<boolean>(false);
    const [blogList, setBlogList] = useState<any[]>([]);
    const [categoryList, setCategoryList] = useState<any[]>([]);

    const getBlogs = () => {
        axios.get(BLOG).then(res => {
            setBlogList(res.data.blogs);
        });
    }

    const getCategories = () => {
        axios.get(CATEGORY).then(res => {
            setCategoryList(res.data.categories);
        });
    }

    useEffect(() => {
        getBlogs();
        getCategories();
    }, []);

    const onSubmit = (values: any) => {
        values.createBy = "test";
        axios.post(BLOG, values).then(res => {
            if (res.status === CREATED) {
                toast({
                    variant: "default",
                    title: "Tobilog",
                    description: "Created success.",
                });
                setOpen(false);
                form.reset();
                getBlogs();
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
            <HeaderAdmin title="Blog" />
            <div className="text-right my-5">
                <Button onClick={() => setOpen(true)}>New</Button>
            </div>
            <div className="mt-5"><Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogList.map((item: any) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.createdBy}</TableCell>
                                <TableCell>{item.createdAt}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table></div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-4/5 overflow-y-scroll" style={{ height: 500 }}>
                    <DialogHeader>
                        <DialogTitle>Blog</DialogTitle>
                        <DialogDescription>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Blog title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem {...field}>
                                                <FormLabel>Category</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Theme" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categoryList.map((item: any) => {
                                                            return (
                                                                <SelectItem value={item.id}>{item.content}</SelectItem>
                                                            );
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Short description</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="thumbnail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Thumbnail</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Link of image" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <ReactQuill theme="snow" {...field} />
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
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </AdminPage >
    );
};