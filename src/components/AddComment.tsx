import {useState, useMemo} from "react";
import {useAppDispatch} from "../hook";
import {addComments} from "../store/commentsSlice";

const AddComment = () => {
    const [text, setText] = useState<string>(localStorage.getItem('text') === null ? '' : String(localStorage.getItem('text')));
    const dispatch = useAppDispatch();
    // const error = useAppSelector(state => state.comments.error);

    useMemo(() => {
        return localStorage.setItem('text', text);
    }, [text]);

    const handleClick = () => {
        dispatch(addComments(text))
        localStorage.removeItem('text');
        setText('');
    }

    return (
        <section className="add-comment">
            <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="textarea" 
                placeholder="Share your thoughts" 
            />
            <button 
                onClick={handleClick}
                disabled={!Boolean(text)}
                className="add-button" 
            >
                Send
            </button>
        </section>
    );
}

export default AddComment;