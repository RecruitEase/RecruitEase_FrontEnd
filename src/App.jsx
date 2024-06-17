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
import Layout from './Components/LoginRegister/Layout';
import Login from './pages/Login';
import Register from './pages/Register';


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
    path:"/jobview",
    element:<JobView />,
  },
  {
    path:"/apply",
    element:<Apply />,
  },
  {
    path: "/jobs/screening",
    element: <screening />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/candidate",
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
