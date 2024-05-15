function DetailBlog({ params }: {
    params: { id: string }
}) {
    return (
        <h1>My Blog: {params.id}</h1>
    );
}

export default DetailBlog