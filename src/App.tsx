import {lazy, Suspense} from 'react';
const Comments = lazy(() => import('./components/Comments'));
import AddComment from './components/AddComment';
import Loader from './components/Loader';
import './css/main.css';

const App = () => {
    return (
        <main className="container">
            <Suspense fallback={<Loader />}>
                <Comments />
                <AddComment />
            </Suspense>
        </main>
    );
}

export default App;