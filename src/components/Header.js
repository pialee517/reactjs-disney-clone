import React from 'react'
import styled from 'styled-components'

function Header() {
    return (
        <Nav>
            <Logo src="/images/logo.svg" />
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
            <UserImg src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1280,c_fill,g_auto,h_720,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190430171751-mona-lisa.jpg" />
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