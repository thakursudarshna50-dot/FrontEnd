import react, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBlog } from '../features/blogListing/blogSlice';
import { useSelector } from 'react-redux';
import InputBox from '../Components/inputBox';
import EditorComponent from '../Components/editor';

export default function AddBlogScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { blogs } = useSelector(state => state.blog);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState('');
    const [author, setAuthor] = useState('');
    const [views, setViews] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title, content, media, author, views);
        try {
            setContent(tinymce.get('editor').getContent());
            await dispatch(addBlog({ title, content, media, author, views })).unwrap();
            setTimeout(() => {
                localStorage.setItem('Login', 'true');
                navigate('/');
            }, 300);
        } catch (error) {
            console.log('we have entered the error block', error);
        }
    };
    return (
        <div className="container mx-auto   mt-10">
            <form onSubmit={handleSubmit}>

                
                <div className='flex flex-row gap-4 align-center p-4 bg-[linear-gradient(to bottom,rgba(0, 0, 0, 0.55),rgba(2, 5, 54, 0.48))] border-2 border-white/20 rounded-xl'>

                    <div className="mb-6 w-2/3">
                        <EditorComponent />
                    </div>
                    <div className='w-1/3 h-[500px] '>
                        <InputBox type="text" name="title" placeholder="Add Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{
                            height: "200px", fontSize: "3rem", overflow: "scroll", marginTop: "40%",
                            border: "none", borderRadius: "10px", marginBottom: "20px", background: "linear-gradient(to bottom,rgba(90, 3, 64, 0.55),rgba(2, 5, 54, 0.48))"
                        }} />
                        <button type="submit" className="bg-primary text-white text-[1.4rem] font-bold rounded border border-white/20 ml-[70%] mt-[50%] shadow-lg bg-[#b33d07] hover:bg-black/70 cursor-pointer px-[20px] py-[10px]" onClick={handleSubmit}>Add Blog</button>

                    </div>
                </div>
                <div className='mb-6 w-30% flex justify-around gap-4 ml-6'>

                </div>
            </form>
        </div>
    );
};