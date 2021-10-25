import React, { useEffect } from 'react'
import { auth, provider } from '../firebase'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut } from "../features/user/userSlice"
import { useSelector, useDispatch } from 'react-redux'

function Header() {
    const dispatch = useDispatch()
    const history = useHistory() 
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(()=>{
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push('/')
            }
        })
    },[])
    
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result)=>{
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            history.push('/')
        })
    }
    
    const signOut = () =>{
        auth.signOut()
        .then(()=>{
            dispatch(setSignOut());
            history.push("/login")
        })
    }
    return (
        <Nav>
            <Logo src="/images/logo.svg" />
            { !userName ? 
                (<LoginContainer>
                    <Login onClick={signIn}>Login</Login>
                </LoginContainer>) :
                <>
                <NavMenu>
                    <a>
                        <img src="/images/home-icon.svg" /><span>Home</span>
                    </a>
                    <a>
                        <img src="/images/search-icon.svg" /><span>Search</span>
                    </a>
                    <a>
                        <img src="/images/watchlist-icon.svg" /><span>Watchlist</span>
                    </a>
                    <a>
                        <img src="/images/original-icon.svg" /><span>original</span>
                    </a>
                    <a>
                        <img src="/images/movie-icon.svg" /><span>movie</span>
                    </a>
                    <a>
                        <img src="/images/series-icon.svg" /><span>series</span>
                    </a>
                </NavMenu>
                <UserImg onClick={signOut} src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1280,c_fill,g_auto,h_720,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190430171751-mona-lisa.jpg" />
            </> }
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    overflow-x:hidden;
    height: 70px;
    background: #090b13;
    display:flex;
    align-items:center;
    padding: 0 36px;
`
const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display:flex;
    flex:1;
    margin-left:25px;
    align-items:center;
    a{
        display:flex;
        align-items:center;
        padding:0 12px;
        cursor:pointer;
        img{
            height:20px;
        }
        span{
            font-size:13px;
            letter-spacing:1.42px;
            text-transform: uppercase;
            position:relative;

            &:after{
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity:0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(.17,.86,.29,.67) 0s;
                transform: scaleX(0.5);
            }
        }
        &:hover{
            span:after{
                transform: scaleX(1);
                opacity:1;
            }
        }
    }
`
const UserImg = styled.img`
    width:40px;
    height:40px;
    object-fit: cover;
    position:center;
    border-radius:50%;
    cursor:pointer;
    
`

const Login = styled.div`
    border-radius: 4px;
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color:rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease 0s;
    cursor:pointer;
    &:hover{
        background-color: #f9f9f9;
        color:#000000;
        border-color:transparent;
    }
`
const LoginContainer = styled.div`
    flex:1;
    display:flex;
    justify-content:flex-end;
`