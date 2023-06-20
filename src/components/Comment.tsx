import {useAppDispatch} from './../hook';
import {deleteComments} from '../store/commentsSlice';
import {IComment} from '../types';
import remove from './../images/delete.svg';
type TypeCommentProps = Omit<IComment, 'postId'>;

const Comment = ({id, body, user}: TypeCommentProps) => {
    const dispatch = useAppDispatch();
    return (
        <div className="comment">
            <div className="comment__container">
                <div className="comment__header">
                    <h2 className="comment__username">{user.username}</h2>
                    <button onClick={() => dispatch(deleteComments(id))}>
                        <img src={remove} alt="delete comment" />
                    </button>
                </div>
                <p className="comment__text">{body}</p>
            </div>
        </div>
    );
}

export default Comment;