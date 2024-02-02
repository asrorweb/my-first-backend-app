import { Schema, model } from "mongoose";

const blogSchema = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        // author: [{ type: Schema.Types.ObjectId, ref: "User" }],
        author: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User", // Reference to the User model or whatever model it corresponds to
                },
                email: String,
            },
        ],
    },
    { timestamps: true }
);

const BlogModel = model("Blogs", blogSchema);
export default BlogModel;
