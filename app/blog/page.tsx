import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function Blog() {
    const imageLink = "https://cdn.pixabay.com/photo/2023/02/14/23/59/sunset-7790627_640.jpg";

    return (
        <div className="flex flex-wrap justify-between">
            {Array.from(Array(15).keys()).map((item: any) => {
                return (
                    <Card key={item} style={{ width: '32%' }} className="mt-5">
                        <CardHeader />
                        <CardContent>
                            <div className="h-48 w-full">
                                <img className="object-cover h-full w-full" src={imageLink} />
                            </div>
                            <div className="mt-5 font-extrabold">
                                <h2>Title</h2>
                            </div>
                            <div className="mt-5">
                                <p className="line-clamp-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="border-t-2 flex justify-between w-full pt-5 text-slate-400">
                                <span>16 views</span>
                                <span>3 days ago</span>
                            </div>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}

export default Blog