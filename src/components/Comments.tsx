import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hook';
import {fetchComments} from '../store/commentsSlice';
import Comment from "./Comment";

const Comments = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchComments());
    }, []);
    const comments = useAppSelector(state => state.comments.comments);

    return (
        <section className="comments">
            {comments.map(comment =>
                <Comment 
                    key={self.crypto.randomUUID()}
                    id={comment.id}
                    body={comment.body}
                    user={comment.user}
                /> 
            )}
        </section>
    );
}

export default Comments;