import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Home from './pages/Home';
import JobList from './pages/JobList';
import CandidateProfile from './pages/CandidateProfile';
import JobView from './pages/JobView';
import Apply from './pages/Apply';
import PageNotFound from './pages/PageNotFound';
import CandidateRegister from './pages/CandidateRegister';


const router=createBrowserRouter([
  {
    path:"/",
    element:<Home />,
  },
  {
    path:"/jobs",
    element:<JobList />,
  },
  {
    path:"/candidate",
    element:<CandidateProfile />,
  },
  {
    path:"/jobview",
    element:<JobView />,
  },
  {
    path:"/apply",
    element:<Apply />,
  },
  {
    path:"/candidate/register",
    element:<CandidateRegister />,
  },
  {
    path:"*",
    element:<PageNotFound />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
