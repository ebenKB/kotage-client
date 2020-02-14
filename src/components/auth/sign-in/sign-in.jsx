/* eslint-disable react/jsx-fragments */
/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../form-fields/input/input';
import { ReactComponent as Logo } from '../../../svg/padlock.svg';
import { ReactComponent as BackArrow } from '../../../svg/back.svg';
import { login, getTenantID } from '../../../redux/actions/userActions';
import './sign-in.scss';
import KtLogo from '../../KtLogo/kt-logo';

const SignIn = ({
  loading, userLogin, checkUserTenant,
}) => {
  const history = useHistory();
  const [page, setPage] = useState({ page: 1, max: 2 });
  const [user, setUser] = useState({ email: '', password: '' });
  const [loginType, setLoginType] = useState('Buyer');
  const [altLoginType, setAltLoginType] = useState('Supplier');

  const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
  };

  /**
   * Switch between buyer login and supplier login
   */
  const toggleLogin = () => {
    if (loginType === 'Buyer') {
      setLoginType('Supplier');
      setAltLoginType('Buyer');
    } else {
      setLoginType('Buyer');
      setAltLoginType('Supplier');
    }
  };

  /**
   * move from the current page to the next page
   */
  const goToNextPage = () => {
    const oldPage = page.page;
    if (oldPage < page.max) {
      const newPage = (oldPage + 1);
      setPage((p) => (
        {
          ...p,
          page: newPage,
        }
      ));
    }
    checkUserTenant(user.email);
  };

  /**
   * Go Back to previous page
   */
  const goBack = () => {
    const oldPage = page.page;
    const newPage = (oldPage - 1);
    setPage((p) => (
      {
        ...p,
        page: newPage,
      }
    ));
  };

  /**
   *
   * @param {*} e defualt javascript event
  */
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setUser((u) => ({
      ...u,
      [name]: value,
    }));
  };
  /**
 *
 * @param {*} e defualt javascript event
 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await userLogin(user.email, user.password);
      if (data.error) {
        alert(data.data.error);
      } else {
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  /**
 * get the appropriate page to show to the user
 */
  const getPage = () => {
    if (page.page === 1) {
      return (
	<Fragment>
		<Form>
			<Input
				type="text"
				className="fluid"
				placeholder="Enter your email"
				onChange={handleChange}
				value={user.email}
				name="email"
			/>
			<div className="m-t-10">
				<Button
					onClick={goToNextPage}
					className="m-t-20 fluid tiny green"
					disabled={user.email === ''}
				>
					{
            page.page <= page.max && <div>Next</div>
          }
				</Button>
			</div>
			<div className="m-t-10">
        Login as
				<span>
          &nbsp;
					<Button size="small" className="transparent" onClick={toggleLogin}>
						{altLoginType}
					</Button>
				</span>
				<span> | </span>
				<Link to="/tenant/signup">
          create an account
				</Link>
			</div>
		</Form>
	</Fragment>
      );
    }
    return (
	<Form className="kt__wrapper_active">
		{
      user.email && page.page === 2 && (
	<div className="kt__wrapper_active_cta m-t-10 m-b-10">
		<BackArrow className="logo very small" role="button" onClick={goBack} />
		<span className="m-l-5">{user.email}</span>
	</div>
      )
    }
		<div className="m-t-5 m-b-5">
			<Input
				type="password"
				className="fluid"
				placeholder="Enter your password"
				onChange={handleChange}
				value={user.password}
				name="password"
			/>
		</div>
		<div>
			<Button
				onClick={handleSubmit}
				className={`m-t-20 fluid tiny ${loading ? 'loading' : ''} green`}
				disabled={user.password === ''}
			>
				{/* check  if the current page is the last page */}
				{
          page.page === page.max && <div>Login</div>
        }
			</Button>
		</div>
	</Form>
    );
  };
  return (
	<div className="signin__wrapper">
		<div className="text-center m-b-20">
			<KtLogo
				classes="medium"
			/>
		</div>
		<div className="signin__content">
			<div className="signin__body ">
				<div className="m-b-10">
					<Logo className="small logo faint" />
					<span className="m-l-5 sm-caption bold">
						{/* show the right login type to the user */}
						{loginType}
						{ ' ' }
            Login
					</span>
				</div>
				{
          getPage()
        }
			</div>
		</div>
	</div>
  );
};

const mapDispatchToProps = {
  userLogin: login,
  checkUserTenant: getTenantID,
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  tenant: state.user.tenant_id,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
