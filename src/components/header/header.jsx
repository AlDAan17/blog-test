import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import UserDataWithAvatar from '../../utils/user-data-with-avatar';
import './header.scss';

const Header = ({user, logOutAndRemoveStorageWithDispatch}) => {
    return (
        <header>
            <Link to='/' className="title">Realworld Blog</Link>
            <div>
                {user.username ?
                    <>
                        <Link className="create" to="/new-article">
                            Create article
                        </Link>
                        <Link to="/profile">
                            <UserDataWithAvatar username={user.username} imageSrc={user.image} className="user"/>
                        </Link>
                        <Link to="/" className="log-out" onClick={logOutAndRemoveStorageWithDispatch}>
                            Log Out
                        </Link>
                    </>
                    :
                    <>
                        <Link to='/sign-in' className="sign-in">Sign In</Link>
                        <Link to='/sign-up' className="sign-up">Sign Up</Link>
                    </>
                }
            </div>
        </header>
    )
}

Header.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        username: PropTypes.string,
        bio: PropTypes.string,
        image: PropTypes.string,
        token: PropTypes.string,
    }).isRequired,
    logOutingWithDispatch: PropTypes.func,
};

export default Header;