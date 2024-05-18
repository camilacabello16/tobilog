"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { BLOG, CATEGORY } from "@/constains/api";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

function Blog() {
    const [listBlog, setListBlog] = useState<any[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(9);
    const [textFilter, setTextFilter] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [categoryList, setCategoryList] = useState<any[]>([]);

    const imageLink = "https://cdn.pixabay.com/photo/2023/02/14/23/59/sunset-7790627_640.jpg";

    const getBlogs = () => {
        axios.get(BLOG + `?pageSize=${pageSize}&pageIndex=${pageIndex}&text=${textFilter}&category=${categoryFilter}`).then(res => {
            setListBlog(res.data.blogs);
        });
    };

    const getCategories = () => {
        axios.get(CATEGORY).then(res => {
            setCategoryList(res.data.categories);
        });
    }

    useEffect(() => {
        getCategories();
        getBlogs();
    }, []);

    return (
        <div className="flex flex-wrap justify-between px-20">
            {listBlog.map((item: any) => {
                return (
                    <Card key={item} style={{ width: '32%' }} className="mt-5">
                        <CardHeader />
                        <CardContent>
                            <div className="h-48 w-full">
                                <img className="object-cover h-full w-full" src={item.thumbnail} />
                            </div>
                            <div className="mt-5 font-extrabold">
                                <h2>{item.title}</h2>
                            </div>
                            <div className="mt-5">
                                <p className="line-clamp-2">{item.description}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="border-t-2 flex justify-between w-full pt-5 text-slate-400">
                                <span>16 views</span>
                                <span>{moment(item.createdAt).format("YYYY/MM/DD HH:mm")}</span>
                            </div>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}

export default Blog