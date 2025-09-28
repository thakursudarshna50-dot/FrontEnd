import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBlogById } from '../features/blogListing/blogSlice'
import { useSelector } from 'react-redux'
const BlogDetailScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getBlogById(id));

    }, [dispatch, id]);
    const { blog } = useSelector(state => state.blog);

    return (

        <div>
            <button className="btn btn-primary mt-4 " style={{ color: "var(--color-text)", cursor: "pointer", fontSize: "1rem", fontWeight: "bold" }} onClick={() => navigate('/blogs')}>  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg></button>
            
            <div className="container  mt-[-50px] mb-5  flex justify-center items-center h-[100vh]">

                <div className="bg-black/30 p-4 rounded mx-40 py-20 px-10 ml-[25%] mr-[10%] border-2 border-white/20 rounded-xl">
                    <h1 className=" text-center text-primary  font-bold  text-[3rem]  " style={{ textAlign: "center", color: 'var(--color-nav)' }}>{blog ? (blog.title ? blog.title : "") : "Expected Blog not found"}</h1>
                    <p className=" text-lg text-left ">{blog ? (blog.content ? blog.content : "") : ""}</p>
                    {blog && blog.media && <img src={blog.media} alt="" />}
                    <div className="flex justify-between">

                        <div className="ml-4 text-lg overflow-hidden inline-flex items-center w-[20%]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="blue" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye mr-2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                            : <span style={{ color: "var(--color-nav)", fontSize: "1.5rem" }}>{blog ? (blog.views ? blog.views : "0") : "0"}</span>
                        </div>
                        <div className="container ml-[60%] flex flex-col sm:flex-col sm:items-start gap-2">
                            <h2 className="text-lg text-left overflow-hidden"><span className="font-bold">Written by : </span>{blog ? (blog.author?.name ? blog.author.name : "Anonymous") : "Anonymous"}</h2>
                            <h2 className="text-lg text-left overflow-hidden"><span className="font-bold">Published on : </span>{blog ? (blog.createdAt ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(blog.createdAt)) : "") : ""}</h2>
                            {/* {blog.author.id===localStorage.getItem('userId') && <button className="btn btn-primary mt-4 " style={{color:"var(--color-text)",cursor:"pointer",fontSize:"1rem",fontWeight:"bold"}}  onClick={() => {window.location.href="/blogs"}}>  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></button>} */}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default BlogDetailScreen