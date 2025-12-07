import { Button, Input, RTE, Select } from "../Components/index";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../appwrite/Services";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const userData = useSelector((state) => state.Auth.userData);
    const Navigate = useNavigate();

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await Services.uploadFile(data.image[0]) : null;
            if (file) { Services.deleteFile(post.images) }

            const dbPost = await Services.updatePost(post.$id, { ...data, images: file ? file.$id : undefined, });
            if (dbPost) { Navigate(`/post/${dbPost.$id}`); }

        } else {
            const file = await Services.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.images = fileId;

                const dbPost = await Services.createPost({ ...data, userId: userData.$id });
                if (dbPost) { Navigate(`/post/${dbPost.$id}`); }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") { setValue("slug", slugTransform(value.title), { shouldValidate: true }) }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="sm:flex flex-wrap items-start">
            <div className="px-2 sm:w-2/5">
                <Input label="Title :" placeholder="Title" className="mb-4 p-2 bg-white rounded"
                    {...register("title", { required: true })}
                />
                <Input label="Slug :" placeholder="Slug" className="mb-4 p-2 bg-white rounded"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Input label="Featured Image :" type="file" className="mb-4 p-2 rounded"
                    {...register("image", { required: !post })}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                />
                <Select options={["active", "inactive"]} label="Status" className="mb-4"
                    {...register("status", { required: true })}
                />
                {post && (
                    <div className="mb-4 w-full">
                        <img src={Services.getFilePreview(post.images)} alt={post.title} className="rounded-lg" />
                    </div>
                )}

            </div>
            <div className="px-2 sm:w-3/5">
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined}
                className="text-[#106EBE] bg-[#0FFCBE] hover:bg-white hover:text-[#106EBE] rounded-full px-6 py-1">
                {post ? "Update" : "Submit"}
            </Button>
        </form>
    );
}