import LoginForm from './Pages/Login/LoginForm';
import DetailsForm from './Pages/DetailsForm/DetailsForm'
import UploadForm from './Pages/UploadForm/UploadForm'

export const Routee = [
    {
        id: 1,
        component: <LoginForm/>,
        path: "/",
        exact: true,  
    },
    {
      id: 2,
      component: <DetailsForm/>,
        path: "/Details",
      exact: true,
    },
    {
      id: 3,
      component: <UploadForm/>,
      path: "/Upload",
      exact: true,
    },
    // {
    //   id: 5,
    //   component: <SurveyForm/>,
    //   path: "/survey",
    //   exact: true,
    // },
    // {
    //   id: 6,
    //   component: <Navbar/>,
    //   path: "/navbar",
    //   exact: true,
    // },
    // {
    //   id: 7,
    //   component: <Footer/>,
    //   path: "/footer",
    //   exact: true,
    // }
 
]