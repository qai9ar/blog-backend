module.exports = (BlogService) => {
    import("express");

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_index = async (req, res) => {
        try {
            const blog = await BlogService.getAllBlog(req.query);
            res.json({ ...blog });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_create = async (req, res) => {
        try {
            const blogData = { ...req.body, author: req.user.username };
            const result = await BlogService.createBlog(blogData);
            return res.status(201).json({ ...result });
        }
        catch (err) {
            return res.status(400).json(err);
        }
    };

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_get_by_author = async (req, res) => {
        const { author } = req.params;
        console.log("Author endpoint");
        try {
            let blog = await BlogService.getAuthorBlog(author);
            return res.json({ ...blog });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_update = async (req, res) => {
        try {
            const result = await BlogService.updateBlog(req.params.id, req.body);
            res.json({ message: result });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_delete = async (req, res) => {
        try {
            const result = await BlogService.deleteBlog(req.params.id);
            return res.json({ message: result });
        } catch (err) {
            return res.status(400).json(err);
        }
    };

    /**
 * 
 * @param {Request} req
 * @param {Response} res
 */

    const blog_get_by_id = async (req, res) => {
        try {
            const response = await BlogService.getBlog(req.params.id);
            return res.json({ ...response });
        } catch (err) {
            return res.status(400).json(err);
        }
    };

    return {
        blog_index,
        blog_create,
        blog_get_by_author,
        blog_update,
        blog_delete,
        blog_get_by_id
    };
};