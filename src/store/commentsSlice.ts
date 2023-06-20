import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {IComment} from '../types';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async function(_, {rejectWithValue}){
        try {
            const response = await fetch('https://dummyjson.com/comments?limit=3');
            if (!response.ok){
                throw new Error('Network error');
            }
            const data = await response.json();
            return data.comments;
        } catch (error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const addComments = createAsyncThunk(
    'comments/addComments',
    async function(body: string, {rejectWithValue, dispatch}){
        try {
            const response = await fetch('https://dummyjson.com/comments/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body: body,
                    postId: 3,
                    userId: 5,        
                })
            });
            if (!response.ok){
                throw new Error('An error has occurred while adding your comment');
            }
            const data = await response.json();
            dispatch(commentsActions.addComment(data));
        } catch (error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const deleteComments = createAsyncThunk(
    'comments/deleteComments',
    async function(id: number, {rejectWithValue, dispatch}){
        try {
            const response = await fetch(`https://dummyjson.com/comments/${id}`, {method: 'DELETE'});
            if (!response.ok){
                dispatch(commentsActions.deleteComment(id));
                throw new Error("You can't delete your own comment because of features of the DummyJSON. According to its documentation (https://dummyjson.com/docs/comments/#add) all new comments added using the POST method have the id: 341. Adding a new comment will not add it into the server. Therefore, attempting to delete a comment with a non-existent id results in a 404 error.");
            }
            dispatch(commentsActions.deleteComment(id));
        } catch (error: any){
            return rejectWithValue(error.message);
        }
    }
);

interface ICommentState {
    comments: IComment[];
    status: 'init' | 'loading' | 'successful' | 'failed';
    error: string | null;
}

const initialState: ICommentState = {
    comments: [],
    status: 'init',
    error: null
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment(state, action: PayloadAction<IComment>){
            state.comments.push(action.payload);
        },
        deleteComment(state, action: PayloadAction<number>){
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchComments.pending, state => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchComments.fulfilled, (state, action: PayloadAction<any>) => {
            state.comments = action.payload;
            state.status = 'successful';
            state.error = null;
        })
        .addCase(fetchComments.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.status = 'failed';
        })
        .addCase(addComments.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.status = 'failed';
        })
        .addCase(deleteComments.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.status = 'failed';
        })
    }
});

export const {actions: commentsActions, reducer: commentsReducer} = commentsSlice;