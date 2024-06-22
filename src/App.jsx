import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Home from './pages/Home';
import CandidateProfile from './pages/CandidateProfile';
import JobView from './pages/JobView';
import Apply from './pages/Apply';
import PageNotFound from './pages/PageNotFound';
import Layout from './Components/LoginRegister/Layout';
import CandidateLogin from './pages/CandidateLogin';
import CandidateRegister from './pages/CandidateRegister';
import Screening from './Components/ApplyJob/Screening';
import RecruiterLogin from './pages/RecruiterLogin';
import RecruiterRegister from './pages/RecruiterRegister';
import Jobs from './pages/Jobs';
import CandidateLayout from './Components/Candidate/CandidateLayout';
import Screening from './pages/Screening';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:"/jobs",
    element:<CandidateLayout />,
    children:[
      {index:true,element:<Jobs />},

    ]
    
    path: "/jobs",
    element: <JobList />,
  },
  {
    path:"/jobview",
    element:<JobView />,
  },
  {
    path: "/apply",
    element: <Apply />,
  },
  {
    path: "/jobs/screening",
    element: <Screening />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/candidate",
    element: <Layout />,
    children: [
      { path: "register", element: <CandidateRegister /> },
      { path: "login", element: <CandidateLogin /> },
      { index: true, element: <CandidateProfile /> }
    ]
  },
  {
    path: "/recruiter",
    element: <Layout />,
    children: [
      { path: "register", element: <RecruiterRegister /> },
      { path: "login", element: <RecruiterLogin /> }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
