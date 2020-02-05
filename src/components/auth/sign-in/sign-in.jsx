import React, {useState} from 'react';
import './sign-in.scss';
import { Form, Button } from 'semantic-ui-react';
import Input from '../../form-fields/input/input';
import {ReactComponent as Logo} from '.././../../svg/padlock.svg';
import { ReactComponent as BackArrow } from '../../../svg/back.svg';
import KotageLogo from '../../../png/kotage-logo__colour.png';
import {
  useHistory,
  useLocation, 
  Link
} from "react-router-dom";


const SignIn = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [page, setPage] = useState({page: 1, max: 2});
  const [user, setUser] = useState({email: '', password: ''})

  const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },

    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  /**
   * move from the current page to the next page
   */
  const goToNextPage = () => {
    const oldPage = page.page;
    if(oldPage < page.max) {
      let newPage =  (oldPage + 1);
      setPage((page) => (
        {...page,
          page: newPage,
        }
      ));
    }
  }

  const goBack = () => {
    const oldPage = page.page;
    let newPage = (oldPage - 1);
    setPage((page) => (
      {
        ...page,
        page: newPage
      }
    ))
  }

  const handClickChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    console.log(value, name)
    setUser((u) => ({
      ...u,
      [name]: value
    }));
  }
/**
 * get the appropriate page to show to the user
 */
  const getPage = () => {
    if(page.page ===1) {
      return (
	<>
		<Form>
			<Input 
        type="text" 
        className="fluid"
        placeholder="Enter your email"
        onChange={handClickChange}
        value={user.email}
        name="email"
      />
			<div className="m-t-10">
				<Button 
          onClick={goToNextPage} 
          className="tiny"
          disabled={user.email===""}
        >
					{
            page.page <= page.max && <div>Next</div>
          }
				</Button>
			</div>
		</Form>
	</>
      )
    } else {
      return (
        <Form className="kt__wrapper_active">
        {
          user.email && page.page === 2 && (
          <div className="m-t-10 m-b-10" role="button" onClick={goBack}>
            <BackArrow className="logo very small"/>
            <span className="m-l-5">{user.email}</span>
          </div>
          )
        }
          <div className="m-t-5 m-b-5">
            <Input 
              type="text" 
              className="fluid"
              placeholder="Enter your passowrd"
              onChange= {handClickChange}
              value={user.password}
              name="password"
            />
          </div>
          <div>
            <Button 
              onClick={goToNextPage} 
              className="tiny"
              disabled={user.password===""}
            >
              {
                page.page <= page.max && <div>Login</div>
              }
            </Button>
          </div>
        </Form>
      )
    }
  }
  return (
	<div className="signin__wrapper">
		<div className="sigin__content-logo ">
      <img src={KotageLogo} alt="" className="small logo"/>
		</div>
		<div className="signin__content">
			<div className="signin__body ">
				<div className="m-b-10"> 
					<Logo className="small logo faint"/> 
					<span className="m-l-5 sm-caption bold">Login</span>
				</div>
				{
          getPage()
        }
			</div>
			<div className="signin__footer">
        <span>Reset Password</span>
        <span> | </span>
        <span>
        <Link to="/about">Request a Demo</Link>
        </span>
			</div>
		</div>
    <div className="text-center m-t-15 faint-caption">
      If you are new to Kotage ask your administrator to invite you
    </div>
	</div>
  )
}

export default SignIn
