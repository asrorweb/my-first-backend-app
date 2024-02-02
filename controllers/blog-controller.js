import BlogModel from "../models/blog-model.js";
import User from "../models/user-model.js";

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        return res.status(200).json({ blogs });
    } catch (error) {
        throw new Error(error);
    }
};

export const createBlogs = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { userId, email } = req.user;
        const newBlog = new BlogModel({
            title,
            desc,
            author: [{ userId, email }],
        });
        await newBlog.save();

        // Userga blogni qo'shish
        const addBLogToUser = await User.findOne({ email });
        if (addBLogToUser) {
            addBLogToUser.blogs.push({ title, desc, _id: newBlog._id });
            await addBLogToUser.save();
        }

        return res.status(200).json({ newBlog });
    } catch (error) {
        throw new Error(error);
    }
};

export const updateBlogs = async (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;
    const { email } = req.user;

    try {
        const updatedNewBlog = await BlogModel.findByIdAndUpdate(
            id,
            {
                title,
                desc,
            },
            { new: true, runValidators: true }
        );
        if (!updatedNewBlog)
            return res.status(200).json({ massage: "Blog topilmadi" });

        // Blogni userning blogs ro'yxatidan yangilash
        const findUserAndUpdataBlog = await User.findOneAndUpdate(
            { email, "blogs._id": id },
            { "blogs.$.title": title, "blogs.$.desc": desc },
            { new: true, runValidators: true }
        );

        if (!findUserAndUpdataBlog)
            return res.status(200).json({
                massage: "Blog user malumotlarida yangilashda xatolik",
            });

        res.status(200).json({ message: "BLog muaffaqiyatli yangilandi" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlogs = async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    try {
        const deletedBlog = await BlogModel.findByIdAndDelete(id);

        if (!deletedBlog)
            return res.status(404).json({ message: "blog topilmadi" });

        // Blogni userning blogs ro'yxatidan ochirish
        const findUserAndDeleteBlog = await User.findOneAndUpdate(
            { email, "blogs._id": id },
            { $pull: { blogs: { _id: id } } }
        );

        if (!findUserAndDeleteBlog)
            return res.status(200).json({
                massage: "Blog user malumotlarida o'chirishda xatolik xatolik",
            });

        return res.status(200).json({
            message: "Document deleted successfully",
            deletedBlog,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
