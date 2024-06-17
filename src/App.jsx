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
import CandidateLayout from './Components/LoginRegister/CandidateLayout';
import CandidateLogin from './pages/CandidateLogin';
import CandidateRegister from './pages/CandidateRegister';


const router=createBrowserRouter([
  // {
  //   path:"/",
  //   element:<Home />,
  // },
  // {
  //   path:"/jobs",
  //   element:<JobList />,
  // },
  // {
  //   path:"/jobview",
  //   element:<JobView />,
  // },
  // {
  //   path:"/apply",
  //   element:<Apply />,
  // },
  // {
  //   path: "/jobs/screening",
  //   element: <screening />,
  // },
  // {
  //   path: "*",
  //   element: <PageNotFound />,
  // },
  {
    path: "/candidate",
    element: <CandidateLayout />,
    children: [
      { path: "register", element: <CandidateRegister /> },
      { path: "login", element: <CandidateLogin /> }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
